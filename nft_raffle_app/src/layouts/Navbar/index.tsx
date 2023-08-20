import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as BaseNavbar,
} from '@nextui-org/react'
import { NavLink } from 'react-router-dom'
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
} from '@thirdweb-dev/react'
import { RAFFLE_CONTRACT_ADDRESS } from '../../constants'

const Navbar = () => {
  const address = useAddress()
  const { contract } = useContract(RAFFLE_CONTRACT_ADDRESS)

  const { data: owner, isLoading: isLoadingOwner } = useContractRead(
    contract,
    'owner',
  )

  return (
    <BaseNavbar
      position='static'
      maxWidth='2xl'
      className='text-white bg-cyan-700 min-h-fit py-2'
    >
      <NavbarBrand>
        <NavLink
          to='/'
          className='text-xl text-white hover:scale-125 transition-all'
        >
          NFT Raffle
        </NavLink>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem>
          {!isLoadingOwner && owner === address && (
            <NavLink
              to='/admin'
              className={(isActive) =>
                `text-white ${
                  isActive ? 'border-b-2 border-white' : 'border-none'
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </NavbarItem>
        <NavbarItem>
          <ConnectWallet theme='light' />
        </NavbarItem>
      </NavbarContent>
    </BaseNavbar>
  )
}

export default Navbar
