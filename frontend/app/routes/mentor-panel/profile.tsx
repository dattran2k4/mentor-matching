import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Hồ sơ mentor | Mentor' }]
}

export default function MentorProfilePage() {
  return (
    <DashboardPage
      description='Chỉnh sửa giới thiệu, môn dạy và gói học phí.'
      title='Hồ sơ mentor'
    />
  )
}
