export type ApiResponse<T> = {
  status: number
  code: string
  success: boolean
  message: string
  data: T
}

export type PageResponse<T> = {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
  data: T[]
}

export type PageResponseMapping<T> = {
  items: T[]
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
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

export function isPageResponse<T = unknown>(value: unknown): value is PageResponse<T> {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<PageResponse<T>>

  return (
    typeof candidate.page === 'number' &&
    typeof candidate.pageSize === 'number' &&
    typeof candidate.totalPages === 'number' &&
    typeof candidate.totalItems === 'number' &&
    Array.isArray(candidate.data)
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

export function mapApiResponse<T>(response: ApiResponse<T>): T {
  return response.data
}

export function mapPageResponse<T>(response: PageResponse<T>): PageResponseMapping<T>
export function mapPageResponse<TInput, TOutput>(
  response: PageResponse<TInput>,
  itemMapper: (item: TInput, index: number) => TOutput
): PageResponseMapping<TOutput>
export function mapPageResponse<TInput, TOutput = TInput>(
  response: PageResponse<TInput>,
  itemMapper?: (item: TInput, index: number) => TOutput
): PageResponseMapping<TInput | TOutput> {
  const items = itemMapper
    ? response.data.map(itemMapper)
    : (response.data as Array<TInput | TOutput>)

  return {
    items,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    totalItems: response.totalItems,
    hasNextPage: response.page < response.totalPages,
    hasPreviousPage: response.page > 1
  }
}

export function mapApiPageResponse<T>(response: ApiResponse<PageResponse<T>>): PageResponseMapping<T>
export function mapApiPageResponse<TInput, TOutput>(
  response: ApiResponse<PageResponse<TInput>>,
  itemMapper: (item: TInput, index: number) => TOutput
): PageResponseMapping<TOutput>
export function mapApiPageResponse<TInput, TOutput = TInput>(
  response: ApiResponse<PageResponse<TInput>>,
  itemMapper?: (item: TInput, index: number) => TOutput
): PageResponseMapping<TInput | TOutput> {
  return itemMapper ? mapPageResponse(response.data, itemMapper) : mapPageResponse(response.data)
}
