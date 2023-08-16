import { useState } from 'react'
import useRaffleContract from '../hooks/useRaffleContract'
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Input,
  Skeleton,
} from '@nextui-org/react'
import { Web3Button } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'
import { ethers } from 'ethers'
import AdminWithDrawBalance from './AdminWithDrawBalance'

const AdminEntryCost = () => {
  const { entryCostInEther, raffleStatus } = useRaffleContract()
  const [entryCostValue, setEntryCostValue] = useState('0')
  const resetEntryCost = () => setEntryCostValue('0')

  return (
    <Card fullWidth>
      <CardHeader>
        <h2 className='text-2xl font-semibold'>Entry Cost</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-6 '>
        <Skeleton isLoaded={!entryCostInEther.isLoading}>
          <Card
            radius='lg'
            shadow='lg'
            fullWidth
            className='bg-primary-400 px-5 py-2 text-white text-lg'
          >
            <p> Current entry cost: {entryCostInEther.data} MATIC</p>
          </Card>
        </Skeleton>
        <div className='grid grid-cols-1 gap-3'>
          <Input
            label='Update entry cost'
            labelPlacement='outside'
            value={entryCostValue}
            onValueChange={(value) => setEntryCostValue(value)}
            placeholder='0x...'
            type='text'
          />
          <Web3Button
            theme='dark'
            style={{ width: '100%' }}
            isDisabled={!raffleStatus}
            contractAddress={RAFFLE_CONTRACT_ADDRESS}
            action={(contract) => {
              contract.call('changeEntryCost', [
                ethers.utils.parseEther(entryCostValue),
              ])
            }}
            onSuccess={resetEntryCost}
          >
            Update entry cost
          </Web3Button>
          <Divider />
          <AdminWithDrawBalance />
        </div>
      </CardBody>
    </Card>
  )
}

export default AdminEntryCost
