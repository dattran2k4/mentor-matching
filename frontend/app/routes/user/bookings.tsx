import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Filter, MoreVertical, Search, Video } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import type { Booking, BookingStatus, PaymentStatus } from '@/types/booking'
import {
  formatPrice,
  formatShortBookingDate,
  formatTimeRange
} from '@/utils/format'

type BookingFilter = 'ALL' | 'UPCOMING' | 'PAYMENT_DUE' | 'COMPLETED' | 'CANCELLED'

type BookingRow = Booking & {
  nextActionLabel: string
  canJoin: boolean
}

const bookingFilters: Array<{ key: BookingFilter; label: string }> = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'UPCOMING', label: 'Sắp tới' },
  { key: 'PAYMENT_DUE', label: 'Cần thanh toán' },
  { key: 'COMPLETED', label: 'Hoàn thành' },
  { key: 'CANCELLED', label: 'Đã hủy' }
]

const mockBookings: BookingRow[] = [
  {
    id: 'booking-1',
    snapshot: {
      learnerName: 'Minh K.',
      mentorName: 'Nguyễn Minh Anh',
      subjectName: 'Toán',
      gradeName: 'Lớp 9',
      pricePerHour: 280000
    },
    bookingDate: '2026-06-11',
    startTime: '14:00',
    endTime: '15:30',
    meetingType: 'ONLINE',
    bookingStatus: 'CONFIRMED' satisfies BookingStatus,
    paymentStatus: 'PAID' satisfies PaymentStatus,
    totalAmount: 420000,
    meetingLink: 'https://meet.google.com/example',
    nextActionLabel: 'Vào buổi học',
    canJoin: true
  },
  {
    id: 'booking-2',
    snapshot: {
      learnerName: 'Minh K.',
      mentorName: 'Trần Quốc Huy',
      subjectName: 'Tiếng Anh',
      gradeName: 'IELTS Foundation',
      pricePerHour: 320000
    },
    bookingDate: '2026-06-12',
    startTime: '10:00',
    endTime: '11:00',
    meetingType: 'ONLINE',
    bookingStatus: 'PENDING' satisfies BookingStatus,
    paymentStatus: 'PENDING' satisfies PaymentStatus,
    totalAmount: 320000,
    meetingLink: 'https://zoom.us/example',
    nextActionLabel: 'Thanh toán',
    canJoin: false
  },
  {
    id: 'booking-3',
    snapshot: {
      learnerName: 'Minh K.',
      mentorName: 'Lê Thu Hà',
      subjectName: 'Vật lý',
      gradeName: 'Lớp 11',
      pricePerHour: 260000
    },
    bookingDate: '2026-06-02',
    startTime: '09:00',
    endTime: '10:30',
    meetingType: 'HYBRID',
    bookingStatus: 'COMPLETED' satisfies BookingStatus,
    paymentStatus: 'PAID' satisfies PaymentStatus,
    totalAmount: 390000,
    meetingAddress: 'Quận 7, TP.HCM',
    nextActionLabel: 'Đánh giá',
    canJoin: false
  }
]

const matchesFilter = (booking: BookingRow, filter: BookingFilter) => {
  switch (filter) {
    case 'UPCOMING':
      return booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'PENDING'
    case 'PAYMENT_DUE':
      return booking.paymentStatus === 'PENDING'
    case 'COMPLETED':
      return booking.bookingStatus === 'COMPLETED'
    case 'CANCELLED':
      return booking.bookingStatus === 'CANCELLED' || booking.bookingStatus === 'REJECTED'
    default:
      return true
  }
}

const getMeetingLabel = (booking: BookingRow) => {
  if (booking.meetingType === 'ONLINE') {
    return booking.meetingLink ? 'Google Meet / Zoom' : 'Buổi học online'
  }

  if (booking.meetingType === 'OFFLINE') {
    return booking.meetingAddress ?? 'Gặp trực tiếp'
  }

  return booking.meetingAddress ?? 'Linh hoạt online hoặc gặp trực tiếp'
}

