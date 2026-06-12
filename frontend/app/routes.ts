import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  // Public marketing site
  layout('layouts/MainLayout.tsx', [
    index('routes/HomeFesba.tsx'),
    route('discover', 'routes/Discover.tsx'),
    route('mentor-profile/:id', 'routes/MentorProfile.tsx')
  ]),

  // User dashboard — /user/*
  route('user', 'routes/user-role-layout.tsx', [
    layout('layouts/user-layout.tsx', [
      index('routes/user/dashboard.tsx'),
      route('bookings', 'routes/user/bookings.tsx'),
      route('favorites', 'routes/user/favorites.tsx'),
      route('messages', 'routes/user/messages.tsx'),
      route('profile', 'routes/user/profile.tsx')
    ])
  ]),

  // Mentor dashboard — /mentor/*
  route('mentor', 'routes/mentor-role-layout.tsx', [
    layout('layouts/mentor-layout.tsx', [
      index('routes/mentor-panel/dashboard.tsx'),
      route('schedule', 'routes/mentor-panel/schedule.tsx'),
      route('students', 'routes/mentor-panel/students.tsx'),
      route('earnings', 'routes/mentor-panel/earnings.tsx'),
      route('profile', 'routes/mentor-panel/profile.tsx')
    ])
  ]),

  // Admin dashboard — /admin/*
  route('admin', 'routes/admin-role-layout.tsx', [
    layout('layouts/admin-layout.tsx', [
      index('routes/admin/dashboard.tsx'),
      route('users', 'routes/admin/users.tsx'),
      route('mentors', 'routes/admin/mentors.tsx'),
      route('reports', 'routes/admin/reports.tsx'),
      route('settings', 'routes/admin/settings.tsx')
    ])
  ]),

  // Auth & template routes
  layout('routes/guest-layout.tsx', [route('login', 'routes/login.tsx')]),
  route('forbidden', 'routes/forbidden.tsx'),
  layout('routes/protected-layout.tsx', [route('old-home', 'routes/home.tsx')])
] satisfies RouteConfig
