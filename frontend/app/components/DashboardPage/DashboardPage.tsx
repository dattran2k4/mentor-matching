import type { ReactNode } from 'react'

type DashboardPageProps = {
  title: string
  description?: string
  children?: ReactNode
}

export function DashboardPage({ title, description, children }: DashboardPageProps) {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold md:text-3xl'>{title}</h1>
        {description && <p className='mt-2 max-w-2xl text-sm text-muted md:text-base'>{description}</p>}
      </div>

      {children ?? (
        <div className='rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-muted'>
          Nội dung trang sẽ được bổ sung sau.
        </div>
      )}
    </div>
  )
}
