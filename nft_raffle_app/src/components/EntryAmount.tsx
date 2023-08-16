import { useState } from 'react'
import useRaffleContract from '../hooks/useRaffleContract'
import { Button, Input } from '@nextui-org/react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { ethers } from 'ethers'

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
  const [entryAmount, setEntryAmount] = useState(0)
  const { entryCostInEther, raffleStatus, raffleContract } = useRaffleContract()

  const entryCostOnSubmit = parseFloat(entryCostInEther.data) * entryAmount

  const increaseEntryAmount = () => {
    setEntryAmount(isNaN(entryAmount) ? 1 : entryAmount + 1)
  }
  const decreaseEntryAmount = () => {
    if (entryAmount > 0) {
      setEntryAmount(entryAmount - 1)
    }
  }

  const onBuyEntries = () => {
    if (raffleContract) {
      raffleContract.call('buyEntry', [entryAmount], {
        value: ethers.utils.parseEther(entryCostOnSubmit.toString()),
      })
    }
  }

  console.log(entryAmount)

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

      <Button
        className='rounded-xl w-[50%]'
        isDisabled={!raffleStatus}
        onClick={onBuyEntries}
      >
        Buy Entries
      </Button>
    </div>
  )
}

export default EntryAmount
