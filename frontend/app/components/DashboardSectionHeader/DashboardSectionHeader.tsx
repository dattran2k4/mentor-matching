import type { ReactNode } from 'react'

type DashboardSectionHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function DashboardSectionHeader({
  action,
  description,
  title
}: DashboardSectionHeaderProps) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
      <div className='space-y-1'>
        <h2 className='text-ink text-lg font-semibold'>{title}</h2>
        {description ? <p className='text-muted text-sm'>{description}</p> : null}
      </div>
      {action ? <div className='shrink-0'>{action}</div> : null}
    </div>
  )
}
