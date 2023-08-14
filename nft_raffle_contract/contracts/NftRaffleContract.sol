// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "hardhat/console.sol";

contract NFTRaffleContract {
    address public owner;
    mapping(address => uint256) public entryCount;
    address[] public players;
    address[] private playersSelector;
    bool public raffleStatus;
    uint256 public entryCost;
    address public nftAddress;
    uint256 public nftId;
    uint256 public totalEntries;

    event NewEntry(address player);
    event RaffleStarted();
    event RaffleEnded();
    event WinnerSelected(address winner);
    event EntryCostChanged(uint256 newCost);
    event NFTPrizeSet(address nftAddress, uint256 nftId);
    event BalanceWithdrawn(uint256 amount);

    constructor(uint256 _entryCost) {
        owner = msg.sender;
        entryCost = _entryCost;
        raffleStatus = false;
        totalEntries = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function StartRaffle(
        address _nftContract,
        uint256 _tokenID
    ) public onlyOwner {
        require(!raffleStatus, "Raffle is already started");
        require(
            nftAddress == address(0),
            "NFT prize already set. Please select a winner from previuos raffle"
        );

        require(
            ERC721Base(_nftContract).ownerOf(_tokenID) == owner,
            "Contract is not owner of NFT"
        );

        nftAddress = _nftContract;
        nftId = _tokenID;
        raffleStatus = true;
        emit RaffleStarted();
        emit NFTPrizeSet(_nftContract, _tokenID);
    }

    function buyEntry(uint256 _numberOfEntries) public payable {
        require(raffleStatus, "Raffle is not started");
        require(
            msg.value == entryCost * _numberOfEntries,
            "Incorrect amount sent"
        );

        entryCount[msg.sender] += _numberOfEntries;
        totalEntries += _numberOfEntries;

        if (!isPlayer(msg.sender)) {
            // If player is not in the list, add them
            players.push(msg.sender);
        }

        for (uint256 i = 0; i < _numberOfEntries; i++) {
            playersSelector.push(msg.sender);
        }

        emit NewEntry(msg.sender);
    }

    function isPlayer(address _player) public view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i] == _player) {
                return true;
            }
        }
        return false;
    }

    function endRaffle() public onlyOwner {
        require(raffleStatus, "Raffle is not started");

        raffleStatus = false;
        emit RaffleEnded();
    }

    function selectWinner() public onlyOwner {
        require(!raffleStatus, "Raffle is still running");
        require(playersSelector.length > 0, "No players in raffle");
        require(nftAddress != address(0), "NFT prize not set");

        uint256 index = random() % playersSelector.length;
        address winner = playersSelector[index];

        emit WinnerSelected(winner);

        // we transfer the NFT to the winner
        ERC721Base(nftAddress).transferFrom(owner, winner, nftId);

        resetEntryCounts();
        delete playersSelector;
        delete players;
        nftAddress = address(0);
        nftId = 0;
        totalEntries = 0;
    }

    function changeEntryCost(uint256 _newCost) public onlyOwner {
        require(raffleStatus == false, "Raffle is still running");
        entryCost = _newCost;
        emit EntryCostChanged(_newCost);
    }

    function withdrawBalance() public onlyOwner {
        require(address(this).balance > 0, "No balance to withdraw");

        uint256 balanceAmont = address(this).balance;
        payable(owner).transfer(balanceAmont);
        emit BalanceWithdrawn(balanceAmont);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function resetsContract() public onlyOwner {
        delete playersSelector;
        delete players;
        raffleStatus = false;
        nftAddress = address(0);
        nftId = 0;
        totalEntries = 0;
        entryCost = 0;
        resetEntryCounts();
    }

    function resetEntryCounts() private {
        for (uint256 i = 0; i < players.length; i++) {
            entryCount[players[i]] = 0;
        }
    }

    function random() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        playersSelector
                    )
                )
            );
    }
}
