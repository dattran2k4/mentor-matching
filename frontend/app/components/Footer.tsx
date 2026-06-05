import { Link } from 'react-router'
import { path } from '@/config/path'

const Footer = () => {
  return (
    <footer className='mt-16 bg-slate-100'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6'>
        <div>
          <Link className='text-primary text-lg font-semibold' to='/'>
            Mentor Matching
          </Link>
          <p className='text-muted mt-3 text-sm'>
            Kết nối học viên và phụ huynh với mentor đã được duyệt cho từng môn học, lớp và mục
            tiêu học tập.
          </p>
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
              <Link className='hover:text-primary transition' to='/'>
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
          <p className='text-ink text-sm font-semibold'>Cập nhật</p>
          <p className='text-muted mt-3 text-sm'>
            Nhận thông tin về mentor mới, môn học nổi bật và gợi ý đặt lịch.
          </p>
          <div className='mt-4 flex items-center gap-2'>
            <input
              className='w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none'
              placeholder='Email của bạn'
              type='email'
            />
            <button
              className='bg-primary rounded-full px-4 py-2 text-sm font-semibold text-white'
              type='button'
            >
              Nhận tin
            </button>
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
