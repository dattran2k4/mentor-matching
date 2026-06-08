export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED'

export type CurrentUser = {
  id: string
  email: string
  fullName: string
  roles: string[]
}
