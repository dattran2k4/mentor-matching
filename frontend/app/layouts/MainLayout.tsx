import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className='bg-base text-ink min-h-screen'>
      <Navbar />
      <main className='mx-auto min-h-[70vh] max-w-6xl px-4 py-10 md:px-6'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
