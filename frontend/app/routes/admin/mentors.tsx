import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { GraduationCap, CheckCircle2, XCircle, Search, Filter, Info, ExternalLink, Star, Users } from 'lucide-react'

export function meta() {
  return [{ title: 'Mentor | Admin' }]
}

export default function AdminMentorsPage() {
  const pendingMentors = [
    { id: 1, name: 'Nguyễn Văn Nam', expertise: 'Senior Frontend', doc: 'CV_Nam.pdf', date: '2h ago' },
    { id: 2, name: 'Trần Thị Thu', expertise: 'UI/UX Design', doc: 'Portfolio.pdf', date: '5h ago' }
  ]

  const activeMentors = [
    { id: 3, name: 'Alex Johanson', expertise: 'ReactJS', rating: 4.9, students: 45, status: 'Active' },
    { id: 4, name: 'Sarah Chen', expertise: 'NodeJS', rating: 5.0, students: 28, status: 'Active' }
  ]

  return (
    <DashboardPage description='Duyệt hồ sơ mentor mới, quản lý trạng thái và theo dõi hiệu suất giảng dạy trên toàn nền tảng.' title='Quản lý Mentor'>
      <div className="space-y-12">
        {/* Pending Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm"><Info size={20} /></div>
             <div>
                <h2 className="text-xl font-bold text-ink">Đang chờ phê duyệt ({pendingMentors.length})</h2>
                <p className="text-xs text-muted">Hồ sơ mới cần được kiểm tra thông tin và bằng cấp.</p>
             </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {pendingMentors.map((mentor, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={mentor.id} 
                className="p-6 rounded-3xl border border-amber-200/50 bg-amber-50/20 glass-panel shadow-sm flex flex-col sm:flex-row sm:items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-slate-300 uppercase transition-transform group-hover:scale-105">{mentor.name.charAt(0)}</div>
                <div className="flex-1">
                   <p className="font-bold text-ink text-lg">{mentor.name}</p>
                   <p className="text-sm text-amber-700/70 font-medium mb-3">{mentor.expertise}</p>
                   <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"><ExternalLink size={14} /> Xem hồ sơ: {mentor.doc}</button>
                </div>
                <div className="flex gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-amber-100">
                   <button className="flex-1 sm:flex-none p-3.5 rounded-2xl bg-emerald-600 text-white shadow-lift hover:bg-emerald-700 hover:-translate-y-0.5 transition-all" title="Phê duyệt"><CheckCircle2 size={20} /></button>
                   <button className="flex-1 sm:flex-none p-3.5 rounded-2xl bg-white border border-red-200 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-sm" title="Từ chối"><XCircle size={20} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Active Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-t border-slate-100 pt-8">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm"><GraduationCap size={22} /></div>
                <div>
                   <h2 className="text-xl font-bold text-ink">Mentor đã kích hoạt</h2>
                   <p className="text-xs text-muted">Danh sách các mentor đang hoạt động bình thường.</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="text" placeholder="Tìm kiếm mentor..." className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-2xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all focus:w-64" />
                </div>
                <button className="p-2.5 border border-slate-200 rounded-2xl bg-white hover:bg-slate-50 transition-colors shadow-sm"><Filter size={20} /></button>
             </div>
          </div>

          <div className="rounded-3xl bg-slate-100/50 p-1">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {activeMentors.map((mentor, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={mentor.id} 
                    className="p-8 bg-white flex flex-col items-center text-center hover:bg-slate-50/80 transition-all group cursor-pointer first:rounded-tl-[22px] last:rounded-br-[22px]"
                  >
                     <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center font-extrabold text-white text-xl shadow-lg transition-transform group-hover:scale-110 ${i % 2 === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                        {mentor.name.substring(0, 1)}
                     </div>
                     <p className="font-bold text-ink text-base">{mentor.name}</p>
                     <p className="text-xs text-muted font-medium mb-4">{mentor.expertise}</p>
                     
                     <div className="grid grid-cols-2 gap-4 w-full border-y border-slate-50 py-4 mb-6">
                        <div className="flex flex-col items-center">
                           <div className="flex items-center gap-1 text-amber-500 mb-0.5"><Star size={12} className="fill-current" /><span className="text-xs font-bold">{mentor.rating}</span></div>
                           <p className="text-[10px] text-muted uppercase font-bold tracking-tighter">Đánh giá</p>
                        </div>
                        <div className="flex flex-col items-center">
                           <div className="flex items-center gap-1 text-primary mb-0.5"><Users size={12} /><span className="text-xs font-bold">{mentor.students}</span></div>
                           <p className="text-[10px] text-muted uppercase font-bold tracking-tighter">Học viên</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 w-full mt-auto">
                        <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-[11px] font-bold text-muted hover:text-primary hover:border-primary transition-all active:scale-95">Hồ sơ</button>
                        <button className="flex-1 py-2.5 rounded-xl bg-slate-900 shadow-sm text-white text-[11px] font-bold hover:shadow-lg transition-all active:scale-95">Quản lý</button>
                     </div>
                  </motion.div>
                ))}
                
                {/* Empty spot to invite/add */}
                <div className="p-8 border-2 border-dashed border-slate-200/60 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-primary/40 transition-colors cursor-pointer min-h-[300px]">
                   <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-all"><GraduationCap size={24} /></div>
                   <p className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">Thêm Mentor thủ công</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}

