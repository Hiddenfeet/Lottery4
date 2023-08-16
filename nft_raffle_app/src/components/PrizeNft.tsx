import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { MediaRenderer } from '@thirdweb-dev/react'

const PrizeNft = () => {
  const { currentRaffleNFT } = useRaffleContract()

  const {
    isLoadingNFT,
    isLoadingPrizeNFTContractMetadata,
    prizeNFT,
    prizeNFTContractMetadata,
  } = currentRaffleNFT

  return (
    <Card className='w-full h-full'>
      <CardHeader className='text-2xl'>Prize NFT</CardHeader>
      <Divider />
      <Skeleton
        className='rounded-xl h-full w-full'
        isLoaded={!isLoadingNFT && !isLoadingPrizeNFTContractMetadata}
      >
        <CardBody>
          <div className='flex flex-col items-center justify-between gap-10 h-full'>
            <MediaRenderer
              width='100%'
              height='100%'
              className='border shadow-xl rounded-xl'
              src={prizeNFT?.metadata?.image}
            />
          </div>
        </CardBody>
        <CardFooter>
          <div className='grid grid-cols-1 gap-3 text-start w-full'>
            <span>NFT Contract Name:{prizeNFTContractMetadata?.name}</span>
            <span>Prize NFT name: {prizeNFT?.metadata?.name}</span>
            <span>Prize NFT type: {prizeNFT?.type}</span>
          </div>
        </CardFooter>
      </Skeleton>
    </Card>
  )
}

export default PrizeNft
