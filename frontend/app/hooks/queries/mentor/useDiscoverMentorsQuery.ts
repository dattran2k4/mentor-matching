import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/constants/query-keys'
import { mentorApi } from '@/services/mentor.api'
import type { PageResponse } from '@/types/api/common'
import type {
  GetMentorsQueryParams,
  MentorAvailabilityDetailApiResponse,
  MentorDetailApiResponse,
  MentorListItemApiResponse,
  MentorOptionDetailApiResponse,
  MentorSubjectDetailApiResponse
} from '@/types/api/mentor'

export type DiscoverMentorApiBundle = {
  mentor: MentorListItemApiResponse
  detail: MentorDetailApiResponse | null
  subjects: MentorSubjectDetailApiResponse[]
  traits: MentorOptionDetailApiResponse[]
  availabilities: MentorAvailabilityDetailApiResponse[]
}

export type DiscoverMentorsPage = PageResponse<DiscoverMentorApiBundle>

async function fetchDiscoverMentorBundle(
  mentor: MentorListItemApiResponse
): Promise<DiscoverMentorApiBundle> {
  const [detailResult, subjectsResult, traitsResult, availabilitiesResult] =
    await Promise.allSettled([
      mentorApi.getMentorDetail(mentor.id),
      mentorApi.getMentorSubjects(mentor.id),
      mentorApi.getMentorTraits(mentor.id),
      mentorApi.getMentorAvailabilities(mentor.id)
    ])

  return {
    mentor,
    detail: detailResult.status === 'fulfilled' ? detailResult.value.data : null,
    subjects: subjectsResult.status === 'fulfilled' ? subjectsResult.value.data : [],
    traits:
      traitsResult.status === 'fulfilled'
        ? [...traitsResult.value.data.highlights, ...traitsResult.value.data.personalities].filter(
            (option, index, options) => options.findIndex(({ id }) => id === option.id) === index
          )
        : [],
    availabilities:
      availabilitiesResult.status === 'fulfilled' ? availabilitiesResult.value.data : []
  }
}

async function fetchDiscoverMentors(params: GetMentorsQueryParams): Promise<DiscoverMentorsPage> {
  const mentorPage = (await mentorApi.getMentors(params)).data
  const data = await Promise.all(mentorPage.data.map(fetchDiscoverMentorBundle))

  return {
    ...mentorPage,
    data
  }
}

export function getDiscoverMentorsQueryOptions(params: GetMentorsQueryParams) {
  return queryOptions({
    queryKey: QUERY_KEYS.mentor.list({
      page: params.page ?? 1,
      size: params.size ?? 12,
      search: params.search?.trim() || null,
      gender: params.gender ?? null,
      meetingType: params.meetingType ?? null,
      cityId: params.cityId ?? null,
      districtId: params.districtId ?? null,
      subjectId: params.subjectId ?? null,
      gradeId: params.gradeId ?? null,
      sortBy: params.sortBy ?? null,
      sortDir: params.sortDir ?? null
    }),
    queryFn: () => fetchDiscoverMentors(params),
    placeholderData: keepPreviousData
  })
}

export function useDiscoverMentorsQuery(params: GetMentorsQueryParams) {
  return useQuery(getDiscoverMentorsQueryOptions(params))
}
