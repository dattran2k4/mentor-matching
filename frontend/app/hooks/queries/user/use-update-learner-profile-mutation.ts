import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { userApi } from '@/services/user.api'
import type { UpdateLearnerProfilePayload } from '@/types/user'

export function useUpdateLearnerProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateLearnerProfilePayload) => userApi.updateLearnerProfile(payload),
    onSuccess: (learnerProfile) => {
      queryClient.setQueryData(QUERY_KEYS.user.learnerProfile, learnerProfile)
    }
  })
}
