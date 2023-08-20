import { Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { Web3Button } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'
import { ethers } from 'ethers'

const AdminWithDrawBalance = () => {
  const { contractBalance } = useRaffleContract()
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='rounded-xl' isLoaded={!contractBalance.isLoading}>
        <span className='font-bold'>Contract Balance:</span>
        {ethers.utils.formatEther(contractBalance.data || '0')} MATIC
      </Skeleton>

      <Web3Button
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={(contract) => contract.call('withdrawBalance')}
      >
        Withdraw balance
      </Web3Button>
    </div>
  )
}

export default AdminWithDrawBalance
