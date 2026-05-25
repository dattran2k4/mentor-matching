import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Mentor | Admin' }]
}

export default function AdminMentorsPage() {
  return (
    <DashboardPage description='Duyệt hồ sơ mentor và quản lý trạng thái hoạt động.' title='Quản lý mentor' />
  )
}
