import { useAddress } from '@thirdweb-dev/react'
import { Skeleton } from '@nextui-org/react'
import useRaffleStatus from '../../hooks/useRaffleContract'
import RaffleStatus from '../../components/RaffleStatus'
import EntryAmount from '../../components/EntryAmount'
import PrizeNft from '../../components/PrizeNft'

import RaffleImg from '../../assets/raffle.png'
import CurrentEntries from '../../components/CurrentEntries'

const Landing = () => {
  const { entryCostInEther, totalEntries, raffleStatus } = useRaffleStatus()
  const address = useAddress()

  return (
    <section className='max-w-screen-2xl grid grid-cols-1 gap-10'>
      <div className=' place-items-center grid grid-cols-1 lg:grid-cols-2 gap-6 w-full'>
        <div
          className={`
        flex shadow-2xl flex-col justify-between rounded-xl p-6 bg-teal-500 w-full gap-4 text-white`}
        >
          <div className='flex flex-col gap-6'>
            <span className='text-4xl font-bold'>
              Buy a ticket to win the NFT Prize!
            </span>
            <span className='text-xl'>
              Buy entries for a chance to win the NFT! Winner be selected and
              transferred the NFT. The more entries the higher chance you have
              of winning!
            </span>
          </div>

          <div className={`flex flex-col gap-5 rounded-xl p-6 bg-teal-600`}>
            <RaffleStatus />

            <Skeleton
              isLoaded={!entryCostInEther.isLoading}
              className='rounded-xl text-xl font-bold'
              as='span'
            >
              Entry cost is: {entryCostInEther.data} MATIC
            </Skeleton>

            {address ? (
              <EntryAmount />
            ) : (
              <p className='text-center text-lg'>
                Connect your wallet to buy entries!
              </p>
            )}

            <Skeleton
              isLoaded={!totalEntries.isLoading}
              className='rounded-xl text-xl font-bold'
              as='span'
            >
              Total entries: {totalEntries.data} MATIC
            </Skeleton>
          </div>
        </div>
        {raffleStatus ? (
          <PrizeNft />
        ) : (
          <img
            className='bg-cover shadow-lg rounded-xl bg-center'
            src={RaffleImg}
            alt=''
          />
        )}
      </div>

      <div className='h-10'>
        <h4 className='text-xl'>Current Raffle Entries:</h4>
        <CurrentEntries />
      </div>
    </section>
  )
}

export default Landing
