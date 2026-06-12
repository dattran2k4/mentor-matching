import { env } from '@/config/env'
import http from '@/lib/http'
import { mockPaymentApi } from '@/services/mock/payment.mock.api'
import type { ApiResponse } from '@/types/api/common'
import type { CreatePaymentRequest, PaymentApiResponse } from '@/types/api/payment'

const PAYMENT_ENDPOINTS = {
  payments: 'payments'
} as const

const defaultPaymentApi = {
  createPayment: async (payload: CreatePaymentRequest): Promise<ApiResponse<PaymentApiResponse>> =>
    (await http.post<ApiResponse<PaymentApiResponse>>(PAYMENT_ENDPOINTS.payments, payload)).data
}

export const paymentApi = env.useMock ? mockPaymentApi : defaultPaymentApi
