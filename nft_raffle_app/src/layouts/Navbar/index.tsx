import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Navbar as BaseNavbar,
} from '@nextui-org/react'
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
      className='text-white bg-teal-700 min-h-fit py-2'
    >
      <NavbarBrand>
        <h1 className='text-2xl'>NFT Raffle</h1>
      </NavbarBrand>
      <NavbarContent className='sm:flex gap-4' justify='center'>
        <NavbarItem>
          {!isLoadingOwner && owner === address && (
            <Link className='text-xl text-white' href='admin'>
              Admin
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <ConnectWallet theme='light' />
        </NavbarItem>
      </NavbarContent>
    </BaseNavbar>
  )
}

export default Navbar
