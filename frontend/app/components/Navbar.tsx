import { Bell, GraduationCap, LogOut, Menu, X } from 'lucide-react'
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
              <motion.div
                layoutId='underline'
                className='bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full'
              />
            )}
          </>
        )}
      </NavLink>
      <NavLink to={path.discover} className={linkClass} onClick={() => setMobileOpen(false)}>
        {({ isActive }) => (
          <>
            Tìm mentor
            {isActive && (
              <motion.div
                layoutId='underline'
                className='bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full'
              />
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
                <motion.div
                  layoutId='underline'
                  className='bg-primary absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full'
                />
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
      <nav
        className={`page-container flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className='flex items-center gap-8'>
          <Link className='group flex items-center gap-2' to='/'>
            <div className='bg-primary/10 text-primary group-hover:bg-primary rounded-xl p-2 transition-colors duration-300 group-hover:text-white'>
              <GraduationCap
                size={20}
                className='transition-transform duration-300 group-hover:-translate-y-0.5'
              />
            </div>
            <span className='text-ink group-hover:text-primary text-xl font-semibold tracking-tight transition-colors'>
              Mentor Matching
            </span>
          </Link>
          <div className='hidden items-center gap-6 md:flex'>{navLinks}</div>
        </div>

        <div className='flex items-center gap-4'>
          <Link
            className='border-primary/20 text-primary hover:border-primary hover:bg-primary/5 hover:shadow-soft hidden items-center gap-2 rounded-full border-2 bg-white/50 px-5 py-2 text-sm font-semibold backdrop-blur transition-all duration-300 md:inline-flex'
            to={path.mentorPanel.root}
          >
            Trở thành Mentor
          </Link>

          {accessToken ? (
            <>
              <button
                className='hover:border-primary hover:text-primary hover:shadow-soft relative hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all md:flex'
                type='button'
              >
                <Bell size={18} />
                <span className='absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500' />
              </button>
              {dashboardPath ? (
                <Link
                  className='from-primary to-secondary shadow-soft hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr text-xs font-semibold text-white transition-transform hover:scale-105 md:flex'
                  to={dashboardPath}
                >
                  EM
                </Link>
              ) : null}
              <button
                className='hidden items-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-3 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 md:inline-flex'
                type='button'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              className='bg-primary from-primary to-primary-light hover:shadow-glow hidden rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 md:inline-flex'
              to={path.login}
            >
              Đăng nhập
            </Link>
          )}

          <button
            className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 active:bg-slate-100 md:hidden'
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
            className='border-t border-slate-200/50 bg-white/95 py-4 backdrop-blur-xl md:hidden'
          >
            <div className='page-container'>
              <div className='flex flex-col gap-2'>{navLinks}</div>
              <div className='mt-5 flex flex-col gap-3 border-t border-slate-200/50 pt-5'>
                <Link
                  className='border-primary/20 bg-primary/5 text-primary hover:bg-primary rounded-xl border-2 px-4 py-3 text-center text-sm font-semibold transition-colors hover:text-white'
                  to={path.mentorPanel.root}
                  onClick={() => setMobileOpen(false)}
                >
                  Trở thành Mentor
                </Link>
                {accessToken ? (
                  <button
                    className='flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600'
                    type='button'
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                ) : (
                  <Link
                    className='bg-primary from-primary to-primary-light shadow-soft rounded-xl bg-gradient-to-r px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90'
                    to={path.login}
                    onClick={() => setMobileOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
