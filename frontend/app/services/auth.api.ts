import { env } from '@/config/env'
import http from '@/lib/http'
import { mockAuthApi } from '@/services/mock/auth.mock.api'
import type { AuthApiResponse } from '@/types/api/auth'
import { mapApiResponse, type ApiResponse } from '@/types/api/common'
import type { CurrentUserApiResponse } from '@/types/api/user'
import type { LoginRequest } from '@/types/form/auth'
import type { AuthResponse } from '@/types/models/auth'
import type { CurrentUser } from '@/types/models/user'

const AUTH_ENDPOINTS = {
  login: 'v1/auth/login',
  me: 'v1/users/me'
} as const

const realAuthApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await http.post<ApiResponse<AuthApiResponse>>(AUTH_ENDPOINTS.login, payload, {
      withCredentials: true
    })

    const data = mapApiResponse(response.data)

    return {
      accessToken: data.accessToken,
      refreshToken: ''
    }
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await http.get<ApiResponse<CurrentUserApiResponse>>(AUTH_ENDPOINTS.me)
    const data = mapApiResponse(response.data)

    return {
      id: String(data.id),
      email: data.email,
      fullName: data.fullName,
      roles: data.role ? [data.role] : []
    }
  }
}

export const authApi = env.VITE_USE_MOCK ? mockAuthApi : realAuthApi
