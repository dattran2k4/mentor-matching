import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Users, Calendar, Star, ArrowUpRight } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Mentor' }]
}

export default function MentorDashboardPage() {
  const stats = [
    { label: 'Buổi dạy tuần này', value: '8', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Học viên active', value: '14', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Đánh giá trung bình', value: '4.9', icon: Star, color: 'text-amber-500', bg: 'bg-amber-100' }
  ]

  return (
    <DashboardPage
      description='Theo dõi lịch dạy, học viên mới và đánh giá gần đây một cách tổng quan nhất.'
      title='Tổng quan'
    >
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className='rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel card-hover group' 
            key={stat.label}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className='text-sm font-medium text-muted uppercase tracking-wider'>{stat.label}</p>
                <p className='mt-2 text-4xl font-bold tracking-tight text-ink'>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> Thêm 12% so với tháng trước
            </div>
          </motion.div>
        ))}
      </div>

      <div className='mt-10 grid gap-6 lg:grid-cols-2'>
        <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel">
          <h2 className="text-xl font-bold text-ink mb-6">Phiên dạy sắp tới</h2>
          <div className="space-y-4">
             {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                    S{i}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Sinh viên Nguyễn Văn {['A', 'B', 'C'][i-1]}</p>
                    <p className="text-sm text-muted">ReactJS Component Design</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">14:00</p>
                    <p className="text-xs text-muted">Hôm nay</p>
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-primary to-primary-dark p-8 glass-panel text-white relative overflow-hidden shadow-lift shadow-primary/30">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl font-bold"></div>
            <h2 className="text-lg font-medium opacity-90">Hành động nhanh</h2>
            <div className='mt-6 flex flex-wrap gap-4'>
              <Link
                className='flex items-center gap-2 rounded-xl bg-white text-primary px-5 py-3 text-sm font-semibold transition-transform hover:scale-105 hover:shadow-lg'
                to={path.mentorPanel.schedule}
              >
                <Calendar size={18} /> Quản lý lịch
              </Link>
              <Link
                className='flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
                to={path.mentorPanel.profile}
              >
                Chỉnh sửa hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
