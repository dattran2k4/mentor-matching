import type { UserStatus } from '@/types/models/user'

export type CurrentUserApiResponse = {
  id: number
  fullName: string
  email: string
  phone: string
  role: string
  userType: string
  status: UserStatus
}
