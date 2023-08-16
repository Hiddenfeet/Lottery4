import {
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'
import { ethers } from 'ethers'

const useRaffleContract = () => {
  const address = useAddress()
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS)

  // Raffle Status
  const { data: raffleStatus, isLoading: isLoadingRaffleStatus } =
    useContractRead(raffleContract, 'raffleStatus')

  // Raffle entry cost
  const { data: entryCost, isLoading: isLoadingEntryCost } = useContractRead(
    raffleContract,
    'entryCost',
  )

  // Prize nft contract address
  const { data: prizeNFTContractAddress } = useContractRead(
    raffleContract,
    'nftAddress',
  )

  // Prize nft token id
  const { data: prizeNFTTokenId } = useContractRead(raffleContract, 'nftId')

  // Total entries
  const { data: totalEntries, isLoading: isLoadingTotalEntries } =
    useContractRead(raffleContract, 'totalEntries')

  // Contract data for prize NFT  //

  const { contract: prizeNFTContract } = useContract(
    prizeNFTContractAddress,
    'nft-drop',
  )

  const { data: currentEntries, isLoading: isLoadingCurrentEntries } =
    useContractRead(raffleContract, 'getPlayers')

  const {
    data: prizeNFTContractMetadata,
    isLoading: isLoadingPrizeNFTContractMetadata,
  } = useContractMetadata(prizeNFTContract)

  const { data: prizeNFT, isLoading: isLoadingPrizeNFT } = useNFT(
    prizeNFTContract,
    prizeNFTTokenId,
  )

  // End Contract data for prize NFT  ///

  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useContractRead(raffleContract, 'contractBalance')

  const { data: numberOfEntries, isLoading: isLoadingNumberOfEntries } =
    useContractRead(raffleContract, 'entryCount', [address])

  const returnValues = {
    raffleStatus,
    isLoadingRaffleStatus,

    entryCostInEther: {
      data: entryCost ? ethers.utils.formatEther(entryCost) : '0',
      isLoading: isLoadingEntryCost as boolean,
    },

    totalEntries: {
      data: totalEntries ? totalEntries.toString() : '0',
      isLoading: isLoadingTotalEntries as boolean,
    },

    currentRaffleNFT: {
      isLoadingPrizeNFTContractMetadata,
      isLoadingPrizeNFT,
      prizeNFT,
      prizeNFTContractMetadata,
    },

    contractBalance: contractBalance
      ? ethers.utils.formatEther(contractBalance)
      : ('0' as string),

    isLoadingContractBalance,
    prizeNFTTokenId,
    prizeNFTContractAddress,
    prizeNFTContract,
    raffleContract,
    currentEntries,
    isLoadingCurrentEntries,
    numberOfEntries,
    isLoadingNumberOfEntries,
  }

  return returnValues
}

export default useRaffleContract
