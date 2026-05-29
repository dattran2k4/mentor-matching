import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Users, GraduationCap, DollarSign, AlertCircle, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { path } from '@/config/path'

export function meta() {
  return [{ title: 'Tổng quan | Admin' }]
}

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Tổng người dùng', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Mentor hoạt động', value: '312', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Doanh thu tháng', value: '45.2M', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Yêu cầu chờ duyệt', value: '18', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' }
  ]

  return (
    <DashboardPage
      description='Quản lý hệ thống, theo dõi tăng trưởng và xử lý các yêu cầu phê duyệt.'
      title='Bảng điều khiển Admin'
    >
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className='rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel card-hover group' 
            key={stat.label}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-600">
                +12% <ArrowUpRight size={14} />
              </div>
            </div>
            <p className='text-sm font-medium text-muted'>{stat.label}</p>
            <p className='mt-1 text-2xl font-bold text-ink'>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className='mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]'>
        <div className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ink">Yêu cầu duyệt Mentor mới</h2>
            <Link to={path.admin.mentors} className="text-sm font-semibold text-primary hover:underline">Xem tất cả</Link>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Nguyễn Văn Nam', skill: 'Senior Frontend Dev', date: '2 giờ trước' },
              { name: 'Trần Thị Thu', skill: 'UI/UX Designer', date: '5 giờ trước' },
              { name: 'Lê Minh Hoàng', skill: 'Data Scientist', date: 'Hôm qua' }
            ].map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {req.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-ink text-sm">{req.name}</p>
                    <p className="text-xs text-muted">{req.skill}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted mr-2">{req.date}</span>
                  <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors">
                    <CheckCircle2 size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-slate-50 text-muted hover:bg-slate-200 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
           <div className="rounded-3xl border border-slate-200/60 bg-white p-8 glass-panel shadow-soft">
              <h2 className="text-xl font-bold text-ink mb-6">Trạng thái hệ thống</h2>
              <div className="space-y-4">
                 {[
                   { label: 'Server API', status: 'Online', color: 'bg-emerald-500' },
                   { label: 'Database', status: 'Online', color: 'bg-emerald-500' },
                   { label: 'File Storage', status: '92% Full', color: 'bg-amber-500' }
                 ].map(sys => (
                   <div key={sys.label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm font-medium text-muted">{sys.label}</span>
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${sys.color}`}></span>
                         <span className="text-sm font-bold text-ink">{sys.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white relative overflow-hidden shadow-lift shadow-slate-900/30">
              <div className="absolute right-[-10%] bottom-[-10%] w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <h3 className="text-lg font-bold">Báo cáo mới nhất</h3>
              <p className="mt-2 text-sm opacity-70">Hệ thống ghi nhận 12 báo cáo mới từ người dùng trong hôm nay.</p>
              <Link to={path.admin.reports} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-ink px-6 py-3 text-xs font-bold hover:shadow-lg transition-all">
                Xem báo cáo ngay
              </Link>
           </div>
        </div>
      </div>
    </DashboardPage>
  )
}
