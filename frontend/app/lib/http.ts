import axios, { type AxiosError, type AxiosInstance } from 'axios'

import { env } from '@/config/env'
import { isMockAccessToken } from '@/services/mock/auth.mock.api'
import { path } from '@/config/path'
import { REFRESH_TOKEN_URL } from '@/constants/auth'
import { HttpStatusCode } from '@/constants/http-status'
import { useAuthStore } from '@/store/auth-store'
import type { AuthApiResponse } from '@/types/api/auth'
import type { ApiResponse, ErrorResponse } from '@/types/api/common'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/http-error'
import { getCurrentLocale } from '@/utils/locale'
import { notify } from '@/utils/notify'

class HttpClient {
  instance: AxiosInstance
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: env.VITE_API_BASE_URL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = useAuthStore.getState().accessToken
        const locale = getCurrentLocale()

        if (config.headers) {
          config.headers['Accept-Language'] = locale
        }

        if (accessToken && config.headers && config.url !== REFRESH_TOKEN_URL) {
          config.headers.Authorization = accessToken.startsWith('Bearer ')
            ? accessToken
            : `Bearer ${accessToken}`
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        const statusCode = error.response?.status

        if (statusCode === HttpStatusCode.Forbidden) {
          if (window.location.pathname !== path.forbidden) {
            window.location.assign(path.forbidden)
          }
          return Promise.reject(error)
        }

        if (statusCode !== HttpStatusCode.Unauthorized) {
          const accessToken = useAuthStore.getState().accessToken
          const isNetworkError = !error.response
          const skipNotify = env.VITE_USE_MOCK && (isNetworkError || isMockAccessToken(accessToken))

          if (!skipNotify) {
            const data = error.response?.data as { message?: string } | undefined
            const message = isNetworkError
              ? 'Không kết nối được API. Bật mock (VITE_USE_MOCK=true) hoặc chạy backend.'
              : data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
            notify.error(message)
          }

          return Promise.reject(error)
        }

        if (isAxiosUnauthorizedError<ErrorResponse>(error)) {
          const config = error.config
          const requestUrl = config?.url || ''

          if (config && isAxiosExpiredTokenError(error) && requestUrl !== REFRESH_TOKEN_URL) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })

            return this.refreshTokenRequest.then((accessToken) => {
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${accessToken}`
                }
              })
            })
          }

          useAuthStore.getState().logout()
          notify.error(error.response?.data?.message || 'Phiên đăng nhập đã hết hạn')
        }

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    const { setAccessToken, logout } = useAuthStore.getState()

    return this.instance
      .post<ApiResponse<AuthApiResponse>>(REFRESH_TOKEN_URL, {})
      .then((res) => {
        const accessToken = res.data.data.accessToken
        setAccessToken(accessToken)
        return accessToken
      })
      .catch((error) => {
        logout()
        throw error
      })
  }
}

const http = new HttpClient().instance

export default http
