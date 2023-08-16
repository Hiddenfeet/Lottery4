import notFoundImg from '../assets/notFound.jpg'

const NotFound = () => {
  return (
    <div className='w-full h-full grid place-content-center'>
      <img src={notFoundImg} className=' max-w-screen-2xl' />
    </div>
  )
}

export default NotFound
