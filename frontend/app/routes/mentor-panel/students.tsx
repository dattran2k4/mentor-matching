import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Học viên | Mentor' }]
}

export default function MentorStudentsPage() {
  return <DashboardPage description='Danh sách học viên đang theo học với bạn.' title='Học viên' />
}
