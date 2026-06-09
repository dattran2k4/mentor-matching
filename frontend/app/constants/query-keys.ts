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
    featured: (params: { page: number; size: number; sortBy: string; sortDir: string }) =>
      ['mentor', 'featured', params] as const
  },
  location: {
    cities: (search: string) => ['location', 'cities', search] as const
  }
} as const
