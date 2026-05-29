import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Search, Filter, Mail, ShieldAlert, Edit, Trash2, MoreHorizontal } from 'lucide-react'

export function meta() {
  return [{ title: 'Người dùng | Admin' }]
}

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'anv@example.com',
      role: 'Learner',
      status: 'Active',
      joined: '12/05/2026'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'btt@example.com',
      role: 'Mentor',
      status: 'Active',
      joined: '10/05/2026'
    },
    {
      id: 3,
      name: 'Lê Minh C',
      email: 'clm@example.com',
      role: 'Learner',
      status: 'Banned',
      joined: '01/05/2026'
    },
    {
      id: 4,
      name: 'Phạm Văn D',
      email: 'dpv@example.com',
      role: 'Learner',
      status: 'Active',
      joined: '28/04/2026'
    }
  ]

  return (
    <DashboardPage
      description='Quản lý tài khoản người dùng, phân quyền và trạng thái hoạt động trên nền tảng.'
      title='Quản lý người dùng'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='relative max-w-md flex-1'>
            <Search size={18} className='text-muted absolute top-1/2 left-4 -translate-y-1/2' />
            <input
              type='text'
              placeholder='Tìm người dùng (Tên, email)...'
              className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm shadow-sm transition-all outline-none focus:ring-2'
            />
          </div>
          <div className='flex items-center gap-3'>
            <button className='text-muted hover:text-ink flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold transition-all hover:border-slate-300'>
              <Filter size={16} /> Lọc
            </button>
            <button className='bg-primary shadow-soft hover:shadow-glow rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95'>
              + Thêm mới
            </button>
          </div>
        </div>

        <div className='glass-panel shadow-soft overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70'>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[800px] border-collapse text-left'>
              <thead>
                <tr className='border-b border-slate-100 bg-slate-50/50'>
                  <th className='text-muted px-6 py-4 text-xs font-bold tracking-wider uppercase'>
                    Người dùng
                  </th>
                  <th className='text-muted px-6 py-4 text-xs font-bold tracking-wider uppercase'>
                    Vai trò
                  </th>
                  <th className='text-muted px-6 py-4 text-xs font-bold tracking-wider uppercase'>
                    Ngày tham gia
                  </th>
                  <th className='text-muted px-6 py-4 text-xs font-bold tracking-wider uppercase'>
                    Trạng thái
                  </th>
                  <th className='text-muted px-6 py-4 text-right text-xs font-bold tracking-wider uppercase'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={user.id}
                    className='group border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-500 shadow-sm'>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className='text-ink text-sm font-bold'>{user.name}</p>
                          <p className='text-muted flex items-center gap-1 text-xs'>
                            <Mail size={10} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold ${user.role === 'Mentor' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='text-muted px-6 py-4 text-sm'>{user.joined}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-red-500'}`}
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}
                        />
                        {user.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
                        <button
                          className='hover:text-primary hover:bg-primary/5 rounded-lg p-2 text-slate-400 transition-all'
                          title='Chỉnh sửa'
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className='rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500'
                          title='Cảnh báo'
                        >
                          <ShieldAlert size={16} />
                        </button>
                        <button
                          className='rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600'
                          title='Xóa'
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className='hover:text-ink rounded-lg p-2 text-slate-400 transition-all hover:bg-slate-100'>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30 p-4 sm:flex-row'>
            <p className='text-muted text-xs font-medium'>
              Đang hiển thị {users.length} trên tổng số 1,248 kết quả
            </p>
            <div className='flex gap-2'>
              <button className='text-muted hover:text-ink rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold transition-all hover:bg-white'>
                Trang trước
              </button>
              <button className='text-ink rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-sm'>
                1
              </button>
              <button className='text-muted hover:text-ink rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold transition-all hover:bg-white'>
                2
              </button>
              <button className='text-muted hover:text-ink rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold transition-all hover:bg-white'>
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}
