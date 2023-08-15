import { useContract, useContractRead } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'
import { BigNumber, ethers } from 'ethers'

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

  const { data: totalEntries, isLoading: isLoadingTotalEntries } =
    useContractRead(contract, 'totalEntries')

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
    contract,
  }

  return returnValues
}

export default useRaffleContract
