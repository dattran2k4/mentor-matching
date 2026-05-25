import { path } from '@/config/path'

export const TEST_PASSWORD = '123456'

export const testAccounts = [
  {
    label: 'Học viên',
    email: 'learner@test.com',
    password: TEST_PASSWORD,
    dashboard: path.user.root
  },
  {
    label: 'Mentor',
    email: 'mentor@test.com',
    password: TEST_PASSWORD,
    dashboard: path.mentorPanel.root
  },
  {
    label: 'Admin',
    email: 'admin@test.com',
    password: TEST_PASSWORD,
    dashboard: path.admin.root
  }
] as const
