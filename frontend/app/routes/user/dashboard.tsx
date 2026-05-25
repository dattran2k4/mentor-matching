import { Link } from 'react-router'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Học viên' }]
}

export default function UserDashboardPage() {
  return (
    <DashboardPage
      description='Theo dõi buổi học sắp tới, mentor yêu thích và tiến độ học tập.'
      title='Tổng quan học viên'
    >
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[
          { label: 'Buổi học sắp tới', value: '2' },
          { label: 'Mentor đã học', value: '5' },
          { label: 'Giờ học tháng này', value: '12h' }
        ].map((stat) => (
          <div className='rounded-2xl border border-line bg-white p-5 shadow-soft' key={stat.label}>
            <p className='text-sm text-muted'>{stat.label}</p>
            <p className='mt-2 text-2xl font-semibold'>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-3'>
        <Link
          className='rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white'
          to={path.discover}
        >
          Tìm mentor mới
        </Link>
        <Link
          className='rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink'
          to={path.user.bookings}
        >
          Xem lịch học
        </Link>
      </div>
    </DashboardPage>
  )
}
