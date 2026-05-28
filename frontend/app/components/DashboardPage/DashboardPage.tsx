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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className='space-y-8 relative'
    >
      <div className="flex flex-col gap-2 relative z-10 pl-2">
        <h1 className='text-3xl font-bold md:text-4xl tracking-tight text-ink drop-shadow-sm'>{title}</h1>
        {description && <p className='max-w-2xl text-base text-muted'>{description}</p>}
      </div>

      <div className="relative z-10">
      {children ?? (
        <div className='glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] border border-slate-200/60 bg-white/60'>
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
             <Sparkles size={28} />
          </div>
          <p className="text-lg font-medium text-ink">Đang phát triển</p>
          <p className="mt-2 text-sm text-muted max-w-sm">
            Tính năng này đang trong quá trình hoàn thiện. Bạn vui lòng quay lại sau nhé.
          </p>
        </div>
      )}
      </div>
    </motion.div>
  )
}
