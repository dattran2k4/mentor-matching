import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Báo cáo | Admin' }]
}

export default function AdminReportsPage() {
  return <DashboardPage description='Xử lý báo cáo vi phạm và khiếu nại.' title='Báo cáo' />
}
