import { Navigate, Outlet, useLocation } from 'react-router'

import { path } from '@/config/path'
import { useAuthStore } from '@/stores/auth-store'

export default function ProtectedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const location = useLocation()

  if (!accessToken) {
    const redirectTo = encodeURIComponent(`${location.pathname}${location.search}`)
    return <Navigate to={`${path.login}?redirectTo=${redirectTo}`} replace />
  }

  return <Outlet />
}
