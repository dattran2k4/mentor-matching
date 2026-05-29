import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Hồ sơ | Học viên' }]
}

export default function UserProfilePage() {
  return (
    <DashboardPage
      description='Cập nhật thông tin cá nhân và mục tiêu học tập.'
      title='Hồ sơ học viên'
    />
  )
}
