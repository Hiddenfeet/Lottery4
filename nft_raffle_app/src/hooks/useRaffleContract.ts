import {
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'
import { ethers } from 'ethers'

const useRaffleContract = () => {
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS)

  // Raffle Status
  const { data: raffleStatus, isLoading: isLoadingRaffleStatus } =
    useContractRead(contract, 'raffleStatus')

  // Raffle entry cost
  const { data: entryCost, isLoading: isLoadingEntryCost } = useContractRead(
    contract,
    'entryCost',
  )

  // Prize nft contract address
  const { data: prizeNFTContractAddress } = useContractRead(
    contract,
    'nftAddress',
  )

  // Prize nft token id
  const { data: prizeNFTTokenId } = useContractRead(contract, 'nftId')

  // Total entries
  const { data: totalEntries, isLoading: isLoadingTotalEntries } =
    useContractRead(contract, 'totalEntries')

  // Contract data for prize NFT  //

  const { contract: prizeNFTContract } = useContract(prizeNFTContractAddress)

  const {
    data: prizeNFTContractMetadata,
    isLoading: isLoadingPrizeNFTContractMetadata,
  } = useContractMetadata(prizeNFTContract)

  const { data: nft, isLoading: isLoadingNFT } = useNFT(
    prizeNFTContract,
    prizeNFTTokenId,
  )

  // End Contract data for prize NFT  ///

  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useContractRead(contract, 'contractBalance')

  const returnValues = {
    raffleStatus: {
      isRaffleOpen: raffleStatus as boolean,
      isLoading: isLoadingRaffleStatus as boolean,
    },

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
      isLoadingNFT,
      prizeNFT: nft,
      prizeNFTContractMetadata,
    },

    contractBalance: contractBalance
      ? ethers.utils.formatEther(contractBalance)
      : ('0' as string),
    isLoadingContractBalance,
    contract,
  }

  return returnValues
}

export default useRaffleContract
