import { DashboardPage } from '@/components/DashboardPage'

export function meta() {
  return [{ title: 'Người dùng | Admin' }]
}

export default function AdminUsersPage() {
  return <DashboardPage description='Quản lý tài khoản học viên trên hệ thống.' title='Quản lý người dùng' />
}