export function meta() {
  return [{ title: 'Lịch học | Học viên' }]
}

export default function UserBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<BookingFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBookings = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return mockBookings.filter((booking) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        booking.snapshot.mentorName.toLowerCase().includes(normalizedQuery) ||
        booking.snapshot.subjectName.toLowerCase().includes(normalizedQuery) ||
        booking.snapshot.gradeName.toLowerCase().includes(normalizedQuery)

      return matchesFilter(booking, activeFilter) && matchesSearch
    })
  }, [activeFilter, searchQuery])

  return (
    <DashboardPage
      description='Theo dõi buổi học sắp tới, trạng thái đặt lịch và các khoản cần thanh toán.'
      title='Lịch học'
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1'>
            {bookingFilters.map((filter) => {
              const isActive = activeFilter === filter.key

              return (
                <button
                  key={filter.key}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                  onClick={() => setActiveFilter(filter.key)}
                  type='button'
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className='flex w-full flex-wrap items-center gap-3 md:w-auto'>
            <label className='relative min-w-[240px] flex-1 md:flex-none' htmlFor='booking-search'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <input
                className='focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm transition focus:ring-2 focus:outline-none'
                id='booking-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo mentor, môn học hoặc lớp'
                type='search'
                value={searchQuery}
              />
            </label>
            <button
              className='text-muted inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium'
              type='button'
            >
              <Filter aria-hidden='true' size={16} />
              Bộ lọc
            </button>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <EmptyState
            actionHref='/discover'
            actionLabel='Tìm mentor'
            description='Hãy thử mở rộng bộ lọc hoặc bắt đầu tìm một mentor mới phù hợp với mục tiêu học tập của bạn.'
            title='Chưa có buổi học phù hợp'
          />
        ) : (
          <div className='grid gap-4'>
            {filteredBookings.map((booking, index) => (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'
                initial={{ opacity: 0, y: 12 }}
                key={booking.id}
                transition={{ delay: index * 0.06 }}
              >
                <div className='flex flex-col gap-5 lg:flex-row lg:items-center'>
                  <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl'>
                    <Calendar aria-hidden='true' size={22} />
                  </div>

                  <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-start justify-between gap-3'>
                      <div>
                        <div className='mb-2 flex flex-wrap items-center gap-2'>
                          <h2 className='text-ink text-lg font-semibold'>
                            {booking.snapshot.subjectName} · {booking.snapshot.gradeName}
                          </h2>
                          <StatusBadge kind='booking' status={booking.bookingStatus} />
                        </div>
                        <p className='text-muted text-sm'>
                          Mentor{' '}
                          <span className='text-ink font-semibold'>
                            {booking.snapshot.mentorName}
                          </span>
                        </p>
                      </div>
                      {booking.paymentStatus ? (
                        <StatusBadge kind='payment' status={booking.paymentStatus} />
                      ) : null}
                    </div>

                    <div className='text-muted mt-4 grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-4'>
                      <p className='flex items-center gap-2'>
                        <Clock aria-hidden='true' className='text-primary' size={14} />
                        {formatTimeRange(booking.startTime, booking.endTime)}
                      </p>
                      <p className='flex items-center gap-2'>
                        <Calendar aria-hidden='true' className='text-primary' size={14} />
                        {formatShortBookingDate(booking.bookingDate)}
                      </p>
                      <p>{getMeetingLabel(booking)}</p>
                      <p className='font-medium text-slate-700'>{formatPrice(booking.totalAmount)}</p>
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0'>
                    <button
                      className={`inline-flex min-w-[148px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        booking.canJoin
                          ? 'bg-primary text-white shadow-sm hover:-translate-y-0.5'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      type='button'
                    >
                      {booking.canJoin ? <Video aria-hidden='true' size={16} /> : null}
                      {booking.nextActionLabel}
                    </button>
                    <button
                      className='rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700'
                      type='button'
                    >
                      <MoreVertical aria-hidden='true' size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </DashboardPage>
  )
}
