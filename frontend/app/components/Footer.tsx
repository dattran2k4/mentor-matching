import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { path } from '@/config/path'
import { cn } from '@/utils/cn'

const Footer = () => {
  return (
    <footer className='mt-16 border-t border-slate-200 bg-slate-50'>
      <div className='page-container grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]'>
        <div>
          <Link className='text-primary text-lg font-semibold' to={path.home}>
            Mentor Matching
          </Link>
          <p className='text-muted mt-3 text-sm'>
            Kết nối học viên và phụ huynh với mentor đã được duyệt cho từng môn học, lớp và mục tiêu
            học tập.
          </p>
          <div className='mt-4 flex flex-wrap gap-2 text-xs'>
            <Badge variant='outline'>Mentor đã duyệt</Badge>
            <Badge variant='outline'>Đặt buổi học theo khung giờ thật</Badge>
          </div>
        </div>
        <div>
          <p className='text-ink text-sm font-semibold'>Khám phá</p>
          <ul className='text-muted mt-3 space-y-2 text-sm'>
            <li>
              <Link className='hover:text-primary transition' to={path.discover}>
                Tìm mentor
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary transition' to={path.home}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary transition' to={path.mentorPanel.root}>
                Khu vực Mentor
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-ink text-sm font-semibold'>Tài khoản</p>
          <ul className='text-muted mt-3 space-y-2 text-sm'>
            <li>
              <Link className='hover:text-primary transition' to={path.login}>
                Đăng nhập
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary transition' to={path.user.root}>
                Học viên
              </Link>
            </li>
            <li>
              <Link className='hover:text-primary transition' to={path.admin.root}>
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-ink text-sm font-semibold'>Bắt đầu</p>
          <p className='text-muted mt-3 text-sm'>
            Bắt đầu với nhu cầu học cụ thể, chọn mentor theo môn học, cấp lớp, học phí và hình thức
            học phù hợp rồi gửi yêu cầu đặt buổi đầu tiên.
          </p>
          <div className='mt-4 space-y-3'>
            <Link
              className={cn(buttonVariants({ className: 'block rounded-2xl text-center' }))}
              to={path.discover}
            >
              Tìm mentor ngay
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  className: 'block rounded-2xl text-center',
                  variant: 'outline'
                })
              )}
              to={path.login}
            >
              Đăng nhập để quản lý lịch học
            </Link>
          </div>
        </div>
      </div>
      <div className='text-muted border-t border-slate-200 py-6 text-center text-xs'>
        2026 Mentor Matching. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
