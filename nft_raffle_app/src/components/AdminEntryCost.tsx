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
  const { entryCost, raffleStatus } = useRaffleContract()

  const [entryCostValue, setEntryCostValue] = useState('0')
  const resetEntryCost = () => setEntryCostValue('0')

  return (
    <Card fullWidth>
      <CardHeader>
        <h2 className='text-2xl font-semibold'>Entry Cost</h2>
      </CardHeader>
      <Divider />
      <CardBody className='h-full gap-3 flex flex-col justify-between'>
        <Skeleton isLoaded={!entryCost.isLoading}>
          <Card
            radius='lg'
            shadow='lg'
            fullWidth
            className='bg-primary-400 px-5 py-2 text-white text-lg'
          >
            <p>
              {' '}
              Current entry cost:{' '}
              {ethers.utils.formatEther(entryCost.data || '0')} MATIC
            </p>
          </Card>
        </Skeleton>
        <div className='flex flex-col gap-3'>
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
            isDisabled={raffleStatus.data}
            onSuccess={resetEntryCost}
            contractAddress={RAFFLE_CONTRACT_ADDRESS}
            action={(contract) => {
              contract.call('changeEntryCost', [
                ethers.utils.parseEther(entryCostValue || '0'),
              ])
            }}
          >
            Update entry cost
          </Web3Button>
        </div>

        <AdminWithDrawBalance />
      </CardBody>
    </Card>
  )
}

export default AdminEntryCost
