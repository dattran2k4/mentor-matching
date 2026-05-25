import { Link } from 'react-router'

import { path } from '@/config/path'
import { useDashboardPath } from '@/hooks/use-dashboard-path'

export default function ForbiddenPage() {
  const dashboardPath = useDashboardPath()

  return (
    <main className='mx-auto max-w-md p-6'>
      <h1 className='mb-2 text-2xl font-semibold'>403 - Không có quyền truy cập</h1>
      <p className='mb-6 text-sm text-gray-600'>Bạn không có quyền truy cập trang này.</p>
      <div className='flex flex-wrap gap-3 text-sm'>
        <Link className='font-medium text-primary hover:underline' to='/'>
          Trang chủ
        </Link>
        <Link className='font-medium text-primary hover:underline' to={path.discover}>
          Khám phá
        </Link>
        <Link className='font-medium text-primary hover:underline' to={path.login}>
          Đăng nhập
        </Link>
        {dashboardPath ? (
          <Link className='font-medium text-primary hover:underline' to={dashboardPath}>
            Bảng điều khiển
          </Link>
        ) : null}
      </div>
    </main>
  )
}
