import { env } from '@/config/env'
import http from '@/lib/http'
import { mockAuthApi } from '@/services/mock/auth.mock.api'
import type { AuthApiResponse } from '@/types/api/auth'
import type { ApiResponse } from '@/types/api/common'
import type { LoginRequest } from '@/types/form/auth'

const AUTH_ENDPOINTS = {
  login: 'auth/login',
  register: 'auth/register',
  refreshToken: 'auth/refresh-token',
  logout: 'auth/logout'
} as const

const defaultAuthApi = {
  login: async (payload: LoginRequest): Promise<ApiResponse<AuthApiResponse>> =>
    (
      await http.post<ApiResponse<AuthApiResponse>>(AUTH_ENDPOINTS.login, payload, {
        withCredentials: true
      })
    ).data
}

export const authApi = env.useMock ? mockAuthApi : defaultAuthApi
