export const path = {
  home: '/',
  forbidden: '/forbidden',
  login: '/login',

  discover: '/discover',
  mentorProfile: (id: string) => `/mentor-profile/${id}`,

  user: {
    root: '/user',
    bookings: '/user/bookings',
    favorites: '/user/favorites',
    messages: '/user/messages',
    profile: '/user/profile'
  },

  mentorPanel: {
    root: '/mentor',
    schedule: '/mentor/schedule',
    students: '/mentor/students',
    earnings: '/mentor/earnings',
    profile: '/mentor/profile'
  },

  admin: {
    root: '/admin',
    users: '/admin/users',
    mentors: '/admin/mentors',
    reports: '/admin/reports',
    settings: '/admin/settings'
  }
} as const
