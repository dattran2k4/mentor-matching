export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED'
export type UserType = 'STUDENT' | 'PARENT' | 'UNIVERSITY_STUDENT' | 'WORKING_ADULT'
export type LearnerGender = 'MALE' | 'FEMALE' | 'OTHER'

export type CurrentUser = {
  id: string
  email: string
  fullName: string
  phone?: string
  roles: string[]
  userType?: UserType
  status?: UserStatus
}

export type LearnerProfile = {
  id: string | null
  userId: string
  gender: LearnerGender | ''
  birthYear: number | null
  schoolName: string
  gradeId: number | null
  learningGoal: string
  createdAt?: string | null
  updatedAt?: string | null
}

export type UpdateCurrentUserPayload = {
  fullName: string
  phone: string
  userType: UserType
}

export type UpdateLearnerProfilePayload = {
  gender: LearnerGender | null
  birthYear: number | null
  schoolName: string
  gradeId: number | null
  learningGoal: string
}
