export const QUERY_KEYS = {
  auth: {
    me: ['auth', 'me'] as const
  },
  user: {
    learnerProfile: ['user', 'learner-profile'] as const
  },
  catalog: {
    options: ['catalog', 'options'] as const
  },
  mentor: {
    currentProfile: ['mentor', 'current-profile'] as const,
    currentSchedule: ['mentor', 'current-schedule'] as const,
    detail: (mentorId: number) => ['mentor', 'detail', mentorId] as const,
    list: (params: {
      page: number
      size: number
      search: string | null
      gender: string | null
      meetingType: string | null
      cityId: number | null
      districtId: number | null
      subjectId: number | null
      gradeId: number | null
      sortBy: string | null
      sortDir: string | null
    }) => ['mentor', 'list', params] as const,
    featured: (params: { page: number; size: number; sortBy: string; sortDir: string }) =>
      ['mentor', 'featured', params] as const
  },
  booking: {
    me: ['booking', 'me'] as const,
    my: (params: {
      page: number
      size: number
      status: string | null
      meetingType: string | null
    }) => ['booking', 'me', params] as const,
    mentorMe: ['booking', 'mentor-me'] as const
  },
  location: {
    cities: (search: string) => ['location', 'cities', search] as const,
    districts: (cityId: number, search: string) =>
      ['location', 'districts', cityId, search] as const
  }
} as const
