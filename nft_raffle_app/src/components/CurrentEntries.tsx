import { Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import EntryCard from './EntryCard'

const CurrentEntries = () => {
  const { currentEntries, isLoadingCurrentEntries } = useRaffleContract()
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton isLoaded={!isLoadingCurrentEntries}>
        {currentEntries.map((entry: string) => (
          <EntryCard key={entry} walletAddress={entry} />
        ))}
      </Skeleton>
    </div>
  )
}

export default CurrentEntries
