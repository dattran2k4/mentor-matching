import { env } from '@/config/env'
import http from '@/lib/http'
import { mockCatalogApi } from '@/services/mock/catalog.mock.api'
import type { CatalogOptionsApiResponse } from '@/types/api/catalog'
import type { ApiResponse } from '@/types/api/common'

const CATALOG_ENDPOINTS = {
  options: 'catalog/options'
} as const

const defaultCatalogApi = {
  getCatalogOptions: async (): Promise<ApiResponse<CatalogOptionsApiResponse>> =>
    (await http.get<ApiResponse<CatalogOptionsApiResponse>>(CATALOG_ENDPOINTS.options)).data
}

export const catalogApi = env.useMock ? mockCatalogApi : defaultCatalogApi
