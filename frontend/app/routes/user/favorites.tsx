import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Heart, Search, Star, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { getInitials } from '@/utils/format'
import { mentors } from '../../constants/mentors'

export function meta() {
  return [{ title: 'Yêu thích | Học viên' }]
}

export default function UserFavoritesPage() {
  // Use first 3 mentors as featured favorites
  const favoriteMentors = mentors.slice(0, 3)

  return (
    <DashboardPage
      description='Quản lý danh sách các mentor bạn đã lưu để theo dõi.'
      title='Mentor yêu thích'
    >
      <div className='flex flex-col gap-8'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='relative max-w-md flex-1'>
            <Search size={18} className='text-muted absolute top-1/2 left-4 -translate-y-1/2' />
            <input
              type='text'
              placeholder='Tìm trong danh sách yêu thích...'
              className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm shadow-sm focus:ring-2 focus:outline-none'
            />
          </div>
          <p className='text-muted text-sm font-medium'>
            Đang hiển thị {favoriteMentors.length} mentor
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {favoriteMentors.map((mentor, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={mentor.id}
              className='group glass-panel card-hover relative rounded-3xl border border-slate-200/60 bg-white/70 p-6'
            >
              <button className='absolute top-4 right-4 z-10 rounded-full bg-red-50 p-2 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 hover:bg-red-500 hover:text-white'>
                <Trash2 size={16} />
              </button>

              <div className='flex flex-col items-center text-center'>
                <div
                  className='bg-primary/10 text-primary mb-4 flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold shadow-lg'
                >
                  {getInitials(mentor.name)}
                </div>
                <h3 className='text-ink text-lg font-bold'>{mentor.name}</h3>
                <p className='text-muted mb-3 text-sm'>{mentor.headline}</p>
                <div className='mb-6 flex items-center gap-1'>
                  <Star size={14} className='fill-amber-400 text-amber-400' />
                  <span className='text-ink text-sm font-bold'>{mentor.rating}</span>
                  <span className='text-muted text-xs'>({mentor.reviewsCount})</span>
                </div>

                <div className='grid w-full grid-cols-2 gap-2'>
                  <Link
                    to={`/mentor/${mentor.id}`}
                    className='text-ink rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-slate-50'
                  >
                    Hồ sơ
                  </Link>
                  <Link
                    to={`/mentor/${mentor.id}`}
                    className='bg-primary shadow-soft hover:shadow-glow rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all'
                  >
                    Đặt lịch
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='group hover:border-primary/40 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center transition-colors'
          >
            <div className='group-hover:text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-colors'>
              <Heart size={24} />
            </div>
            <p className='text-ink hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors'>
              Khám phá thêm <ArrowRight size={14} />
            </p>
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  )
}
