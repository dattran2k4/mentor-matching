import { Link } from 'react-router'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Mentor' }]
}

export default function MentorDashboardPage() {
  return (
    <DashboardPage
      description='Theo dõi lịch dạy, học viên mới và đánh giá gần đây.'
      title='Tổng quan mentor'
    >
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[
          { label: 'Buổi dạy tuần này', value: '8' },
          { label: 'Học viên active', value: '14' },
          { label: 'Đánh giá trung bình', value: '4.9' }
        ].map((stat) => (
          <div className='rounded-2xl border border-line bg-white p-5 shadow-soft' key={stat.label}>
            <p className='text-sm text-muted'>{stat.label}</p>
            <p className='mt-2 text-2xl font-semibold'>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap gap-3'>
        <Link
          className='rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white'
          to={path.mentorPanel.schedule}
        >
          Quản lý lịch dạy
        </Link>
        <Link
          className='rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink'
          to={path.mentorPanel.profile}
        >
          Chỉnh sửa hồ sơ
        </Link>
      </div>
    </DashboardPage>
  )
}
