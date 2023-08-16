import AdminEntryCost from '../../components/AdminEntryCost'
import AdminRaffleStatus from '../../components/AdminRaffleStatus'

const AdminPage = () => {
  return (
    <section className='max-w-screen-2xl w-full h-full place-content-start grid grid-cols-3 gap-8'>
      <AdminRaffleStatus />
      <AdminEntryCost />
      <AdminRaffleStatus />
    </section>
  )
}

export default AdminPage
