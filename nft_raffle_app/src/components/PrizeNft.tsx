import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import RaffleImg from '../assets/raffle.png'
import useRaffleContract from '../hooks/useRaffleContract'
import { MediaRenderer } from '@thirdweb-dev/react'

const PrizeNft = () => {
  const { prizeNFT, prizeNFTContractMetadata, raffleStatus } =
    useRaffleContract()

  if (!raffleStatus.data) {
    return (
      <img
        className='bg-cover rounded-xl bg-center'
        src={RaffleImg}
        alt='Raffle image'
      />
    )
  }

  return (
    <Card className='w-full p-2 h-full bg-cyan-700 text-white'>
      <CardHeader className='text-2xl'>Prize NFT</CardHeader>
      <Divider />
      <Skeleton
        className='rounded-xl h-full w-full'
        isLoaded={!prizeNFT.isLoading && !prizeNFTContractMetadata.isLoading}
      >
        <CardBody>
          <div className='flex flex-col items-center justify-between gap-10 h-full'>
            <MediaRenderer
              width='100%'
              className='rounded-xl'
              src={prizeNFT?.data?.metadata?.image}
            />
          </div>
        </CardBody>
        <CardFooter>
          <div className='grid grid-cols-1 gap-3 text-start w-full'>
            <span>
              <b>NFT Contract Name: </b>
              {prizeNFTContractMetadata?.data?.name}
            </span>
            <span>
              <b>Prize NFT name: </b> {prizeNFT?.data?.metadata?.name}
            </span>
            <span>
              <b>Prize NFT type:</b> {prizeNFT?.data?.type}
            </span>
          </div>
        </CardFooter>
      </Skeleton>
    </Card>
  )
}

export default PrizeNft
