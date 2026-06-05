import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, XCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { BookingStatus, PaymentStatus } from '@/types/booking'
import type { MentorApprovalStatus, MentorVerificationStatus } from '@/types/mentor'
import type { UserStatus } from '@/types/user'

type StatusBadgeKind = 'booking' | 'payment' | 'approval' | 'verification' | 'user'
type StatusBadgeValue =
  | BookingStatus
  | PaymentStatus
  | MentorApprovalStatus
  | MentorVerificationStatus
  | UserStatus
  | 'ACTIVE'
  | 'BANNED'
  | 'INACTIVE'

type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'muted'

type StatusBadgeProps = {
  kind: StatusBadgeKind
  status: StatusBadgeValue
  className?: string
}

const toneClassMap: Record<StatusTone, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-blue-200 bg-blue-50 text-blue-700',
  muted: 'border-slate-200 bg-slate-50 text-slate-600'
}

const statusConfigMap: Record<
  StatusBadgeKind,
  Partial<Record<StatusBadgeValue, { label: string; tone: StatusTone; icon: typeof CheckCircle2 }>>
> = {
  booking: {
    PENDING: { label: 'Chờ xác nhận', tone: 'warning', icon: Clock },
    CONFIRMED: { label: 'Đã đặt lịch', tone: 'info', icon: CheckCircle2 },
    COMPLETED: { label: 'Hoàn thành', tone: 'success', icon: CheckCircle2 },
    CANCELLED: { label: 'Đã hủy', tone: 'muted', icon: XCircle },
    REJECTED: { label: 'Bị từ chối', tone: 'danger', icon: XCircle },
    NO_SHOW: { label: 'Không tham gia', tone: 'danger', icon: AlertTriangle }
  },
  payment: {
    PENDING: { label: 'Chờ thanh toán', tone: 'warning', icon: Clock },
    PAID: { label: 'Đã thanh toán', tone: 'success', icon: CheckCircle2 },
    FAILED: { label: 'Thanh toán lỗi', tone: 'danger', icon: AlertTriangle },
    CANCELLED: { label: 'Đã hủy', tone: 'muted', icon: XCircle },
    REFUNDED: { label: 'Đã hoàn tiền', tone: 'info', icon: CheckCircle2 }
  },
  approval: {
    PENDING: { label: 'Chờ duyệt', tone: 'warning', icon: Clock },
    APPROVED: { label: 'Đã duyệt', tone: 'success', icon: CheckCircle2 },
    REJECTED: { label: 'Từ chối', tone: 'danger', icon: XCircle },
    SUSPENDED: { label: 'Tạm dừng', tone: 'danger', icon: ShieldAlert }
  },
  verification: {
    UNVERIFIED: { label: 'Chưa xác minh', tone: 'muted', icon: ShieldAlert },
    PENDING: { label: 'Đang xác minh', tone: 'warning', icon: Clock },
    VERIFIED: { label: 'Đã xác minh', tone: 'success', icon: CheckCircle2 },
    REJECTED: { label: 'Xác minh lỗi', tone: 'danger', icon: XCircle }
  },
  user: {
    ACTIVE: { label: 'Đang hoạt động', tone: 'success', icon: CheckCircle2 },
    INACTIVE: { label: 'Không hoạt động', tone: 'muted', icon: Clock },
    BANNED: { label: 'Đã khóa', tone: 'danger', icon: ShieldAlert }
  }
}

export function StatusBadge({ className, kind, status }: StatusBadgeProps) {
  const config = statusConfigMap[kind][status] ?? {
    label: String(status),
    tone: 'muted' as StatusTone,
    icon: Clock
  }
  const Icon = config.icon

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
          toneClassMap[config.tone],
          className
        )
      )}
    >
      <Icon aria-hidden='true' size={13} />
      {config.label}
    </span>
  )
}
