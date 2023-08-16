import Navbar from './layouts/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from 'react-router-dom'
import Landing from './pages/Landing'
import AdminPage from './pages/Admin'
import NotFound from './pages/notFound'

const Root = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/admin',
          element: <AdminPage />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
