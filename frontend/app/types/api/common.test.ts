import { describe, expect, it } from 'vitest'

import {
  isApiResponse,
  isErrorResponse,
  isPageResponse,
  mapApiPageResponse,
  mapApiResponse,
  mapPageResponse,
  type ApiResponse,
  type ErrorResponse,
  type PageResponse
} from '@/types/api/common'

describe('api-response helpers', () => {
  it('recognizes valid api and error responses', () => {
    const apiResponse: ApiResponse<{ id: number }> = {
      status: 200,
      code: 'SUCCESS',
      success: true,
      message: 'OK',
      data: { id: 1 }
    }

    const errorResponse: ErrorResponse = {
      code: 'VALIDATION_ERROR',
      status: 400,
      message: 'Invalid request',
      path: '/api/v1/mentors',
      timestamp: '2026-06-08T12:00:00'
    }

    expect(isApiResponse(apiResponse)).toBe(true)
    expect(isErrorResponse(errorResponse)).toBe(true)
    expect(mapApiResponse(apiResponse)).toEqual({ id: 1 })
  })

  it('maps backend page response into frontend pagination shape', () => {
    const pageResponse: PageResponse<{ id: number; name: string }> = {
      page: 2,
      pageSize: 10,
      totalPages: 3,
      totalItems: 21,
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    }

    expect(isPageResponse(pageResponse)).toBe(true)
    expect(mapPageResponse(pageResponse)).toEqual({
      items: pageResponse.data,
      page: 2,
      pageSize: 10,
      totalPages: 3,
      totalItems: 21,
      hasNextPage: true,
      hasPreviousPage: true
    })

    expect(
      mapApiPageResponse(
        {
          status: 200,
          code: 'SUCCESS',
          success: true,
          message: 'Fetched mentors',
          data: pageResponse
        },
        (item) => item.name
      )
    ).toEqual({
      items: ['Alice', 'Bob'],
      page: 2,
      pageSize: 10,
      totalPages: 3,
      totalItems: 21,
      hasNextPage: true,
      hasPreviousPage: true
    })
  })

  it('rejects invalid page response shapes', () => {
    expect(
      isPageResponse({
        page: 1,
        pageSize: 10,
        totalPages: 2,
        totalItems: 20,
        data: null
      })
    ).toBe(false)
  })
})
