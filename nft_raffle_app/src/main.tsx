import { createRoot } from 'react-dom/client'
import App from './App'
import { NextUIProvider } from '@nextui-org/react'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import './styles/globals.css'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <NextUIProvider>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <App />
    </ThirdwebProvider>
  </NextUIProvider>,
)
