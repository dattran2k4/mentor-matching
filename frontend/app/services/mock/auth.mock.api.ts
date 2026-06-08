import { ROLES } from '@/constants/roles'
import type { AuthApiResponse } from '@/types/api/auth'
import type { ApiResponse } from '@/types/api/common'
import type { LoginRequest } from '@/types/form/auth'
import type { CurrentUser } from '@/types/models/user'

export const MOCK_TOKEN_PREFIX = 'mock:'
const MOCK_PASSWORD = '123456'

export const mockUsers: Record<string, CurrentUser> = {
  'learner@test.com': {
    id: '1',
    email: 'learner@test.com',
    fullName: 'Học viên Test',
    roles: [ROLES.LEARNER]
  },
  'mentor@test.com': {
    id: '2',
    email: 'mentor@test.com',
    fullName: 'Mentor Test',
    roles: [ROLES.MENTOR]
  },
  'admin@test.com': {
    id: '3',
    email: 'admin@test.com',
    fullName: 'Admin Test',
    roles: [ROLES.ADMIN]
  }
}

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export function getMockEmailFromToken(token: string | null): string | null {
  if (!token?.startsWith(MOCK_TOKEN_PREFIX)) return null
  return token.slice(MOCK_TOKEN_PREFIX.length)
}

export function isMockAccessToken(token: string | null): boolean {
  return Boolean(getMockEmailFromToken(token))
}

function buildSuccessResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
  return {
    status: 200,
    code: 'SUCCESS',
    success: true,
    message,
    data
  }
}

export const mockAuthApi = {
  async login(payload: LoginRequest): Promise<ApiResponse<AuthApiResponse>> {
    await delay()

    const email = payload.email.trim().toLowerCase()
    const user = mockUsers[email]

    if (!user || payload.password !== MOCK_PASSWORD) {
      throw new Error('Email hoặc mật khẩu không đúng. Dùng mật khẩu 123456 cho tài khoản test.')
    }

    return buildSuccessResponse(
      {
        accessToken: `${MOCK_TOKEN_PREFIX}${email}`,
        accessTokenExpiresIn: 3600,
        refreshTokenExpiresIn: 604800,
        user: {
          id: Number(user.id),
          email: user.email,
          fullName: user.fullName,
          role: user.roles[0] ?? ''
        }
      },
      'Login successfully'
    )
  }
}
