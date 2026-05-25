import { env } from '@/config/env'
import http from '@/lib/http'
import { mockAuthApi } from '@/services/mock/auth.mock.api'
import type { AuthResponse, LoginRequest } from '@/types/auth'
import type { ApiResponse } from '@/types/api-response'
import type { CurrentUser } from '@/types/user'

type MeResponse = {
  id: number
  fullName: string
  email: string
  role: string
}

type LoginApiResponse = {
  accessToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  user: MeResponse
}

const AUTH_ENDPOINTS = {
  login: 'v1/auth/login',
  me: 'v1/users/me'
} as const

const realAuthApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await http.post<ApiResponse<LoginApiResponse>>(AUTH_ENDPOINTS.login, payload, {
      withCredentials: true
    })

    const data = response.data.data

    return {
      accessToken: data.accessToken,
      refreshToken: ''
    }
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await http.get<ApiResponse<MeResponse>>(AUTH_ENDPOINTS.me)
    const data = response.data.data

    return {
      id: String(data.id),
      email: data.email,
      fullName: data.fullName,
      roles: data.role ? [data.role] : []
    }
  }
}

export const authApi = env.VITE_USE_MOCK ? mockAuthApi : realAuthApi
