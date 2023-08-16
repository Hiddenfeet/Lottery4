import { Card, Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'

const RaffleStatus = () => {
  const { raffleStatus, isLoadingRaffleStatus } = useRaffleContract()

  const backgroundColor = raffleStatus ? 'bg-green-200' : 'bg-red-200'
  const textColor = raffleStatus ? 'text-green-700' : 'text-red-700'

  return (
    <Skeleton className='rounded-xl' isLoaded={!isLoadingRaffleStatus}>
      <Card
        radius='lg'
        shadow='lg'
        fullWidth
        className={`${backgroundColor} px-5 py-2`}
      >
        <p className={`text-lg ${textColor}`}>
          Raffle status: {raffleStatus ? 'Open' : 'Closed'}
        </p>
      </Card>
    </Skeleton>
  )
}

export default RaffleStatus
