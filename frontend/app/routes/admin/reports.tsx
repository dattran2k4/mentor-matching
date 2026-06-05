import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'

export function meta() {
  return [{ title: 'Báo cáo | Admin' }]
}

export default function AdminReportsPage() {
  return (
    <DashboardPage description='Xử lý báo cáo vi phạm và khiếu nại.' title='Báo cáo'>
      <EmptyState
        description='Khi có báo cáo hệ thống, khiếu nại từ học viên hoặc vấn đề liên quan đến buổi học, danh sách xử lý sẽ hiển thị tại đây.'
        title='Chưa có báo cáo nào'
      />
    </DashboardPage>
  )
}
