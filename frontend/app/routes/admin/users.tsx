import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Search, Filter, Mail, ShieldAlert, Edit, Trash2, MoreHorizontal } from 'lucide-react'

export function meta() {
  return [{ title: 'Người dùng | Admin' }]
}

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'anv@example.com', role: 'Learner', status: 'Active', joined: '12/05/2026' },
    { id: 2, name: 'Trần Thị B', email: 'btt@example.com', role: 'Mentor', status: 'Active', joined: '10/05/2026' },
    { id: 3, name: 'Lê Minh C', email: 'clm@example.com', role: 'Learner', status: 'Banned', joined: '01/05/2026' },
    { id: 4, name: 'Phạm Văn D', email: 'dpv@example.com', role: 'Learner', status: 'Active', joined: '28/04/2026' }
  ]

  return (
    <DashboardPage description='Quản lý tài khoản người dùng, phân quyền và trạng thái hoạt động trên nền tảng.' title='Quản lý người dùng'>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input type="text" placeholder="Tìm người dùng (Tên, email)..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 shadow-sm outline-none transition-all" />
           </div>
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-semibold text-muted hover:text-ink hover:border-slate-300 transition-all"><Filter size={16} /> Lọc</button>
              <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-soft hover:shadow-glow transition-all active:scale-95">+ Thêm mới</button>
           </div>
        </div>

        <div className="rounded-3xl border border-slate-200/60 bg-white/70 glass-panel overflow-hidden shadow-soft">
           <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Người dùng</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Vai trò</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Ngày tham gia</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Hành động</th>
                 </tr>
              </thead>
              <tbody>
                 {users.map((user, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={user.id} 
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group"
                    >
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 shadow-sm">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-ink">{user.name}</p>
                                <p className="text-xs text-muted flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${user.role === 'Mentor' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                             {user.role}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-sm text-muted">{user.joined}</td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-red-500'}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                             {user.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all" title="Chỉnh sửa"><Edit size={16} /></button>
                             <button className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Cảnh báo"><ShieldAlert size={16} /></button>
                             <button className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" title="Xóa"><Trash2 size={16} /></button>
                             <button className="p-2 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100 transition-all"><MoreHorizontal size={16} /></button>
                          </div>
                       </td>
                    </motion.tr>
                 ))}
              </tbody>
           </table>
           </div>
           <div className="p-4 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted font-medium">Đang hiển thị {users.length} trên tổng số 1,248 kết quả</p>
              <div className="flex gap-2">
                 <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-muted hover:bg-white hover:text-ink transition-all">Trang trước</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-ink shadow-sm">1</button>
                 <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-muted hover:bg-white hover:text-ink transition-all">2</button>
                 <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-muted hover:bg-white hover:text-ink transition-all">Trang sau</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardPage>
  )
}

