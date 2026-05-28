import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MoreVertical, Search, Filter } from 'lucide-react'

export function meta() {
  return [{ title: 'Lịch học | Học viên' }]
}

export default function UserBookingsPage() {
  const bookings = [
    { id: 1, mentor: 'Alex Johanson', subject: 'ReactJS Performance', time: '14:00 - 15:30', date: 'Thứ Năm, 28 Th5', status: 'Sắp diễn ra', active: true },
    { id: 2, mentor: 'Sarah Chen', subject: 'NodeJS Backend Architecture', time: '10:00 - 11:00', date: 'Thứ Sáu, 29 Th5', status: 'Sắp diễn ra', active: false },
    { id: 3, mentor: 'John Smith', subject: 'UI/UX Design Concept', time: '09:00 - 10:30', date: 'Thứ Hai, 25 Th5', status: 'Hoàn thành', active: false }
  ]

  return (
    <DashboardPage description='Quản lý buổi học đã đặt và lịch học trong tương lai.' title='Lịch học'>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
              {['Tất cả', 'Sắp tới', 'Đã xong', 'Đã hủy'].map((tab, i) => (
                <button key={tab} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${i === 1 ? 'bg-white text-primary shadow-sm' : 'text-muted hover:text-ink'}`}>
                  {tab}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" placeholder="Tìm mentor..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all focus:w-64" />
              </div>
              <button className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50"><Filter size={18} /></button>
           </div>
        </div>

        <div className="grid gap-4">
          {bookings.map((booking, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={booking.id} 
              className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-3xl border border-slate-200/60 bg-white/80 glass-panel hover:border-primary/40 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${booking.active ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                <Calendar size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-ink truncate">{booking.subject}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-muted">Mentor: <span className="font-semibold text-ink">{booking.mentor}</span></p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
                   <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {booking.time}</span>
                   <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {booking.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                {booking.active ? (
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5">
                    <Video size={18} /> Vào học ngay
                  </button>
                ) : (
                  <button className="flex-1 md:flex-none rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-ink hover:bg-slate-50 transition-colors">
                    Chi tiết
                  </button>
                )}
                <button className="p-3 rounded-xl border border-slate-200 text-muted hover:bg-slate-50 hover:text-ink transition-colors">
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
