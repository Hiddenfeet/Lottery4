import { Card, Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { useContractRead } from '@thirdweb-dev/react'

const EntryCard = ({ walletAddress }: { walletAddress: string }) => {
  const { raffleContract } = useRaffleContract()
  const { data: numberOfEntries, isLoading: isLoadingNumberOfEntries } =
    useContractRead(raffleContract, 'entryCount', [walletAddress])

  return (
    <Card fullWidth className='px-3 py-2'>
      <Skeleton isLoaded={!isLoadingNumberOfEntries}>
        <div className='flex flex-col gap-1'>
          <span>Address: {walletAddress}</span>
          <span>Entries: {numberOfEntries?.toNumber()}</span>
        </div>
      </Skeleton>
    </Card>
  )
}

export default EntryCard
