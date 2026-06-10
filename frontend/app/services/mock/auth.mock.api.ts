import { ROLES } from '@/constants/roles'
import { TEST_PASSWORD, testAccounts } from '@/constants/test-accounts'
import { useAuthStore } from '@/store/auth-store'
import type { AuthResponse, LoginRequest } from '@/types/auth'
import type { CurrentUser } from '@/types/user'

export const MOCK_TOKEN_PREFIX = 'mock:'

const mockUsers: Record<string, CurrentUser> = {
  'learner@test.com': {
    id: '1',
    email: 'learner@test.com',
    fullName: 'Học viên Test',
    phone: '0900000001',
    roles: [ROLES.LEARNER],
    userType: 'STUDENT',
    status: 'ACTIVE'
  },
  'mentor@test.com': {
    id: '2',
    email: 'mentor@test.com',
    fullName: 'Mentor Test',
    phone: '0900000002',
    roles: [ROLES.MENTOR],
    userType: 'WORKING_ADULT',
    status: 'ACTIVE'
  },
  'admin@test.com': {
    id: '3',
    email: 'admin@test.com',
    fullName: 'Admin Test',
    phone: '0900000003',
    roles: [ROLES.ADMIN],
    userType: 'WORKING_ADULT',
    status: 'ACTIVE'
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

export const mockAuthApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    await delay()

    const email = payload.email.trim().toLowerCase()
    const user = mockUsers[email]

    if (!user || payload.password !== TEST_PASSWORD) {
      throw new Error('Email hoặc mật khẩu không đúng. Dùng mật khẩu 123456 cho tài khoản test.')
    }

    return {
      accessToken: `${MOCK_TOKEN_PREFIX}${email}`,
      refreshToken: 'mock-refresh-token'
    }
  },

  async getCurrentUser(): Promise<CurrentUser> {
    await delay(200)

    const email = getMockEmailFromToken(useAuthStore.getState().accessToken)

    if (!email || !mockUsers[email]) {
      throw new Error('Phiên đăng nhập mock không hợp lệ')
    }

    return mockUsers[email]
  }
}

export const mockAccountEmails = testAccounts.map((account) => account.email)
