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
const activeChain = 'CronosBeta'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <ThirdwebProvider
    
    activeChain={{
      chainId: 25,
      rpc: ["https://mainnet.cronoslabs.com/v1/55e37d8975113ae7a44603ef8ce460aa"],
      nativeCurrency: {
        decimals: 18,
        name: "Cronos",
        symbol: "CRO",
      },
      shortName: "CRO",
      slug: "Cronos",
      testnet: false,
      chain: "Cronos Mainnet",
      name: "Cronos Mainnet",
    }}
    supportedWallets={[metamaskWallet(), walletConnect()]}
  >
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </ThirdwebProvider>,
)
