import { Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react'
import useRaffleContract from '../hooks/useRaffleContract'
import { useState } from 'react'
import RaffleStatus from './RaffleStatus'
import { Web3Button } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'

const AdminRaffleStatus = () => {
  const { raffleStatus, contract } = useRaffleContract()

  const [nftContractAddress, setNftContractAddress] = useState('')
  const [tokenId, setTokenId] = useState('0')

  const resetStates = () => {
    setNftContractAddress('')
    setTokenId('0')
  }

  return (
    <Card fullWidth>
      <CardHeader>
        <h2 className='text-2xl font-semibold'>Status</h2>
      </CardHeader>
      <Divider />
      <CardBody className='gap-6'>
        <RaffleStatus />

        {!raffleStatus.isRaffleOpen ? (
          <div className='grid grid-cols-1 gap-3'>
            <Input
              label='Prize Contract Address'
              labelPlacement='outside'
              value={nftContractAddress}
              onValueChange={(value) => setNftContractAddress(value)}
              placeholder='0x...'
              type='text'
            />
            <Input
              label='Token ID'
              labelPlacement='outside'
              value={tokenId.toString()}
              onValueChange={(value) => setTokenId(value)}
              placeholder='0'
            />

            <Web3Button
              theme='dark'
              isDisabled={!contract || !nftContractAddress}
              contractAddress={RAFFLE_CONTRACT_ADDRESS}
              action={(contract) => {
                contract.call('startRaffle', [
                  nftContractAddress,
                  parseInt(tokenId),
                ])
              }}
              onSuccess={resetStates}
            >
              Start Raffle
            </Web3Button>
          </div>
        ) : (
          <div>
            <Web3Button
              style={{ width: '100%' }}
              theme='dark'
              contractAddress={RAFFLE_CONTRACT_ADDRESS}
              action={(contract) => contract.call('endRaffle')}
            >
              End Raffle
            </Web3Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default AdminRaffleStatus
