import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Lịch học | Học viên' }]
}

export default function UserBookingsPage() {
  return <DashboardPage description='Quản lý buổi học đã đặt và lịch sắp tới.' title='Lịch học' />
}
