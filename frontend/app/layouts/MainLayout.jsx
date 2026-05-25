import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 md:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
