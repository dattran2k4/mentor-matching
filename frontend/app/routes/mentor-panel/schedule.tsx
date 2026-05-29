import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, Video, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

export function meta() {
  return [{ title: 'Lịch dạy | Mentor' }]
}

export default function MentorSchedulePage() {
  const currentWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  
  return (
    <DashboardPage description='Thiết lập khung giờ rảnh và quản lý lịch dạy.' title='Lịch dạy'>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main Calendar View */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ink">Tháng 5, 2026</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4 text-center mb-4">
            {currentWeek.map(day => (
              <div key={day} className="text-sm font-semibold text-muted uppercase">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-4 flex-1">
            {Array.from({ length: 31 }).map((_, i) => {
              const isToday = i === 14;
              const hasEvent = [4, 11, 14, 18, 25].includes(i);
              return (
                <div 
                  key={i} 
                  className={`relative min-h-24 p-2 rounded-2xl border transition-colors cursor-pointer group ${isToday ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-primary/30'}`}
                >
                  <span className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-slate-700'}`}>{i + 1}</span>
                  {hasEvent && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform"></div>
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
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel"
        >
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-ink">Sắp diễn ra</h3>
             <button className="text-primary bg-primary/10 p-2 rounded-xl hover:bg-primary hover:text-white transition-colors">
               <CalendarIcon size={18} />
             </button>
          </div>
          
          <div className="space-y-4">
             {[
               { time: '14:00 - 15:00', title: 'React Performance', student: 'Nguyễn Văn A' },
               { time: '16:30 - 17:30', title: 'System Design Mock', student: 'Trần B' }
             ].map((session, i) => (
               <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary group-hover:w-1.5 transition-all"></div>
                 <p className="text-xs font-semibold text-primary flex items-center gap-1 mb-2">
                   <Clock size={12} /> {session.time}
                 </p>
                 <p className="font-bold text-ink text-sm leading-tight mb-1">{session.title}</p>
                 <p className="text-xs text-muted">Học viên: {session.student}</p>
                 
                 <div className="mt-4 flex gap-2">
                   <button className="flex-1 flex items-center justify-center gap-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:opacity-90">
                     <Video size={14} /> Vào lớp
                   </button>
                   <button className="w-8 flex justify-center items-center rounded-lg border border-slate-200 text-muted hover:bg-slate-50 border-line">
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
