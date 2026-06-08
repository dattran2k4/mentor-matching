import { useAuthStore } from '@/store/auth-store'
import { getMockEmailFromToken, mockUsers } from '@/services/mock/auth.mock.api'
import type { ApiResponse } from '@/types/api/common'
import type { CurrentUserApiResponse } from '@/types/api/user'
import type { CurrentUser } from '@/types/models/user'

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

function buildSuccessResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
  return {
    status: 200,
    code: 'SUCCESS',
    success: true,
    message,
    data
  }
}

export const mockUserApi = {
  async getCurrentUser(): Promise<ApiResponse<CurrentUserApiResponse>> {
    await delay()

    const email = getMockEmailFromToken(useAuthStore.getState().accessToken)

    if (!email || !mockUsers[email]) {
      throw new Error('Phiên đăng nhập mock không hợp lệ')
    }

    const user: CurrentUser = mockUsers[email]

    return buildSuccessResponse(
      {
        id: Number(user.id),
        email: user.email,
        fullName: user.fullName,
        phone: '',
        role: user.roles[0] ?? '',
        userType: '',
        status: 'ACTIVE'
      },
      'Get current user successfully'
    )
  }
}
