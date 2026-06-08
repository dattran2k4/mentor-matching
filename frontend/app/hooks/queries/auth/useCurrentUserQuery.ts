import { queryOptions, useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { userApi } from '@/services/user.api'
import { useAuthStore } from '@/store/auth-store'
import type { CurrentUser } from '@/types/models/user'

function mapCurrentUser(response: Awaited<ReturnType<typeof userApi.getCurrentUser>>): CurrentUser {
  const data = response.data

  return {
    id: String(data.id),
    email: data.email,
    fullName: data.fullName,
    roles: data.role ? [data.role] : []
  }
}

async function fetchCurrentUser(): Promise<CurrentUser> {
  return mapCurrentUser(await userApi.getCurrentUser())
}

export function getCurrentUserQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: fetchCurrentUser
  })
}

export function useCurrentUserQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    ...getCurrentUserQueryOptions(),
    enabled: Boolean(accessToken)
  })
}
