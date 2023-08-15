import { Card, CardBody, Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'

const RaffleStatus = () => {
  const { raffleStatus } = useRaffleContract()

  const backgroundColor = raffleStatus.data ? 'bg-green-200' : 'bg-red-200'
  const textColor = raffleStatus.data ? 'text-green-700' : 'text-red-700'

  return (
    <Skeleton className='rounded-xl' isLoaded={!raffleStatus.isLoading}>
      <Card
        radius='lg'
        shadow='lg'
        fullWidth
        className={`${backgroundColor} px-5 py-2`}
      >
        <p className={`text-lg ${textColor}`}>
          Raffle status: {raffleStatus.data ? 'Open' : 'Closed'}
        </p>
      </Card>
    </Skeleton>
  )
}

export default RaffleStatus
