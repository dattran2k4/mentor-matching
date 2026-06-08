import { useAuthStore } from '@/store/auth-store'
import { getMockEmailFromToken, mockUsers } from '@/services/mock/auth.mock.api'
import type { ApiResponse } from '@/types/api/common'
import type { CreatePaymentRequest, PaymentApiResponse } from '@/types/api/payment'

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms))

function buildCreatedResponse<T>(data: T, message = 'Created'): ApiResponse<T> {
  return {
    status: 201,
    code: 'SUCCESS',
    success: true,
    message,
    data
  }
}

function requireMockSession() {
  const email = getMockEmailFromToken(useAuthStore.getState().accessToken)

  if (!email || !mockUsers[email]) {
    throw new Error('Phiên đăng nhập mock không hợp lệ')
  }

  return {
    email,
    user: mockUsers[email]
  }
}

export const mockPaymentApi = {
  async createPayment(payload: CreatePaymentRequest): Promise<ApiResponse<PaymentApiResponse>> {
    await delay()

    const { user } = requireMockSession()
    const paymentId = Date.now()

    return buildCreatedResponse(
      {
        id: paymentId,
        bookingId: payload.bookingId,
        payerUserId: Number(user.id),
        amount: 300000,
        paymentMethod: 'GATEWAY',
        paymentProvider: 'STRIPE',
        status: 'PENDING',
        checkoutUrl: `https://checkout.stripe.example/pay/${paymentId}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      },
      'Create payment successfully'
    )
  }
}
