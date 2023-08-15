import { createRoot } from 'react-dom/client'
import App from './App'
import { NextUIProvider } from '@nextui-org/react'
import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react'
import './index.css'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'mumbai'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <ThirdwebProvider
    clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
    activeChain={activeChain}
    supportedWallets={[metamaskWallet(), walletConnect()]}
  >
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </ThirdwebProvider>,
)
