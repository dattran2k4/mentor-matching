import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export function meta() {
  return [{ title: 'Lịch dạy | Mentor' }]
}

export default function MentorSchedulePage() {
  const currentWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

  return (
    <DashboardPage description='Thiết lập khung giờ rảnh và quản lý lịch dạy.' title='Lịch dạy'>
      <div className='grid gap-6 lg:grid-cols-[1fr_300px]'>
        {/* Main Calendar View */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='glass-panel flex flex-col rounded-3xl border border-slate-200/60 bg-white/70 p-8'
        >
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-ink text-xl font-bold'>Tháng 5, 2026</h2>
            <div className='flex items-center gap-2'>
              <button className='rounded-lg border border-slate-200 p-2 transition-colors hover:bg-slate-50'>
                <ChevronLeft size={20} />
              </button>
              <button className='rounded-lg border border-slate-200 p-2 transition-colors hover:bg-slate-50'>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className='mb-4 grid grid-cols-7 gap-4 text-center'>
            {currentWeek.map((day) => (
              <div key={day} className='text-muted text-sm font-semibold uppercase'>
                {day}
              </div>
            ))}
          </div>

          <div className='grid flex-1 grid-cols-7 gap-4'>
            {Array.from({ length: 31 }).map((_, i) => {
              const isToday = i === 14
              const hasEvent = [4, 11, 14, 18, 25].includes(i)
              return (
                <div
                  key={i}
                  className={`group relative min-h-24 cursor-pointer rounded-2xl border p-2 transition-colors ${isToday ? 'border-primary bg-primary/5' : 'hover:border-primary/30 border-slate-100 bg-white'}`}
                >
                  <span
                    className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-slate-700'}`}
                  >
                    {i + 1}
                  </span>
                  {hasEvent && (
                    <div className='bg-primary absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-transform group-hover:scale-150'></div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Sidebar / Upcoming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='glass-panel rounded-3xl border border-slate-200/60 bg-white/70 p-6'
        >
          <div className='mb-6 flex items-center justify-between'>
            <h3 className='text-ink text-lg font-bold'>Sắp diễn ra</h3>
            <button className='text-primary bg-primary/10 hover:bg-primary rounded-xl p-2 transition-colors hover:text-white'>
              <CalendarIcon size={18} />
            </button>
          </div>

          <div className='space-y-4'>
            {[
              { time: '14:00 - 15:00', title: 'React Performance', student: 'Nguyễn Văn A' },
              { time: '16:30 - 17:30', title: 'System Design Mock', student: 'Trần B' }
            ].map((session, i) => (
              <div
                key={i}
                className='group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='bg-primary absolute top-0 bottom-0 left-0 w-1 transition-all group-hover:w-1.5'></div>
                <p className='text-primary mb-2 flex items-center gap-1 text-xs font-semibold'>
                  <Clock size={12} /> {session.time}
                </p>
                <p className='text-ink mb-1 text-sm leading-tight font-bold'>{session.title}</p>
                <p className='text-muted text-xs'>Học viên: {session.student}</p>

                <div className='mt-4 flex gap-2'>
                  <button className='bg-primary flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-xs font-bold text-white hover:opacity-90'>
                    <Video size={14} /> Vào lớp
                  </button>
                  <button className='text-muted border-line flex w-8 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50'>
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardPage>
  )
}
