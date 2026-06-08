import { Navigate, Outlet, useSearchParams } from 'react-router'

import { path } from '@/config/path'
import { useCurrentUserQuery } from '@/hooks/queries/auth/useCurrentUserQuery'
import { useAuthStore } from '@/store/auth-store'
import { getDashboardPath } from '@/utils/get-dashboard-path'

export default function GuestLayout() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const [searchParams] = useSearchParams()
  const { data: user, isLoading } = useCurrentUserQuery()

  if (accessToken) {
    const redirectTo = searchParams.get('redirectTo')
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />
    }

    if (isLoading) {
      return (
        <div className='flex min-h-[40vh] items-center justify-center'>
          <p className='text-muted text-sm'>Đang chuyển hướng...</p>
        </div>
      )
    }

    if (user) {
      return <Navigate to={getDashboardPath(user.roles)} replace />
    }

    return <Navigate to={path.discover} replace />
  }

  return <Outlet />
}
