import { env } from '@/config/env'
import http from '@/lib/http'
import { mockUserApi } from '@/services/mock/user.mock.api'
import type { ApiResponse } from '@/types/api/common'
import type { CurrentUserApiResponse } from '@/types/api/user'

const USER_ENDPOINTS = {
  me: 'users/me',
  learnerProfile: 'users/me/learner-profile'
} as const

const defaultUserApi = {
  getCurrentUser: async (): Promise<ApiResponse<CurrentUserApiResponse>> =>
    (await http.get<ApiResponse<CurrentUserApiResponse>>(USER_ENDPOINTS.me)).data
}

export const userApi = env.useMock ? mockUserApi : defaultUserApi
