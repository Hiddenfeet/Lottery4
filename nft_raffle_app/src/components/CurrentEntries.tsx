import { Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import EntryCard from './EntryCard'

const CurrentEntries = () => {
  const { currentEntries } = useRaffleContract()

  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='rounded-xl' isLoaded={!currentEntries.isLoading}>
        <div className='flex flex-col gap-3'>
          {currentEntries?.data?.length ? (
            currentEntries?.data?.map((entry: string) => (
              <EntryCard key={entry} walletAddress={entry} />
            ))
          ) : (
            <p className='text-center text-xl'>No entries yet!</p>
          )}
        </div>
      </Skeleton>
    </div>
  )
}

export default CurrentEntries
