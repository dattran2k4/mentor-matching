import { clsx } from 'clsx'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'

import { path } from '@/config/path'
import type { DashboardNavItem } from '@/constants/dashboard-nav'
import { useAuthStore } from '@/store/auth-store'

type DashboardShellProps = {
  brandLabel: string
  brandHref: string
  navItems: DashboardNavItem[]
  accentClass?: string
  homeLink?: string
}

export function DashboardShell({
  brandLabel,
  brandHref,
  navItems,
  accentClass = 'bg-primary',
  homeLink = '/'
}: DashboardShellProps) {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
      isActive ? 'bg-white text-primary shadow-soft' : 'text-slate-600 hover:bg-white/70 hover:text-ink'
    )

  const sidebar = (
    <aside className='flex h-full flex-col border-r border-line bg-white'>
      <div className='border-b border-line px-5 py-5'>
        <Link className='block' to={brandHref} onClick={() => setSidebarOpen(false)}>
          <span className={clsx('inline-block rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide text-white', accentClass)}>
            {brandLabel}
          </span>
        </Link>
      </div>

      <nav className='flex-1 space-y-1 px-3 py-4'>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className='space-y-2 border-t border-line px-4 py-4'>
        <Link className='block text-sm font-medium text-slate-500 transition hover:text-primary' to={path.discover}>
          Khám phá mentor
        </Link>
        <Link className='block text-sm font-medium text-slate-500 transition hover:text-primary' to={homeLink}>
          ← Về trang chủ
        </Link>
      </div>
    </aside>
  )

  return (
    <div className='min-h-screen bg-base text-ink'>
      {sidebarOpen && (
        <button
          aria-label='Đóng menu'
          className='fixed inset-0 z-40 bg-ink/40 lg:hidden'
          type='button'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className='flex min-h-screen'>
        <div
          className={clsx(
            'fixed inset-y-0 left-0 z-50 w-64 -translate-x-full transition-transform lg:static lg:translate-x-0 lg:shrink-0',
            sidebarOpen && 'translate-x-0'
          )}
        >
          {sidebar}
        </div>

        <div className='min-w-0 flex-1'>
          <header className='sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white/90 px-4 py-3 backdrop-blur md:px-8'>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-lg border border-line text-slate-600 lg:hidden'
              type='button'
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>

            <Link className='hidden text-sm font-medium text-muted transition hover:text-primary md:block' to={path.discover}>
              Khám phá mentor
            </Link>

            <div className='flex items-center gap-2'>
              <Link
                className='hidden rounded-full border border-line px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-primary sm:inline-flex'
                to={homeLink}
              >
                Trang chủ
              </Link>
              <button
                className='inline-flex items-center gap-1 rounded-full border border-line px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-ink'
                type='button'
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span className='hidden sm:inline'>Đăng xuất</span>
              </button>
            </div>

            {sidebarOpen && (
              <button
                className='absolute right-4 top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden'
                type='button'
                onClick={() => setSidebarOpen(false)}
              >
                <X size={18} />
              </button>
            )}
          </header>

          <main className='mx-auto max-w-6xl px-4 py-8 md:px-8'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
