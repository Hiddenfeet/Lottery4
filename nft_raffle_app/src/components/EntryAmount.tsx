import { useState } from 'react'
import useRaffleContract from '../hooks/useRaffleContract'
import { Button, Input } from '@nextui-org/react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { ethers } from 'ethers'
import { Web3Button, useAddress } from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../constants'

const EntryAmountButton = ({
  children,
  onClick,
}: {
  children: JSX.Element
  onClick: () => void
}) => (
  <Button onClick={onClick} size='sm' radius='lg' variant='faded'>
    {children}
  </Button>
)

const EntryAmount = () => {
  const address = useAddress()
  const [entryAmount, setEntryAmount] = useState(0)
  const { entryCost, raffleStatus } = useRaffleContract()

  const entryCostOnSubmit =
    parseFloat(ethers.utils.formatEther(entryCost.data || '0')) * entryAmount

  const increaseEntryAmount = () => {
    setEntryAmount(isNaN(entryAmount) ? 1 : entryAmount + 1)
  }
  const decreaseEntryAmount = () => {
    if (entryAmount > 0) {
      setEntryAmount(entryAmount - 1)
    }
  }

  if (!address) {
    return <p> Connect your wallet to buy entries!</p>
  }

  return (
    <div className='flex items-center gap-10 justify-between w-full'>
      <div className='flex items-center gap-5 w-[50%]'>
        <EntryAmountButton onClick={decreaseEntryAmount}>
          <AiOutlineMinus className='w-5 h-5' />
        </EntryAmountButton>
        <Input
          variant='faded'
          classNames={{ input: 'text-center text-black' }}
          size='sm'
          radius='lg'
          onValueChange={(value) => setEntryAmount(parseInt(value))}
          value={isNaN(entryAmount) ? '0' : entryAmount.toString()}
        />
        <EntryAmountButton onClick={increaseEntryAmount}>
          <AiOutlinePlus className='w-5 h-5' />
        </EntryAmountButton>
      </div>

      <Web3Button
        className='rounded-xl w-[50%]'
        isDisabled={!raffleStatus.data}
        contractAddress={RAFFLE_CONTRACT_ADDRESS}
        action={(contract) => {
          return contract.call('buyEntry', [entryAmount], {
            value: ethers.utils.parseEther(entryCostOnSubmit.toString() || '0'),
          })
        }}
      >
        Buy Entries
      </Web3Button>
    </div>
  )
}

export default EntryAmount
