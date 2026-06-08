import { useMutation } from '@tanstack/react-query'

import { authApi } from '@/services/auth.api'
import { useAuthStore } from '@/store/auth-store'
import type { LoginRequest } from '@/types/form/auth'

export function useLoginMutation() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
    }
  })
}
