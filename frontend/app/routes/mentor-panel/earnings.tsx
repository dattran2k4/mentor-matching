import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Wallet, ArrowDownRight, ArrowUpRight, Copy } from 'lucide-react'

export function meta() {
  return [{ title: 'Thu nhập | Mentor' }]
}

export default function MentorEarningsPage() {
  return (
    <DashboardPage description='Theo dõi doanh thu và lịch sử thanh toán.' title='Thu nhập'>
      <div className='mb-8 grid gap-6 md:grid-cols-3'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='from-primary to-primary-dark glass-panel shadow-lift shadow-primary/30 relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br p-8 text-white md:col-span-2'
        >
          <div className='pointer-events-none absolute top-[-20%] right-[-10%] h-64 w-64 rounded-full bg-white/10 blur-3xl'></div>
          <div className='mb-8 flex items-center gap-3'>
            <Wallet size={24} className='text-white/80' />
            <h2 className='text-lg font-medium opacity-90'>Số dư hiện tại</h2>
          </div>
          <div>
            <p className='text-5xl font-bold tracking-tight'>12.500.000 ₫</p>
            <p className='mt-2 flex items-center gap-1 text-sm text-blue-100'>
              <ArrowUpRight size={16} /> Tăng 24% so với tháng trước
            </p>
          </div>
          <div className='mt-8 flex gap-4'>
            <button className='text-primary rounded-xl bg-white px-6 py-2.5 text-sm font-bold transition-shadow hover:shadow-lg active:scale-95'>
              Rút tiền
            </button>
            <button className='bg-primary-light/20 hover:bg-primary-light/40 rounded-xl border border-white/20 px-6 py-2.5 text-sm font-bold text-white transition-colors active:scale-95'>
              Lịch sử
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='glass-panel flex flex-col justify-between rounded-3xl border border-slate-200/60 bg-white/70 p-6'
        >
          <div>
            <h3 className='text-muted mb-4 text-sm font-semibold tracking-wider uppercase'>
              Dự kiến nhận (Tới)
            </h3>
            <p className='text-ink text-3xl font-bold'>4.200.000 ₫</p>
            <p className='text-muted mt-1 mb-2 text-xs'>Sẽ thanh toán vào ngày 15/06/2026</p>
          </div>

          <div className='rounded-2xl border border-slate-100 bg-slate-50 p-4'>
            <p className='text-muted mb-1 flex items-center justify-between text-xs'>
              ID Ví <Copy size={12} className='hover:text-primary cursor-pointer' />
            </p>
            <p className='text-ink font-mono text-sm font-semibold'>**** 8392</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='glass-panel rounded-3xl border border-slate-200/60 bg-white/70 p-8'
      >
        <h3 className='text-ink mb-6 text-xl font-bold'>Giao dịch gần đây</h3>
        <div className='space-y-4'>
          {[
            {
              id: 'TRX-001',
              type: 'Nhận từ dạy kèm',
              amount: '+ 800.000 ₫',
              status: 'Thành công',
              date: '28/05/2026',
              isPos: true
            },
            {
              id: 'TRX-002',
              type: 'Rút tiền',
              amount: '- 5.000.000 ₫',
              status: 'Đang xử lý',
              date: '25/05/2026',
              isPos: false
            },
            {
              id: 'TRX-003',
              type: 'Phí nền tảng (5%)',
              amount: '- 40.000 ₫',
              status: 'Thành công',
              date: '24/05/2026',
              isPos: false
            }
          ].map((tx) => (
            <div
              key={tx.id}
              className='hover:border-primary/20 flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition-colors'
            >
              <div className='flex items-center gap-4'>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tx.isPos ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                >
                  {tx.isPos ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className='text-ink text-sm font-semibold'>{tx.type}</p>
                  <p className='text-muted text-xs'>
                    {tx.date} • {tx.id}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className={`font-bold ${tx.isPos ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.amount}
                </p>
                <p className='text-muted text-xs'>{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardPage>
  )
}
