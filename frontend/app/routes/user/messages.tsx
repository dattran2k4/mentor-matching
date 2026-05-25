import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Tin nhắn | Học viên' }]
}

export default function UserMessagesPage() {
  return <DashboardPage description='Trao đổi với mentor trước và sau buổi học.' title='Tin nhắn' />
}
