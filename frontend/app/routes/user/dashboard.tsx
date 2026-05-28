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
    { label: 'Buổi học sắp tới', value: '2', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Mentor đã học', value: '5', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Giờ học tháng này', value: '12h', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' }
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
            className='rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel card-hover group' 
            key={stat.label}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className='text-sm font-medium text-muted uppercase tracking-wider'>{stat.label}</p>
                <p className='mt-2 text-3xl font-bold text-ink'>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]'>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">Buổi học sắp tới</h2>
            <Link to={path.user.bookings} className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
              Xem tất cả <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
             {[1, 2].map(i => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-3xl border border-slate-100 bg-white/50 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
                    <PlayCircle size={32} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Cơ bản - {i === 1 ? 'ReactJS' : 'NodeJS'}</p>
                    <p className="font-bold text-ink text-lg leading-tight">Xây dựng ứng dụng {i === 1 ? 'E-commerce' : 'Realtime Chat'}</p>
                    <p className="text-sm text-muted mt-1">Mentor: {i === 1 ? 'Alex Johanson' : 'Sarah Chen'}</p>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <p className="font-bold text-ink">14:00 - 15:30</p>
                    <p className="text-xs text-muted">Thứ Năm, 28 Th5</p>
                    <button className="mt-2 w-full sm:w-auto bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:shadow-lg transition-shadow">Vào học</button>
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-ink">Phần thưởng & Tiến độ</h2>
          <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white relative overflow-hidden shadow-xl">
             <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
             <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Level 4: Explorer</p>
             <h3 className="mt-2 text-2xl font-bold">850 XP</h3>
             <div className="mt-6 h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="h-full bg-white"
                ></motion.div>
             </div>
             <p className="mt-3 text-xs opacity-80">Cần thêm 150 XP để đạt Level 5</p>
             
             <div className="mt-8 grid grid-cols-3 gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Star size={20} className={i < 3 ? "text-amber-300 fill-amber-300" : "text-white/30"} />
                  </div>
                ))}
             </div>
          </div>

          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 glass-panel">
            <h3 className="font-bold text-ink mb-4">Hành động nhanh</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to={path.discover} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 hover:text-primary transition-all text-center group">
                 <div className="p-2 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform"><BookOpen size={20} /></div>
                 <span className="text-xs font-bold">Tìm Mentor</span>
              </Link>
              <Link to={path.user.messages} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 hover:text-primary transition-all text-center group">
                 <div className="p-2 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform"><Clock size={20} /></div>
                 <span className="text-xs font-bold">Tin nhắn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
