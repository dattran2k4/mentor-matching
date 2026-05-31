import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MoreVertical, Search, Filter } from 'lucide-react'

export function meta() {
  return [{ title: 'Lịch học | Học viên' }]
}

export default function UserBookingsPage() {
  const bookings = [
    {
      id: 1,
      mentor: 'Alex Johanson',
      subject: 'ReactJS Performance',
      time: '14:00 - 15:30',
      date: 'Thứ Năm, 28 Th5',
      status: 'Sắp diễn ra',
      active: true
    },
    {
      id: 2,
      mentor: 'Sarah Chen',
      subject: 'NodeJS Backend Architecture',
      time: '10:00 - 11:00',
      date: 'Thứ Sáu, 29 Th5',
      status: 'Sắp diễn ra',
      active: false
    },
    {
      id: 3,
      mentor: 'John Smith',
      subject: 'UI/UX Design Concept',
      time: '09:00 - 10:30',
      date: 'Thứ Hai, 25 Th5',
      status: 'Hoàn thành',
      active: false
    }
  ]

  return (
    <DashboardPage
      description='Quản lý buổi học đã đặt và lịch học trong tương lai.'
      title='Lịch học'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex w-fit items-center gap-2 rounded-2xl bg-slate-100 p-1'>
            {['Tất cả', 'Sắp tới', 'Đã xong', 'Đã hủy'].map((tab, i) => (
              <button
                key={tab}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${i === 1 ? 'text-primary bg-white shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <Search size={16} className='text-muted absolute top-1/2 left-3 -translate-y-1/2' />
              <input
                type='text'
                placeholder='Tìm mentor...'
                className='focus:ring-primary/20 w-48 rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm transition-all focus:w-64 focus:ring-2 focus:outline-none'
              />
            </div>
            <button className='rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-50'>
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className='grid gap-4'>
          {bookings.map((booking, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={booking.id}
              className='glass-panel hover:border-primary/40 group flex flex-col gap-6 rounded-3xl border border-slate-200/60 bg-white/80 p-6 transition-all md:flex-row md:items-center'
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${booking.active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}
              >
                <Calendar size={24} />
              </div>

              <div className='min-w-0 flex-1'>
                <div className='mb-1 flex items-center gap-2'>
                  <h3 className='text-ink truncate text-lg font-bold'>{booking.subject}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${booking.status === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className='text-muted text-sm'>
                  Mentor: <span className='text-ink font-semibold'>{booking.mentor}</span>
                </p>
                <div className='text-muted mt-3 flex flex-wrap items-center gap-4 text-xs font-medium'>
                  <span className='flex items-center gap-1.5'>
                    <Clock size={14} className='text-primary' /> {booking.time}
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <Calendar size={14} className='text-primary' /> {booking.date}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0'>
                {booking.active ? (
                  <button className='bg-primary shadow-soft hover:shadow-glow flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 md:flex-none'>
                    <Video size={18} /> Vào học ngay
                  </button>
                ) : (
                  <button className='text-ink flex-1 rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold transition-colors hover:bg-slate-50 md:flex-none'>
                    Chi tiết
                  </button>
                )}
                <button className='text-muted hover:text-ink rounded-xl border border-slate-200 p-3 transition-colors hover:bg-slate-50'>
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardPage>
  )
}
