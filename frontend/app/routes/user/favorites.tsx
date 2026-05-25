import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Yêu thích | Học viên' }]
}

export default function UserFavoritesPage() {
  return <DashboardPage description='Danh sách mentor bạn đã lưu.' title='Mentor yêu thích' />
}
