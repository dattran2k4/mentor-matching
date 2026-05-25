import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Lịch dạy | Mentor' }]
}

export default function MentorSchedulePage() {
  return <DashboardPage description='Thiết lập khung giờ rảnh và quản lý lịch dạy.' title='Lịch dạy' />
}
