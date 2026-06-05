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
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { StatusBadge } from '@/components/StatusBadge'
import { path } from '@/config/path'
import { learnerBookings } from '@/constants/learner-workspace'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

export function meta() {
  return [{ title: 'Tổng quan | Học viên' }]
}

export default function UserDashboardPage() {
  const upcomingBookings = learnerBookings.filter(
    (booking) => booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'PENDING'
  )
  const nextBooking = upcomingBookings[0]
  const recentBookings = learnerBookings.slice(0, 3)

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
      <div className='grid gap-4 xl:grid-cols-[1.7fr_1fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Buổi học sắp tới'
            description='Ưu tiên xem buổi gần nhất để chuẩn bị trước tài liệu và thời gian vào lớp.'
            action={
              <Link
                className='text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline'
                to={path.user.bookings}
              >
                Xem tất cả
                <ArrowRight aria-hidden='true' size={14} />
              </Link>
            }
          />

          {nextBooking ? (
            <div className='mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5'>
              <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
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
                  <button
                    className='bg-primary rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90'
                    type='button'
                  >
                    {nextBooking.primaryAction.label}
                  </button>
                  <button
                    className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                    type='button'
                  >
                    {nextBooking.secondaryAction.label}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Tóm tắt tuần này'
            description='Các chỉ dấu ngắn giúp bạn biết cần ưu tiên việc gì tiếp theo.'
          />
          <div className='mt-6 grid gap-3'>
            {summaryItems.map((item) => (
              <div
                className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'
                key={item.label}
              >
                <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                  <item.icon aria-hidden='true' size={20} />
                </div>
                <div className='space-y-1'>
                  <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                    {item.label}
                  </p>
                  <p className='text-ink text-xl font-semibold'>{item.value}</p>
                  <p className='text-muted text-sm'>{item.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.2fr_1fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Gần đây'
            description='Xem nhanh các buổi vừa hoàn thành, đang chờ thanh toán hoặc cần theo dõi.'
          />
          <div className='mt-6 space-y-4'>
            {recentBookings.map((booking) => (
              <article
                className='flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between'
                key={booking.id}
              >
                <div className='space-y-2'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <p className='text-ink font-semibold'>
                      {booking.snapshot.subjectName} · {booking.snapshot.gradeName}
                    </p>
                    <StatusBadge kind='booking' status={booking.bookingStatus} />
                  </div>
                  <p className='text-muted text-sm'>
                    {booking.snapshot.mentorName} · {formatShortBookingDate(booking.bookingDate)} ·{' '}
                    {formatTimeRange(booking.startTime, booking.endTime)}
                  </p>
                  <p className='text-muted text-sm'>{booking.summary}</p>
                </div>
                {booking.paymentStatus ? (
                  <StatusBadge kind='payment' status={booking.paymentStatus} />
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Hành động nhanh'
            description='Đi tới đúng bước tiếp theo mà không phải tìm lại trong menu.'
          />
          <div className='mt-6 grid gap-3'>
            {quickActions.map((action) => (
              <Link
                className='group rounded-2xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-primary/5'
                key={action.title}
                to={action.href}
              >
                <div className='flex items-start gap-4'>
                  <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                    <action.icon aria-hidden='true' size={20} />
                  </div>
                  <div className='space-y-1'>
                    <p className='text-ink font-semibold'>{action.title}</p>
                    <p className='text-muted text-sm'>{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm'>
            <div className='flex items-start gap-3'>
              <MessageSquare aria-hidden='true' className='mt-0.5 text-blue-600' size={18} />
              <div className='space-y-1'>
                <p className='font-semibold text-blue-900'>Nhắc việc học tập</p>
                <p className='text-blue-800'>
                  Bạn đang có 1 buổi chờ thanh toán và 1 buổi đã hoàn thành có thể để lại đánh giá.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
