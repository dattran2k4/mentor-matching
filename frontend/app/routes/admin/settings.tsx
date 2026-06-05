import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'

export function meta() {
  return [{ title: 'Cài đặt | Admin' }]
}

export default function AdminSettingsPage() {
  return (
    <DashboardPage
      description='Cấu hình hệ thống và chính sách nền tảng.'
      title='Cài đặt hệ thống'
    >
      <EmptyState
        description='Các nhóm cấu hình vận hành sẽ được hiển thị khi backend hỗ trợ rõ ràng. Hiện tại màn hình giữ vai trò định hướng thay vì giả lập cấu hình hoàn chỉnh.'
        title='Tính năng cài đặt đang được hoàn thiện'
      />
    </DashboardPage>
  )
}
