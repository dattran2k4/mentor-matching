import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Thu nhập | Mentor' }]
}

export default function MentorEarningsPage() {
  return <DashboardPage description='Theo dõi doanh thu và lịch sử thanh toán.' title='Thu nhập' />
}
