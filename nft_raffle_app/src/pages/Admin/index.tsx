import AdminEntryCost from '../../components/AdminEntryCost'
import AdminRaffleStatus from '../../components/AdminRaffleStatus'
import AdminRaffleWinner from '../../components/AdminRaffleWinner'

const AdminPage = () => {
  return (
    <section className='max-w-screen-2xl w-full h-full place-content-start grid grid-cols-3 gap-8'>
      <AdminRaffleStatus />
      <AdminEntryCost />
      <AdminRaffleWinner />
    </section>
  )
}

export default AdminPage
