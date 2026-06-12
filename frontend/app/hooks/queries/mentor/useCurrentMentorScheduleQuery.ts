import { queryOptions, useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { mentorApi } from '@/services/mentor.api'
import { useAuthStore } from '@/store/auth-store'
import type {
  CurrentMentorApiResponse,
  MentorAvailabilityDetailApiResponse
} from '@/types/api/mentor'

export type CurrentMentorScheduleApiBundle = {
  currentMentor: CurrentMentorApiResponse
  availabilities: MentorAvailabilityDetailApiResponse[]
}

async function fetchCurrentMentorSchedule(): Promise<CurrentMentorScheduleApiBundle> {
  const currentMentor = (await mentorApi.getCurrentMentor()).data
  const availabilities = (await mentorApi.getMentorAvailabilities(currentMentor.id)).data

  return {
    currentMentor,
    availabilities
  }
}

export function getCurrentMentorScheduleQueryOptions() {
  return queryOptions({
    queryKey: QUERY_KEYS.mentor.currentSchedule,
    queryFn: fetchCurrentMentorSchedule
  })
}

export function useCurrentMentorScheduleQuery() {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    ...getCurrentMentorScheduleQueryOptions(),
    enabled: Boolean(accessToken)
  })
}
