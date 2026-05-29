import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, Clock, Star, ArrowRight, PlayCircle } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Học viên' }]
}

export default function UserDashboardPage() {
  const stats = [
    {
      label: 'Buổi học sắp tới',
      value: '2',
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      label: 'Mentor đã học',
      value: '5',
      icon: BookOpen,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      label: 'Giờ học tháng này',
      value: '12h',
      icon: Clock,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ]

  return (
    <DashboardPage
      description='Theo dõi buổi học sắp tới, mentor yêu thích và tiến độ học tập của bạn.'
      title='Tổng quan'
    >
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className='glass-panel card-hover group rounded-3xl border border-slate-200/60 bg-white/70 p-6'
            key={stat.label}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-muted text-sm font-medium tracking-wider uppercase'>
                  {stat.label}
                </p>
                <p className='text-ink mt-2 text-3xl font-bold'>{stat.value}</p>
              </div>
              <div
                className={`rounded-2xl p-3 ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
              >
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]'>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-ink text-xl font-bold'>Buổi học sắp tới</h2>
            <Link
              to={path.user.bookings}
              className='text-primary flex items-center gap-1 text-sm font-semibold hover:underline'
            >
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>

          <div className='space-y-4'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='hover:border-primary/30 group flex cursor-pointer flex-col gap-4 rounded-3xl border border-slate-100 bg-white/50 p-5 transition-all sm:flex-row sm:items-center'
              >
                <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200'>
                  <PlayCircle
                    size={32}
                    className='group-hover:text-primary text-slate-400 transition-colors'
                  />
                </div>
                <div className='flex-1'>
                  <p className='text-primary mb-1 text-xs font-bold tracking-wider uppercase'>
                    Cơ bản - {i === 1 ? 'ReactJS' : 'NodeJS'}
                  </p>
                  <p className='text-ink text-lg leading-tight font-bold'>
                    Xây dựng ứng dụng {i === 1 ? 'E-commerce' : 'Realtime Chat'}
                  </p>
                  <p className='text-muted mt-1 text-sm'>
                    Mentor: {i === 1 ? 'Alex Johanson' : 'Sarah Chen'}
                  </p>
                </div>
                <div className='border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 sm:text-right'>
                  <p className='text-ink font-bold'>14:00 - 15:30</p>
                  <p className='text-muted text-xs'>Thứ Năm, 28 Th5</p>
                  <button className='bg-primary mt-2 w-full rounded-xl px-4 py-2 text-xs font-bold text-white transition-shadow hover:shadow-lg sm:w-auto'>
                    Vào học
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <h2 className='text-ink text-xl font-bold'>Phần thưởng & Tiến độ</h2>
          <div className='relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-xl'>
            <div className='absolute top-[-10%] right-[-10%] h-32 w-32 rounded-full bg-white/10 blur-2xl'></div>
            <p className='text-sm font-medium tracking-widest uppercase opacity-80'>
              Level 4: Explorer
            </p>
            <h3 className='mt-2 text-2xl font-bold'>850 XP</h3>
            <div className='mt-6 h-2 w-full overflow-hidden rounded-full bg-white/20'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className='h-full bg-white'
              ></motion.div>
            </div>
            <p className='mt-3 text-xs opacity-80'>Cần thêm 150 XP để đạt Level 5</p>

            <div className='mt-8 grid grid-cols-3 gap-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='flex aspect-square items-center justify-center rounded-xl border border-white/20 bg-white/10'
                >
                  <Star
                    size={20}
                    className={i < 3 ? 'fill-amber-300 text-amber-300' : 'text-white/30'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='glass-panel rounded-3xl border border-slate-200/60 bg-white p-6'>
            <h3 className='text-ink mb-4 font-bold'>Hành động nhanh</h3>
            <div className='grid grid-cols-2 gap-3'>
              <Link
                to={path.discover}
                className='hover:bg-primary/5 hover:text-primary group flex flex-col items-center gap-2 rounded-2xl bg-slate-50 p-4 text-center transition-all'
              >
                <div className='rounded-xl bg-white p-2 shadow-sm transition-transform group-hover:scale-110'>
                  <BookOpen size={20} />
                </div>
                <span className='text-xs font-bold'>Tìm Mentor</span>
              </Link>
              <Link
                to={path.user.messages}
                className='hover:bg-primary/5 hover:text-primary group flex flex-col items-center gap-2 rounded-2xl bg-slate-50 p-4 text-center transition-all'
              >
                <div className='rounded-xl bg-white p-2 shadow-sm transition-transform group-hover:scale-110'>
                  <Clock size={20} />
                </div>
                <span className='text-xs font-bold'>Tin nhắn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
