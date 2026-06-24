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

export function parseValidationFieldErrors<TField extends string>(
  message: string | undefined,
  fieldAliases: Partial<Record<string, TField>>
): Partial<Record<TField, string>> {
  if (!message) return {}

  return message.split(';').reduce<Partial<Record<TField, string>>>((fieldErrors, part) => {
    const separatorIndex = part.indexOf(':')
    if (separatorIndex < 0) return fieldErrors

    const backendField = part.slice(0, separatorIndex).trim()
    const field = fieldAliases[backendField]
    const errorMessage = part.slice(separatorIndex + 1).trim()

    if (field && errorMessage) {
      fieldErrors[field] = errorMessage
    }

    return fieldErrors
  }, {})
}

export function getErrorMessage(error: unknown, fallback: string): string {
  const candidate = error as { response?: { data?: Partial<ErrorResponse> }; message?: string }
  return candidate.response?.data?.message || candidate.message || fallback
}
