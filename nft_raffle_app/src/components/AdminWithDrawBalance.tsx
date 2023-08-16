import { Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { Web3Button } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'

const AdminWithDrawBalance = () => {
  const { contractBalance, isLoadingContractBalance } = useRaffleContract()
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton
        as='p'
        className='rounded-xl'
        isLoaded={!isLoadingContractBalance}
      >
        <span className='font-bold'>Contract Balance:</span> {contractBalance}{' '}
        MATIC
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
