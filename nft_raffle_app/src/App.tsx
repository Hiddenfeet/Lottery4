import Navbar from './layouts/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import AdminPage from './pages/Admin'
import NotFound from './pages/notFound'
import useRaffleContract from './hooks/useRaffleContract'
import { useAddress } from '@thirdweb-dev/react'

const Root = () => {
  const address = useAddress()
  const { owner } = useRaffleContract()

  return (
    <>
      <Navbar />
      <main>
        <Switch>
          {owner?.data && address === owner?.data && (
            <Route path='/admin' component={AdminPage} />
          )}
          <Route path='/' component={Landing} />
          <Route path='/*' component={NotFound} />
        </Switch>
      </main>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  )
}

export default App
