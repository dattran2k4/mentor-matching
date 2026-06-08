import { env } from '@/config/env'
import http from '@/lib/http'
import { mockAuthApi } from '@/services/mock/auth.mock.api'
import type { AuthApiResponse } from '@/types/api/auth'
import type { ApiResponse } from '@/types/api/common'
import type { LoginRequest, RegisterRequest } from '@/types/form/auth'

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
    ).data,

  register: async (payload: RegisterRequest): Promise<ApiResponse<AuthApiResponse>> =>
    (
      await http.post<ApiResponse<AuthApiResponse>>(AUTH_ENDPOINTS.register, payload, {
        withCredentials: true
      })
    ).data,

  refreshToken: async (): Promise<ApiResponse<AuthApiResponse>> =>
    (
      await http.post<ApiResponse<AuthApiResponse>>(
        AUTH_ENDPOINTS.refreshToken,
        {},
        {
          withCredentials: true
        }
      )
    ).data,

  logout: async (): Promise<ApiResponse<null>> =>
    (
      await http.post<ApiResponse<null>>(
        AUTH_ENDPOINTS.logout,
        {},
        {
          withCredentials: true
        }
      )
    ).data
}

export const authApi = env.useMock ? mockAuthApi : defaultAuthApi
