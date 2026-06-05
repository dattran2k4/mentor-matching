import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { BookOpen } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  action,
  actionHref,
  actionLabel,
  className,
  description,
  icon,
  title
}: EmptyStateProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/75 p-10 text-center',
          className
        )
      )}
    >
      <div className='bg-primary/10 text-primary mb-5 flex h-14 w-14 items-center justify-center rounded-2xl'>
        {icon ?? <BookOpen aria-hidden='true' size={26} />}
      </div>
      <h2 className='text-ink text-lg font-semibold'>{title}</h2>
      <p className='text-muted mt-2 max-w-md text-sm leading-relaxed'>{description}</p>
      {action ? <div className='mt-6'>{action}</div> : null}
      {actionHref && actionLabel ? (
        <Link
          className='bg-primary shadow-soft mt-6 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5'
          to={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}
