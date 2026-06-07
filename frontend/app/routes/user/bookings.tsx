import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Filter, MapPin, Search, Video } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { path } from '@/config/path'
import { learnerBookings, type LearnerBookingItem } from '@/mocks/learner-workspace'
import { formatPrice, formatShortBookingDate, formatTimeRange } from '@/utils/format'

type BookingFilter = 'ALL' | 'UPCOMING' | 'PAYMENT_DUE' | 'COMPLETED' | 'CANCELLED'

const bookingFilters: Array<{ key: BookingFilter; label: string }> = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'UPCOMING', label: 'Sắp tới' },
  { key: 'PAYMENT_DUE', label: 'Cần thanh toán' },
  { key: 'COMPLETED', label: 'Hoàn thành' },
  { key: 'CANCELLED', label: 'Đã hủy' }
]

const matchesFilter = (booking: LearnerBookingItem, filter: BookingFilter) => {
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

const getMeetingLabel = (booking: LearnerBookingItem) => {
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

    return learnerBookings.filter((booking) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        booking.snapshot.mentorName.toLowerCase().includes(normalizedQuery) ||
        booking.snapshot.subjectName.toLowerCase().includes(normalizedQuery) ||
        booking.snapshot.gradeName.toLowerCase().includes(normalizedQuery)

      return matchesFilter(booking, activeFilter) && matchesSearch
    })
  }, [activeFilter, searchQuery])

  const filterCounts = useMemo(
    () =>
      bookingFilters.reduce<Record<BookingFilter, number>>(
        (accumulator, filter) => {
          accumulator[filter.key] = learnerBookings.filter((booking) =>
            matchesFilter(booking, filter.key)
          ).length

          return accumulator
        },
        {} as Record<BookingFilter, number>
      ),
    []
  )

  return (
    <DashboardPage
      description='Quản lý các buổi đã đặt, tách rõ trạng thái lịch học và trạng thái thanh toán để biết bước tiếp theo.'
      title='Lịch học'
    >
      <div className='space-y-6'>
        <WorkspacePanel
          title='Bộ lọc lịch học'
          description='Tìm nhanh theo mentor, môn học hoặc xem riêng các buổi cần thanh toán.'
        >
          <div className='flex flex-wrap items-center gap-2'>
            {bookingFilters.map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                size='sm'
                variant={activeFilter === filter.key ? 'default' : 'secondary'}
              >
                {filter.label} ({filterCounts[filter.key]})
              </Button>
            ))}
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <div className='relative min-w-[260px] flex-1'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <Input
                className='pl-10'
                id='booking-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo mentor, môn học hoặc lớp'
                type='search'
                value={searchQuery}
              />
            </div>
            <Button variant='outline'>
              <Filter aria-hidden='true' size={16} />
              Bộ lọc nâng cao
            </Button>
          </div>
        </WorkspacePanel>

        {filteredBookings.length === 0 ? (
          <EmptyState
            actionHref={path.discover}
            actionLabel='Tìm mentor'
            description='Hãy thử mở rộng bộ lọc hoặc bắt đầu tìm một mentor mới phù hợp với mục tiêu học tập của bạn.'
            title='Chưa có buổi học phù hợp'
          />
        ) : (
          <WorkspacePanel
            title='Danh sách buổi học'
            description='Mỗi dòng giữ rõ snapshot môn học, mentor, thời gian, trạng thái booking và thanh toán.'
          >
            <div className='grid gap-4'>
              {filteredBookings.map((booking, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 12 }}
                  key={booking.id}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className='rounded-2xl shadow-none'>
                    <CardContent className='flex flex-col gap-5 p-5 lg:flex-row lg:items-center'>
                      <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl'>
                        <Calendar aria-hidden='true' size={22} />
                      </div>

                      <div className='min-w-0 flex-1 space-y-4'>
                        <div className='flex flex-wrap items-start justify-between gap-3'>
                          <div className='space-y-2'>
                            <div className='flex flex-wrap items-center gap-2'>
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

                        <div className='text-muted grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-4'>
                          <p className='flex items-center gap-2'>
                            <Clock aria-hidden='true' className='text-primary' size={14} />
                            {formatTimeRange(booking.startTime, booking.endTime)}
                          </p>
                          <p className='flex items-center gap-2'>
                            <Calendar aria-hidden='true' className='text-primary' size={14} />
                            {formatShortBookingDate(booking.bookingDate)}
                          </p>
                          <p className='flex items-center gap-2'>
                            <MapPin aria-hidden='true' className='text-primary' size={14} />
                            {getMeetingLabel(booking)}
                          </p>
                          <p className='font-medium text-slate-700'>
                            {formatPrice(booking.totalAmount)}
                          </p>
                        </div>

                        <p className='text-muted text-sm'>{booking.summary}</p>
                      </div>

                      <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0'>
                        <Button
                          variant={
                            booking.primaryAction.variant === 'primary' ? 'default' : 'outline'
                          }
                        >
                          {booking.primaryAction.label === 'Vào buổi học' ? (
                            <Video aria-hidden='true' size={16} />
                          ) : null}
                          {booking.primaryAction.label}
                        </Button>
                        <Button variant='outline'>{booking.secondaryAction.label}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </WorkspacePanel>
        )}
      </div>
    </DashboardPage>
  )
}
