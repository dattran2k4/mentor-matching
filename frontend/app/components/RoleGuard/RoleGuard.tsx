import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { path } from '@/config/path'
import type { Role } from '@/constants/roles'
import { useCurrentUserQuery } from '@/hooks/queries/auth/useCurrentUserQuery'
import { useAuthStore } from '@/stores/auth-store'

type RoleGuardProps = {
  role: Role
  children?: ReactNode
}

export function RoleGuard({ role, children }: RoleGuardProps) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const location = useLocation()
  const { data: user, isLoading, isError } = useCurrentUserQuery()

  if (!accessToken) {
    const redirectTo = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`${path.login}?redirectTo=${redirectTo}`} replace />
  }

  if (isLoading) {
    return (
      <div className='bg-base flex min-h-screen items-center justify-center'>
        <p className='text-muted text-sm'>Đang tải...</p>
      </div>
    )
  }

  if (isError || !user?.roles.includes(role)) {
    return <Navigate to={path.forbidden} replace />
  }

  return children ?? <Outlet />
}
