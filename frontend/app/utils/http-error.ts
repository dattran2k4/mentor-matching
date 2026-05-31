import type { AxiosError } from 'axios'

import { EXPIRED_TOKEN_ERROR_CODE } from '@/constants/auth'
import type { ErrorResponse } from '@/types/api-response'

export function isAxiosUnauthorizedError<T>(error: AxiosError<T>): error is AxiosError<T> {
  return error.response?.status === 401
}

export function isAxiosExpiredTokenError(error: AxiosError<ErrorResponse>): boolean {
  const code = error.response?.data?.code
  return code === EXPIRED_TOKEN_ERROR_CODE
}
