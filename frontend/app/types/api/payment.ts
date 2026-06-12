import type { PaymentStatus } from '@/types/models/booking'

export type PaymentMethodApiResponse = 'CASH' | 'BANK_TRANSFER' | 'E_WALLET' | 'CARD' | 'GATEWAY'

export type PaymentProviderApiResponse = 'MOMO' | 'VNPAY' | 'STRIPE' | 'PAYPAL' | 'MANUAL_BANK'

export type CreatePaymentRequest = {
  bookingId: number
}

export type PaymentApiResponse = {
  id: number
  bookingId: number
  payerUserId: number
  amount: number
  paymentMethod: PaymentMethodApiResponse
  paymentProvider: PaymentProviderApiResponse
  status: PaymentStatus
  checkoutUrl: string | null
  expiresAt: string | null
}
