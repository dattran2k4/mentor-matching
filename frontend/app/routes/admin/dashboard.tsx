import { Link } from 'react-router'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Admin' }]
}

export default function AdminDashboardPage() {
  return (
    <DashboardPage description='Giám sát hoạt động nền tảng và số liệu tổng hợp.' title='Tổng quan admin'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          { label: 'Người dùng', value: '1,240' },
          { label: 'Mentor', value: '186' },
          { label: 'Buổi học/tháng', value: '3,420' },
          { label: 'Báo cáo chờ', value: '7' }
        ].map((stat) => (
          <div className='rounded-2xl border border-line bg-white p-5 shadow-soft' key={stat.label}>
            <p className='text-sm text-muted'>{stat.label}</p>
            <p className='mt-2 text-2xl font-semibold'>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-3'>
        <Link
          className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'
          to={path.admin.users}
        >
          Quản lý người dùng
        </Link>
        <Link
          className='rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink'
          to={path.admin.mentors}
        >
          Quản lý mentor
        </Link>
      </div>
    </DashboardPage>
  )
}
