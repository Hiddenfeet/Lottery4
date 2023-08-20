import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import AdminTransferNFT from './AdminTransferNFT'

const AdminRaffleWinner = () => {
  const { prizeNFTContractAddress } = useRaffleContract()

  const nullAddress = '0x0000000000000000000000000000000000000000'

  return (
    <Card fullWidth>
      <CardHeader>
        <h2 className='text-2xl font-semibold'>Raffle winner</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-6'>
        <div className='flex flex-col h-full gap-3 justify-start'>
          {prizeNFTContractAddress === nullAddress ? (
            <>
              <h3 className='text-xl text-red-500 p-2 bg-red-200 rounded-lg'>
                No prize NFT set
              </h3>
              <p className='text-lg'>
                Please start a new raffle and select the NFT that will be
                raffled off.
              </p>
            </>
          ) : (
            <AdminTransferNFT />
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default AdminRaffleWinner
