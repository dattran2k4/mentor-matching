import { Link } from 'react-router'
import {
  ArrowRight,
  BookMarked,
  Calendar,
  CheckCircle2,
  Clock3,
  MessageSquare,
  UserRound
} from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceActionCard } from '@/components/WorkspaceActionCard'
import { WorkspaceMetricCard } from '@/components/WorkspaceMetricCard'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { path } from '@/config/path'
import { learnerBookings } from '@/mocks/learner-workspace'
import { cn } from '@/utils/cn'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

export function meta() {
  return [{ title: 'Tổng quan | Học viên' }]
}

const quickActions = [
  {
    title: 'Tìm mentor phù hợp',
    description: 'Khám phá thêm môn học, lớp và lịch phù hợp với mục tiêu hiện tại.',
    href: path.discover,
    icon: BookMarked
  },
  {
    title: 'Xem lịch học',
    description: 'Theo dõi các buổi đã đặt, thanh toán còn chờ và lịch sử học gần đây.',
    href: path.user.bookings,
    icon: Calendar
  },
  {
    title: 'Cập nhật hồ sơ',
    description: 'Bổ sung lớp học, trường và mục tiêu để mentor hiểu rõ nhu cầu của bạn.',
    href: path.user.profile,
    icon: UserRound
  }
] as const

export default function UserDashboardPage() {
  const upcomingBookings = learnerBookings.filter(
    (booking) => booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'PENDING'
  )
  const nextBooking = upcomingBookings[0]
  const recentBookings = learnerBookings.slice(0, 3)

  const summaryItems = [
    {
      label: 'Buổi học sắp tới',
      value: `${upcomingBookings.length}`,
      helper: upcomingBookings.length > 0 ? 'Đã có lịch trong tuần này' : 'Chưa có lịch mới',
      icon: Calendar
    },
    {
      label: 'Khoản cần thanh toán',
      value: `${learnerBookings.filter((booking) => booking.paymentStatus === 'PENDING').length}`,
      helper: 'Theo dõi để giữ chỗ với mentor',
      icon: Clock3
    },
    {
      label: 'Buổi đã hoàn thành',
      value: `${learnerBookings.filter((booking) => booking.bookingStatus === 'COMPLETED').length}`,
      helper: 'Sẵn sàng để lại đánh giá sau buổi học',
      icon: CheckCircle2
    }
  ] as const

  return (
    <DashboardPage
      description='Theo dõi buổi học sắp tới, việc cần làm và các đầu việc học tập quan trọng trong tuần.'
      title='Tổng quan'
    >
      <div className='grid gap-6 xl:grid-cols-[1.7fr_1fr]'>
        <WorkspacePanel
          title='Buổi học sắp tới'
          description='Ưu tiên xem buổi gần nhất để chuẩn bị trước tài liệu và thời gian vào lớp.'
          action={
            <Link
              className={cn(buttonVariants({ size: 'sm', variant: 'link' }), 'h-auto px-0')}
              to={path.user.bookings}
            >
              Xem tất cả
              <ArrowRight aria-hidden='true' size={14} />
            </Link>
          }
        >
          {nextBooking ? (
            <Card className='border-slate-200 bg-slate-50 shadow-none'>
              <CardContent className='flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between'>
                <div className='space-y-3'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <p className='text-ink text-lg font-semibold'>
                      {nextBooking.snapshot.subjectName} · {nextBooking.snapshot.gradeName}
                    </p>
                    <StatusBadge kind='booking' status={nextBooking.bookingStatus} />
                    {nextBooking.paymentStatus ? (
                      <StatusBadge kind='payment' status={nextBooking.paymentStatus} />
                    ) : null}
                  </div>
                  <p className='text-muted text-sm'>
                    Mentor{' '}
                    <span className='text-ink font-medium'>{nextBooking.snapshot.mentorName}</span>
                  </p>
                  <p className='text-muted text-sm'>{nextBooking.summary}</p>
                  <div className='grid gap-2 text-sm text-slate-700 sm:grid-cols-2'>
                    <p className='flex items-center gap-2'>
                      <Calendar aria-hidden='true' className='text-primary' size={15} />
                      {formatShortBookingDate(nextBooking.bookingDate)}
                    </p>
                    <p className='flex items-center gap-2'>
                      <Clock3 aria-hidden='true' className='text-primary' size={15} />
                      {formatTimeRange(nextBooking.startTime, nextBooking.endTime)}
                    </p>
                  </div>
                </div>

                <div className='flex min-w-[180px] flex-col gap-3'>
                  <Button>{nextBooking.primaryAction.label}</Button>
                  <Button variant='outline'>{nextBooking.secondaryAction.label}</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <EmptyState
              actionHref={path.discover}
              actionLabel='Tìm mentor'
              description='Bắt đầu từ trang khám phá để đặt buổi học đầu tiên và theo dõi lịch học ngay trên màn hình này.'
              title='Bạn chưa có buổi học sắp tới'
            />
          )}
        </WorkspacePanel>

        <WorkspacePanel
          title='Tóm tắt tuần này'
          description='Các chỉ dấu ngắn giúp bạn biết cần ưu tiên việc gì tiếp theo.'
        >
          <div className='grid gap-3'>
            {summaryItems.map((item) => (
              <WorkspaceMetricCard
                helper={item.helper}
                icon={item.icon}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </WorkspacePanel>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_1fr]'>
        <WorkspacePanel
          title='Gần đây'
          description='Xem nhanh các buổi vừa hoàn thành, đang chờ thanh toán hoặc cần theo dõi.'
        >
          <div className='space-y-4'>
            {recentBookings.map((booking) => (
              <Card className='rounded-2xl shadow-none' key={booking.id}>
                <CardContent className='flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between'>
                  <div className='space-y-2'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='text-ink font-semibold'>
                        {booking.snapshot.subjectName} · {booking.snapshot.gradeName}
                      </p>
                      <StatusBadge kind='booking' status={booking.bookingStatus} />
                    </div>
                    <p className='text-muted text-sm'>
                      {booking.snapshot.mentorName} · {formatShortBookingDate(booking.bookingDate)}{' '}
                      · {formatTimeRange(booking.startTime, booking.endTime)}
                    </p>
                    <p className='text-muted text-sm'>{booking.summary}</p>
                  </div>
                  {booking.paymentStatus ? (
                    <StatusBadge kind='payment' status={booking.paymentStatus} />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </WorkspacePanel>

        <div className='space-y-6'>
          <WorkspacePanel
            title='Hành động nhanh'
            description='Đi tới đúng bước tiếp theo mà không phải tìm lại trong menu.'
          >
            <div className='grid gap-3'>
              {quickActions.map((action) => (
                <WorkspaceActionCard
                  description={action.description}
                  icon={action.icon}
                  key={action.title}
                  title={action.title}
                  to={action.href}
                />
              ))}
            </div>
          </WorkspacePanel>

          <WorkspaceNotice
            description='Bạn đang có 1 buổi chờ thanh toán và 1 buổi đã hoàn thành có thể để lại đánh giá.'
            icon={MessageSquare}
            title='Nhắc việc học tập'
            tone='info'
          />
        </div>
      </div>
    </DashboardPage>
  )
}
