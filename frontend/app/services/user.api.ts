import { env } from '@/config/env'
import http from '@/lib/http'
import { learnerProfileDraft } from '@/mocks/learner-workspace'
import { mockAuthApi } from '@/services/mock/auth.mock.api'
import type { ApiResponse } from '@/types/api-response'
import type {
  CurrentUser,
  LearnerGender,
  LearnerProfile,
  UpdateCurrentUserPayload,
  UpdateLearnerProfilePayload,
  UserStatus,
  UserType
} from '@/types/user'

type CurrentUserApiResponse = {
  id: number
  fullName: string
  email: string
  phone?: string
  role: string
  userType?: UserType
  status?: UserStatus
}

type LearnerProfileApiResponse = {
  id: number | null
  userId: number
  gender: LearnerGender | null
  birthYear: number | null
  schoolName: string | null
  gradeId: number | null
  learningGoal: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

const USER_ENDPOINTS = {
  me: 'v1/users/me',
  learnerProfile: 'v1/users/me/learner-profile'
} as const

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

function mapCurrentUser(data: CurrentUserApiResponse): CurrentUser {
  return {
    id: String(data.id),
    email: data.email,
    fullName: data.fullName,
    phone: data.phone,
    roles: data.role ? [data.role] : [],
    userType: data.userType,
    status: data.status
  }
}

function mapLearnerProfile(data: LearnerProfileApiResponse): LearnerProfile {
  return {
    id: data.id == null ? null : String(data.id),
    userId: String(data.userId),
    gender: data.gender ?? '',
    birthYear: data.birthYear,
    schoolName: data.schoolName ?? '',
    gradeId: data.gradeId,
    learningGoal: data.learningGoal ?? '',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

const mockLearnerProfile: LearnerProfile = {
  id: '1',
  userId: '1',
  gender: 'MALE',
  birthYear: Number(learnerProfileDraft.birthYear),
  schoolName: learnerProfileDraft.schoolName,
  gradeId: 1,
  learningGoal: learnerProfileDraft.learningGoal,
  createdAt: null,
  updatedAt: null
}

const realUserApi = {
  async getCurrentUser(): Promise<CurrentUser> {
    const response = await http.get<ApiResponse<CurrentUserApiResponse>>(USER_ENDPOINTS.me)
    return mapCurrentUser(response.data.data)
  },

  async updateCurrentUser(payload: UpdateCurrentUserPayload): Promise<CurrentUser> {
    const response = await http.put<ApiResponse<CurrentUserApiResponse>>(USER_ENDPOINTS.me, payload)
    return mapCurrentUser(response.data.data)
  },

  async getLearnerProfile(): Promise<LearnerProfile> {
    const response = await http.get<ApiResponse<LearnerProfileApiResponse>>(
      USER_ENDPOINTS.learnerProfile
    )
    return mapLearnerProfile(response.data.data)
  },

  async updateLearnerProfile(payload: UpdateLearnerProfilePayload): Promise<LearnerProfile> {
    const response = await http.put<ApiResponse<LearnerProfileApiResponse>>(
      USER_ENDPOINTS.learnerProfile,
      payload
    )
    return mapLearnerProfile(response.data.data)
  }
}

const mockUserApi = {
  async getCurrentUser(): Promise<CurrentUser> {
    return mockAuthApi.getCurrentUser()
  },

  async updateCurrentUser(payload: UpdateCurrentUserPayload): Promise<CurrentUser> {
    await delay()
    const currentUser = await mockAuthApi.getCurrentUser()

    return {
      ...currentUser,
      fullName: payload.fullName,
      phone: payload.phone,
      userType: payload.userType
    }
  },

  async getLearnerProfile(): Promise<LearnerProfile> {
    await delay()
    return mockLearnerProfile
  },

  async updateLearnerProfile(payload: UpdateLearnerProfilePayload): Promise<LearnerProfile> {
    await delay()

    return {
      ...mockLearnerProfile,
      gender: payload.gender ?? '',
      birthYear: payload.birthYear,
      schoolName: payload.schoolName,
      gradeId: payload.gradeId,
      learningGoal: payload.learningGoal,
      updatedAt: new Date().toISOString()
    }
  }
}

export const userApi = env.VITE_USE_MOCK ? mockUserApi : realUserApi
