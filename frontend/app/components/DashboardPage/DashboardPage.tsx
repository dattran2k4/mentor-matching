import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { EmptyState } from '@/components/EmptyState'

type DashboardPageProps = {
  title: string
  description?: string
  children?: ReactNode
}

export function DashboardPage({ title, description, children }: DashboardPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='relative space-y-8'
    >
      <div className='relative z-10 flex flex-col gap-2 pl-2'>
        <h1 className='text-ink text-3xl font-bold tracking-tight drop-shadow-sm md:text-4xl'>
          {title}
        </h1>
        {description && <p className='text-muted max-w-2xl text-base'>{description}</p>}
      </div>

      <div className='relative z-10'>
        {children ?? (
          <EmptyState
            className='glass-panel min-h-[300px] border-solid border-slate-200/60 bg-white/60'
            description='Tính năng này đang trong quá trình hoàn thiện. Khi có dữ liệu hoặc workflow sẵn sàng, nội dung sẽ hiển thị tại đây.'
            icon={<Sparkles aria-hidden='true' size={28} />}
            title='Đang phát triển'
          />
        )}
      </div>
    </motion.div>
  )
}
