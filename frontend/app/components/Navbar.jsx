import { Bell, ChevronDown, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'

import { path } from '@/config/path'
import { useDashboardPath } from '@/hooks/use-dashboard-path'
import { useAuthStore } from '@/store/auth-store'

const Navbar = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)
  const logout = useAuthStore((state) => state.logout)
  const dashboardPath = useDashboardPath()

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-primary' : 'text-slate-600 hover:text-ink'
    }`

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  const navLinks = (
    <>
      <NavLink to='/' className={linkClass} onClick={() => setMobileOpen(false)}>
        Trang chủ
      </NavLink>
      <NavLink to={path.discover} className={linkClass} onClick={() => setMobileOpen(false)}>
        Khám phá
      </NavLink>
      {dashboardPath ? (
        <NavLink to={dashboardPath} className={linkClass} onClick={() => setMobileOpen(false)}>
          Bảng điều khiển
        </NavLink>
      ) : null}
    </>
  )

  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur'>
      <nav className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6'>
        <div className='flex items-center gap-3'>
          <Link className='text-xl font-semibold text-primary' to='/'>
            EduMarket
          </Link>
          <div className='hidden items-center gap-6 md:flex'>{navLinks}</div>
        </div>

        <div className='flex items-center gap-3'>
          <Link
            className='hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white md:inline-flex'
            to={path.mentorPanel.root}
          >
            Trở thành Mentor
          </Link>

          {accessToken ? (
            <>
              <button
                className='relative hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 md:flex'
                type='button'
              >
                <Bell size={18} />
                <span className='absolute right-3 top-3 h-2 w-2 rounded-full bg-primary' />
              </button>
              {dashboardPath ? (
                <Link
                  className='hidden h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white md:flex'
                  to={dashboardPath}
                >
                  EM
                </Link>
              ) : null}
              <button
                className='hidden items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-ink md:inline-flex'
                type='button'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              className='hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex'
              to={path.login}
            >
              Đăng nhập
            </Link>
          )}

          <button
            className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 md:hidden'
            type='button'
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className='border-t border-slate-200 px-4 py-4 md:hidden'>
          <div className='flex flex-col gap-3'>{navLinks}</div>
          <div className='mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4'>
            <Link
              className='rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-primary'
              to={path.mentorPanel.root}
              onClick={() => setMobileOpen(false)}
            >
              Trở thành Mentor
            </Link>
            {accessToken ? (
              <button
                className='rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600'
                type='button'
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                className='rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white'
                to={path.login}
                onClick={() => setMobileOpen(false)}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
