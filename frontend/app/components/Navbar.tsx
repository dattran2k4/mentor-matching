import { Bell, LogOut, Menu, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

import { path } from '@/config/path'
import { useDashboardPath } from '@/hooks/use-dashboard-path'
import { useAuthStore } from '@/store/auth-store'

const Navbar = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const accessToken = useAuthStore((state) => state.accessToken)
  const logout = useAuthStore((state) => state.logout)
  const dashboardPath = useDashboardPath()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors px-1 py-2 ${
      isActive ? 'text-primary' : 'text-slate-600 hover:text-primary-dark'
    }`

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  const navLinks = (
    <>
      <NavLink to='/' className={linkClass} onClick={() => setMobileOpen(false)}>
        {({ isActive }) => (
          <>
            Trang chủ
            {isActive && (
              <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </>
        )}
      </NavLink>
      <NavLink to={path.discover} className={linkClass} onClick={() => setMobileOpen(false)}>
        {({ isActive }) => (
          <>
            Khám phá
            {isActive && (
              <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </>
        )}
      </NavLink>
      {dashboardPath ? (
        <NavLink to={dashboardPath} className={linkClass} onClick={() => setMobileOpen(false)}>
          {({ isActive }) => (
            <>
              Bảng điều khiển
              {isActive && (
                <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-t-full" />
              )}
            </>
          )}
        </NavLink>
      ) : null}
    </>
  )

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel border-b border-white/20' : 'bg-transparent'}`}
    >
      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'} md:px-6`}>
        <div className='flex items-center gap-8'>
          <Link className='flex items-center gap-2 group' to='/'>
            <div className="bg-primary/10 p-2 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className='text-xl font-semibold text-ink group-hover:text-primary transition-colors tracking-tight'>
              EduMarket
            </span>
          </Link>
          <div className='hidden items-center gap-6 md:flex'>{navLinks}</div>
        </div>

        <div className='flex items-center gap-4'>
          <Link
            className='hidden rounded-full border-2 border-primary/20 bg-white/50 backdrop-blur px-5 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-soft md:inline-flex items-center gap-2'
            to={path.mentorPanel.root}
          >
            Trở thành Mentor
          </Link>

          {accessToken ? (
            <>
              <button
                className='relative hidden h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition-all hover:border-primary hover:text-primary md:flex shadow-sm hover:shadow-soft'
                type='button'
              >
                <Bell size={18} />
                <span className='absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white' />
              </button>
              {dashboardPath ? (
                <Link
                  className='hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-secondary text-xs font-semibold text-white shadow-soft transition-transform hover:scale-105 md:flex'
                  to={dashboardPath}
                >
                  EM
                </Link>
              ) : null}
              <button
                className='hidden items-center gap-2 rounded-full border border-slate-200 bg-white pl-3 pr-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 md:inline-flex shadow-sm'
                type='button'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              className='hidden rounded-full bg-primary bg-gradient-to-r from-primary to-primary-light px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-glow hover:-translate-y-0.5 md:inline-flex'
              to={path.login}
            >
              Đăng nhập
            </Link>
          )}

          <button
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 md:hidden'
            type='button'
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='border-t border-slate-200/50 bg-white/95 backdrop-blur-xl px-4 py-4 md:hidden'
          >
            <div className='flex flex-col gap-2'>{navLinks}</div>
            <div className='mt-5 flex flex-col gap-3 border-t border-slate-200/50 pt-5'>
              <Link
                className='rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white'
                to={path.mentorPanel.root}
                onClick={() => setMobileOpen(false)}
              >
                Trở thành Mentor
              </Link>
              {accessToken ? (
                <button
                  className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex justify-center items-center gap-2'
                  type='button'
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              ) : (
                <Link
                  className='rounded-xl bg-primary bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-center text-sm font-semibold text-white shadow-soft hover:opacity-90'
                  to={path.login}
                  onClick={() => setMobileOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
