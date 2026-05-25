export type ApiResponse<T> = {
  status: number
  code: string
  success: boolean
  message: string
  data: T
}

export type ErrorResponse = {
  code: string
  status: number
  message: string
  path: string
  timestamp: string
}

export function isApiResponse<T = unknown>(value: unknown): value is ApiResponse<T> {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<ApiResponse<T>>

  return (
    typeof candidate.status === 'number' &&
    typeof candidate.code === 'string' &&
    typeof candidate.success === 'boolean' &&
    typeof candidate.message === 'string' &&
    'data' in candidate
  )
}

export function isErrorResponse(value: unknown): value is ErrorResponse {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<ErrorResponse>

  return (
    typeof candidate.code === 'string' &&
    typeof candidate.status === 'number' &&
    typeof candidate.message === 'string' &&
    typeof candidate.path === 'string' &&
    typeof candidate.timestamp === 'string'
  )
}
