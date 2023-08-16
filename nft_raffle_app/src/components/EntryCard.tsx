import { Card, Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'

const EntryCard = ({ walletAddress }: { walletAddress: string }) => {
  const { numberOfEntries, isLoadingNumberOfEntries } = useRaffleContract()

  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + '...' + address.slice(-4)
  }

  return (
    <Card fullWidth>
      <Skeleton isLoaded={!isLoadingNumberOfEntries}>
        <span>{truncateAddress(walletAddress)}</span>
        <span>Entries: {numberOfEntries.toNumber()}</span>
      </Skeleton>
    </Card>
  )
}

export default EntryCard
