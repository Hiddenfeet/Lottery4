import { Chip, Skeleton } from '@nextui-org/react'
import useRaffleStatus from '../../hooks/useRaffleContract'
import RaffleStatus from '../../components/RaffleStatus'
import EntryAmount from '../../components/EntryAmount'
import PrizeNft from '../../components/PrizeNft'

import CurrentEntries from '../../components/CurrentEntries'
import { ethers } from 'ethers'

const Landing = () => {
  const { totalEntries, entryCost } = useRaffleStatus()

  return (
    <section className='max-w-screen-2xl grid grid-cols-1 gap-20'>
      <div className='place-items-start grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div
          className={`flex shadow-2xl flex-col justify-between rounded-xl
          p-6 bg-cyan-700 w-full gap-4 text-white`}
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

          <div className='flex flex-col gap-5 rounded-xl p-6 bg-cyan-600'>
            <RaffleStatus />

            <div className='flex flex-col gap-2'>
              <Skeleton
                isLoaded={!entryCost?.isLoading}
                className='rounded-xl text-xl'
                as='span'
              >
                Cost per ticket is:{' '}
                <Chip className='bg-white'>
                  {ethers.utils.formatEther(entryCost.data || '0')} MATIC
                </Chip>
              </Skeleton>

              <Skeleton
                isLoaded={!totalEntries?.isLoading}
                className='rounded-xl text-xl'
                as='span'
              >
                Total entries:{' '}
                <Chip className='bg-white'>
                  {totalEntries?.data?.toString() || '0'}
                </Chip>
              </Skeleton>
            </div>

            <EntryAmount />
          </div>
        </div>

        <PrizeNft />
      </div>

      <div className='bg-cyan-700 flex flex-col gap-2 p-6 rounded-xl text-white'>
        <h4 className='text-xl'>Current Raffle Entries:</h4>
        <div className='border-b w-full' />
        <CurrentEntries />
      </div>
    </section>
  )
}

export default Landing
