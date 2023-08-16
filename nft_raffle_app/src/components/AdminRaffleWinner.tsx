import { Card, CardHeader, Divider, CardBody } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import AdminTransferNFT from './AdminTransferNFT'

const AdminRaffleWinner = () => {
  const { prizeNFTContractAddress } = useRaffleContract()

  return (
    <Card fullWidth>
      <CardHeader>
        <h2 className='text-2xl font-semibold'>Raffle winner</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-6'>
        <div className='grid grid-cols-1 gap-3 '>
          {prizeNFTContractAddress ===
          '0x0000000000000000000000000000000000000000' ? (
            <>
              <h3 className='text-xl font-semibold'>No prize NFT set</h3>
              <p className='text-lg font-semibold'>
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
