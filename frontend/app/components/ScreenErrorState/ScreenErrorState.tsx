import { AlertTriangle } from 'lucide-react'

import { EmptyState } from '@/components/EmptyState'

type ScreenErrorStateProps = {
  title?: string
  description?: string
  retryLabel?: string
  onRetry?: () => void
}

export function ScreenErrorState({
  description = 'Không thể tải dữ liệu màn hình lúc này. Vui lòng thử lại để tiếp tục.',
  onRetry,
  retryLabel = 'Thử lại',
  title = 'Đã có lỗi xảy ra'
}: ScreenErrorStateProps) {
  return (
    <EmptyState
      className='border-red-100 bg-red-50/40'
      description={description}
      icon={<AlertTriangle aria-hidden='true' size={26} />}
      title={title}
      action={
        onRetry ? (
          <button
            className='rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700'
            onClick={onRetry}
            type='button'
          >
            {retryLabel}
          </button>
        ) : null
      }
    />
  )
}
