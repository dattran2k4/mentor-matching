export type AuthUserApiResponse = {
  id: number
  fullName: string
  email: string
  role: string
}

export type AuthApiResponse = {
  accessToken: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  user: AuthUserApiResponse
}
