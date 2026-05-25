import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { authApi } from '@/services/auth.api'
import { useAuthStore } from '@/store/auth-store'

export function useCurrentUserQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: authApi.getCurrentUser,
    enabled: Boolean(accessToken)
  })
}
