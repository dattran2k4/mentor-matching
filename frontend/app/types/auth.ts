export type AuthResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type RefreshTokenResponse = {
  accessToken: string
}
