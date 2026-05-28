import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Heart, Search, Star, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { mentors } from '../../constants/mentors'

export function meta() {
  return [{ title: 'Yêu thích | Học viên' }]
}

export default function UserFavoritesPage() {
  // Use first 3 mentors as featured favorites
  const favoriteMentors = mentors.slice(0, 3)

  return (
    <DashboardPage description='Quản lý danh sách các mentor bạn đã lưu để theo dõi.' title='Mentor yêu thích'>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input type="text" placeholder="Tìm trong danh sách yêu thích..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm" />
           </div>
           <p className="text-sm font-medium text-muted">Đang hiển thị {favoriteMentors.length} mentor</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteMentors.map((mentor, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={mentor.id} 
              className="group relative rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel card-hover"
            >
              <button className="absolute right-4 top-4 p-2 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white shadow-sm z-10">
                <Trash2 size={16} />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mentor.accent} mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                  {mentor.initials}
                </div>
                <h3 className="text-lg font-bold text-ink">{mentor.name}</h3>
                <p className="text-sm text-muted mb-3">{mentor.role}</p>
                <div className="flex items-center gap-1 mb-6">
                   <Star size={14} className="fill-amber-400 text-amber-400" />
                   <span className="text-sm font-bold text-ink">{mentor.rating}</span>
                   <span className="text-xs text-muted">({mentor.reviewsCount})</span>
                </div>
                
                <div className="w-full grid grid-cols-2 gap-2">
                   <Link to={`/mentor/${mentor.id}`} className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-ink hover:bg-slate-50 transition-colors">Hồ sơ</Link>
                   <Link to={`/mentor/${mentor.id}`} className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-soft hover:shadow-glow transition-all">Đặt lịch</Link>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 group hover:border-primary/40 transition-colors cursor-pointer"
          >
             <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-slate-400 group-hover:text-primary transition-colors">
               <Heart size={24} />
             </div>
             <p className="text-sm font-bold text-ink hover:text-primary transition-colors flex items-center gap-1">Khám phá thêm <ArrowRight size={14} /></p>
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  )
}
