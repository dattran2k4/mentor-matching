import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { userApi } from '@/services/user.api'
import { useAuthStore } from '@/store/auth-store'

export function useLearnerProfileQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: QUERY_KEYS.user.learnerProfile,
    queryFn: userApi.getLearnerProfile,
    enabled: Boolean(accessToken)
  })
}
