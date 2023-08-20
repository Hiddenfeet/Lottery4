import Navbar from './layouts/Navbar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import AdminPage from './pages/Admin'
import NotFound from './pages/notFound'

const Root = () => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path='/admin' component={AdminPage} />
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
