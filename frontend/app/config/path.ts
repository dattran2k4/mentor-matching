export const path = {
  forbidden: '/forbidden',
  login: '/login',

  discover: '/discover',

  user: {
    root: '/user',
    bookings: '/user/bookings',
    favorites: '/user/favorites',
    messages: '/user/messages',
    profile: '/user/profile'
  },

  mentorPanel: {
    root: '/mentor-panel',
    schedule: '/mentor-panel/schedule',
    students: '/mentor-panel/students',
    earnings: '/mentor-panel/earnings',
    profile: '/mentor-panel/profile'
  },

  admin: {
    root: '/admin',
    users: '/admin/users',
    mentors: '/admin/mentors',
    reports: '/admin/reports',
    settings: '/admin/settings'
  }
} as const
