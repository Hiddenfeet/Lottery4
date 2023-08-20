import {
  useContract,
  useContractMetadata,
  useContractRead,
  useNFT,
} from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'

const useRaffleContract = () => {
  const { contract: raffleContract } = useContract(RAFFLE_CONTRACT_ADDRESS)

  const raffleStatus = useContractRead(raffleContract, 'raffleStatus')
  const entryCost = useContractRead(raffleContract, 'entryCost')

  const prizeNFTContractAddress = useContractRead(
    raffleContract,
    'nftAddress',
  ).data

  const prizeNFTTokenId = useContractRead(raffleContract, 'nftId').data

  const totalEntries = useContractRead(raffleContract, 'totalEntries')
  const prizeNFTContract = useContract(
    prizeNFTContractAddress,
    'nft-drop',
  ).contract

  const currentEntries = useContractRead(raffleContract, 'getPlayers')

  const prizeNFTContractMetadata = useContractMetadata(prizeNFTContract)

  const prizeNFT = useNFT(prizeNFTContract, prizeNFTTokenId)

  const contractBalance = useContractRead(raffleContract, 'getBalance')

  const returnValues = {
    raffleStatus,
    entryCost,
    totalEntries,
    currentEntries,
    prizeNFT,
    contractBalance,
    prizeNFTContractMetadata,
    raffleContract,
    prizeNFTContract,
    prizeNFTTokenId,
    prizeNFTContractAddress,
  }

  return returnValues
}

export default useRaffleContract
