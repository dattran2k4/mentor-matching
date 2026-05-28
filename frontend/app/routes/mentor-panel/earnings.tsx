import { DashboardPage } from '@/components/DashboardPage'
import { motion } from 'framer-motion'
import { Wallet, ArrowDownRight, ArrowUpRight, Copy } from 'lucide-react'

export function meta() {
  return [{ title: 'Thu nhập | Mentor' }]
}

export default function MentorEarningsPage() {
  return (
    <DashboardPage description='Theo dõi doanh thu và lịch sử thanh toán.' title='Thu nhập'>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-primary to-primary-dark p-8 glass-panel text-white relative overflow-hidden shadow-lift shadow-primary/30"
        >
          <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-8">
            <Wallet size={24} className="text-white/80" />
            <h2 className="text-lg font-medium opacity-90">Số dư hiện tại</h2>
          </div>
          <div>
            <p className="text-5xl font-bold tracking-tight">12.500.000 ₫</p>
            <p className="mt-2 text-sm text-blue-100 flex items-center gap-1">
              <ArrowUpRight size={16} /> Tăng 24% so với tháng trước
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-shadow active:scale-95">Rút tiền</button>
            <button className="bg-primary-light/20 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-light/40 transition-colors active:scale-95">Lịch sử</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-slate-200/60 bg-white/70 p-6 glass-panel flex flex-col justify-between"
        >
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Dự kiến nhận (Tới)</h3>
            <p className="text-3xl font-bold text-ink">4.200.000 ₫</p>
            <p className="text-xs text-muted mb-2 mt-1">Sẽ thanh toán vào ngày 15/06/2026</p>
          </div>
          
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
            <p className="text-xs text-muted flex items-center justify-between mb-1">
              ID Ví <Copy size={12} className="cursor-pointer hover:text-primary" />
            </p>
            <p className="text-sm font-semibold font-mono text-ink">**** 8392</p>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-slate-200/60 bg-white/70 p-8 glass-panel"
      >
        <h3 className="text-xl font-bold text-ink mb-6">Giao dịch gần đây</h3>
        <div className="space-y-4">
          {[
            { id: 'TRX-001', type: 'Nhận từ dạy kèm', amount: '+ 800.000 ₫', status: 'Thành công', date: '28/05/2026', isPos: true },
            { id: 'TRX-002', type: 'Rút tiền', amount: '- 5.000.000 ₫', status: 'Đang xử lý', date: '25/05/2026', isPos: false },
            { id: 'TRX-003', type: 'Phí nền tảng (5%)', amount: '- 40.000 ₫', status: 'Thành công', date: '24/05/2026', isPos: false },
          ].map((tx, i) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.isPos ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                   {tx.isPos ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{tx.type}</p>
                  <p className="text-xs text-muted">{tx.date} • {tx.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.isPos ? 'text-emerald-600' : 'text-red-500'}`}>{tx.amount}</p>
                <p className="text-xs text-muted">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardPage>
  )
}
