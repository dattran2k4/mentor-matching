import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Cài đặt | Admin' }]
}

export default function AdminSettingsPage() {
  return <DashboardPage description='Cấu hình hệ thống và chính sách nền tảng.' title='Cài đặt hệ thống' />
}
