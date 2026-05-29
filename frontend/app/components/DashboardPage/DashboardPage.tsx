import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

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
          <div className='glass-panel flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-slate-200/60 bg-white/60 p-12 text-center'>
            <div className='bg-primary/10 text-primary mb-5 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110'>
              <Sparkles size={28} />
            </div>
            <p className='text-ink text-lg font-medium'>Đang phát triển</p>
            <p className='text-muted mt-2 max-w-sm text-sm'>
              Tính năng này đang trong quá trình hoàn thiện. Bạn vui lòng quay lại sau nhé.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
