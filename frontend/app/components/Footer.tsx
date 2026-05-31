import { Link } from 'react-router'
import { path } from '@/config/path'

const Footer = () => {
  return (
    <footer className='mt-16 bg-slate-100'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6'>
        <div>
          <Link className='text-primary text-lg font-semibold' to='/'>
            EduMarket
          </Link>
          <p className='text-muted mt-3 text-sm'>
            Connecting learners with trusted mentors across the world for personalized education.
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
          <p className='text-ink text-sm font-semibold'>Newsletter</p>
          <p className='text-muted mt-3 text-sm'>Get updates on new mentors and upcoming events.</p>
          <div className='mt-4 flex items-center gap-2'>
            <input
              className='w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none'
              placeholder='Email address'
              type='email'
            />
            <button
              className='bg-primary rounded-full px-4 py-2 text-sm font-semibold text-white'
              type='button'
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div className='text-muted border-t border-slate-200 py-6 text-center text-xs'>
        2026 EduMarket. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
