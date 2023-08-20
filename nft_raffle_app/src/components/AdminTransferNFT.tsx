import { Skeleton } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { MediaRenderer, Web3Button } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'

const AdminTransferNFT = () => {
  const {
    prizeNFT,
    prizeNFTContractMetadata,
    prizeNFTContract,
    raffleContract,
    raffleStatus,
    prizeNFTTokenId,
  } = useRaffleContract()

  return (
    <div className='grid grid-cols-1 gap-3 place-content-center'>
      <Skeleton isLoaded={!prizeNFT.isLoading} className='rounded-xl'>
        <MediaRenderer
          width='100%'
          height='100%'
          className='border shadow-xl rounded-xl'
          src={prizeNFT?.data?.metadata?.image}
        />
      </Skeleton>
      <Skeleton
        as='div'
        className='rounded-xl'
        isLoaded={!prizeNFTContractMetadata.isLoading && !prizeNFT.isLoading}
      >
        <div className='flex flex-col gap-2'>
          <span className='font-lg'>
            <span className='font-bold'>Contract Name: </span>
            {prizeNFTContractMetadata?.data?.name}
          </span>
          <span className='font-lg'>
            <span className='font-bold'>NFT name: </span>
            {prizeNFT?.data?.metadata.name}
          </span>
        </div>
      </Skeleton>
      <Web3Button
        isDisabled={raffleStatus.data}
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={async () => {
          await prizeNFTContract?.setApprovalForToken(
            RAFFLE_CONTRACT_ADDRESS,
            prizeNFTTokenId,
          )

          await raffleContract?.call('selectWinner')
        }}
      >
        Select a winner!
      </Web3Button>
    </div>
  )
}

export default AdminTransferNFT
