import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { userApi } from '@/services/user.api'
import type { UpdateCurrentUserPayload } from '@/types/user'

export function useUpdateCurrentUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateCurrentUserPayload) => userApi.updateCurrentUser(payload),
    onSuccess: (currentUser) => {
      queryClient.setQueryData(QUERY_KEYS.auth.me, currentUser)
    }
  })
}
