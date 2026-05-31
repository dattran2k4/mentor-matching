import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Info,
  ExternalLink,
  Star,
  Users
} from 'lucide-react'

export function meta() {
  return [{ title: 'Mentor | Admin' }]
}

export default function AdminMentorsPage() {
  const pendingMentors = [
    {
      id: 1,
      name: 'Nguyễn Văn Nam',
      expertise: 'Senior Frontend',
      doc: 'CV_Nam.pdf',
      date: '2h ago'
    },
    { id: 2, name: 'Trần Thị Thu', expertise: 'UI/UX Design', doc: 'Portfolio.pdf', date: '5h ago' }
  ]

  const activeMentors = [
    {
      id: 3,
      name: 'Alex Johanson',
      expertise: 'ReactJS',
      rating: 4.9,
      students: 45,
      status: 'Active'
    },
    { id: 4, name: 'Sarah Chen', expertise: 'NodeJS', rating: 5.0, students: 28, status: 'Active' }
  ]

  return (
    <DashboardPage
      description='Duyệt hồ sơ mentor mới, quản lý trạng thái và theo dõi hiệu suất giảng dạy trên toàn nền tảng.'
      title='Quản lý Mentor'
    >
      <div className='space-y-12'>
        {/* Pending Section */}
        <section>
          <div className='mb-6 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-sm'>
              <Info size={20} />
            </div>
            <div>
              <h2 className='text-ink text-xl font-bold'>
                Đang chờ phê duyệt ({pendingMentors.length})
              </h2>
              <p className='text-muted text-xs'>
                Hồ sơ mới cần được kiểm tra thông tin và bằng cấp.
              </p>
            </div>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            {pendingMentors.map((mentor, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={mentor.id}
                className='glass-panel group flex flex-col gap-6 rounded-3xl border border-amber-200/50 bg-amber-50/20 p-6 shadow-sm sm:flex-row sm:items-center'
              >
                <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-300 uppercase shadow-sm transition-transform group-hover:scale-105'>
                  {mentor.name.charAt(0)}
                </div>
                <div className='flex-1'>
                  <p className='text-ink text-lg font-bold'>{mentor.name}</p>
                  <p className='mb-3 text-sm font-medium text-amber-700/70'>{mentor.expertise}</p>
                  <button className='text-primary hover:text-primary-dark flex items-center gap-1.5 text-xs font-bold transition-colors'>
                    <ExternalLink size={14} /> Xem hồ sơ: {mentor.doc}
                  </button>
                </div>
                <div className='flex gap-2 border-t border-amber-100 pt-4 sm:border-t-0 sm:pt-0'>
                  <button
                    className='shadow-lift flex-1 rounded-2xl bg-emerald-600 p-3.5 text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700 sm:flex-none'
                    title='Phê duyệt'
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button
                    className='flex-1 rounded-2xl border border-red-200 bg-white p-3.5 text-red-500 shadow-sm transition-all hover:bg-red-600 hover:text-white sm:flex-none'
                    title='Từ chối'
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Active Section */}
        <section>
          <div className='mb-8 flex flex-col justify-between gap-6 border-t border-slate-100 pt-8 md:flex-row md:items-center'>
            <div className='flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm'>
                <GraduationCap size={22} />
              </div>
              <div>
                <h2 className='text-ink text-xl font-bold'>Mentor đã kích hoạt</h2>
                <p className='text-muted text-xs'>
                  Danh sách các mentor đang hoạt động bình thường.
                </p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <Search size={16} className='text-muted absolute top-1/2 left-3 -translate-y-1/2' />
                <input
                  type='text'
                  placeholder='Tìm kiếm mentor...'
                  className='focus:ring-primary/20 w-48 rounded-2xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm transition-all focus:w-64 focus:ring-2 focus:outline-none'
                />
              </div>
              <button className='rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition-colors hover:bg-slate-50'>
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className='rounded-3xl bg-slate-100/50 p-1'>
            <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4'>
              {activeMentors.map((mentor, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={mentor.id}
                  className='group flex cursor-pointer flex-col items-center bg-white p-8 text-center transition-all first:rounded-tl-[22px] last:rounded-br-[22px] hover:bg-slate-50/80'
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-lg transition-transform group-hover:scale-110 ${i % 2 === 0 ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}
                  >
                    {mentor.name.substring(0, 1)}
                  </div>
                  <p className='text-ink text-base font-bold'>{mentor.name}</p>
                  <p className='text-muted mb-4 text-xs font-medium'>{mentor.expertise}</p>

                  <div className='mb-6 grid w-full grid-cols-2 gap-4 border-y border-slate-50 py-4'>
                    <div className='flex flex-col items-center'>
                      <div className='mb-0.5 flex items-center gap-1 text-amber-500'>
                        <Star size={12} className='fill-current' />
                        <span className='text-xs font-bold'>{mentor.rating}</span>
                      </div>
                      <p className='text-muted text-[10px] font-bold tracking-tighter uppercase'>
                        Đánh giá
                      </p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <div className='text-primary mb-0.5 flex items-center gap-1'>
                        <Users size={12} />
                        <span className='text-xs font-bold'>{mentor.students}</span>
                      </div>
                      <p className='text-muted text-[10px] font-bold tracking-tighter uppercase'>
                        Học viên
                      </p>
                    </div>
                  </div>

                  <div className='mt-auto flex w-full items-center gap-2'>
                    <button className='text-muted hover:text-primary hover:border-primary flex-1 rounded-xl border border-slate-200 py-2.5 text-[11px] font-bold transition-all active:scale-95'>
                      Hồ sơ
                    </button>
                    <button className='flex-1 rounded-xl bg-slate-900 py-2.5 text-[11px] font-bold text-white shadow-sm transition-all hover:shadow-lg active:scale-95'>
                      Quản lý
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Empty spot to invite/add */}
              <div className='group hover:border-primary/40 flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200/60 p-8 text-center transition-colors'>
                <div className='group-hover:bg-primary/10 group-hover:text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300 transition-all'>
                  <GraduationCap size={24} />
                </div>
                <p className='group-hover:text-primary text-sm font-bold text-slate-400 transition-colors'>
                  Thêm Mentor thủ công
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
