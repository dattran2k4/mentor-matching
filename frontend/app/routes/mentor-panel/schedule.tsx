import { useMemo } from 'react'
import {
  CalendarDays,
  Clock3,
  Link as LinkIcon,
  MapPin,
  Plus,
  Repeat,
  Sparkles,
  Video
} from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCurrentMentorBookingsQuery } from '@/hooks/queries/booking/useCurrentMentorBookingsQuery'
import { useCurrentMentorScheduleQuery } from '@/hooks/queries/mentor/useCurrentMentorScheduleQuery'
import { mentorScheduleNotes } from '@/mocks/mentor-workspace'
import type { BookingApiResponse } from '@/types/api/booking'
import type {
  MentorAvailabilityDetailApiResponse,
  MentorAvailabilityTypeApiResponse,
  MentorMeetingTypeApiResponse
} from '@/types/api/mentor'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

const meetingTypeLabelMap = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  HYBRID: 'Linh hoạt'
} as const

type AvailabilityCardItem = {
  id: number
  kind: MentorAvailabilityTypeApiResponse
  label: string
  startTime: string
  endTime: string
  meetingTypeLabel: string | null
}

type BookedSessionItem = {
  id: number
  learnerName: string
  subjectLabel: string
  bookingDate: string
  startTime: string
  endTime: string
  bookingStatus: BookingApiResponse['status']
  meetingDetail: string
  summary: string
  joinLink: string | null
}

function formatMeetingTypeLabel(meetingType: MentorMeetingTypeApiResponse | null) {
  if (!meetingType) return null

  return meetingTypeLabelMap[meetingType]
}

function formatAvailabilityLabel(item: MentorAvailabilityDetailApiResponse) {
  if (item.availabilityType === 'RECURRING') {
    return formatDayOfWeek(item.dayOfWeek)
  }

  return formatSpecificDateLabel(item.availableDate)
}

function formatDayOfWeek(dayOfWeek: number | null) {
  if (dayOfWeek === 1) return 'Thứ 2'
  if (dayOfWeek === 2) return 'Thứ 3'
  if (dayOfWeek === 3) return 'Thứ 4'
  if (dayOfWeek === 4) return 'Thứ 5'
  if (dayOfWeek === 5) return 'Thứ 6'
  if (dayOfWeek === 6) return 'Thứ 7'
  if (dayOfWeek === 7) return 'Chủ nhật'

  return 'Lịch lặp lại'
}

function formatSpecificDateLabel(value: string | null) {
  if (!value) return 'Ngày cụ thể'

  const date = new Date(`${value}T00:00:00`)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
      }).format(date)
}

function compareAvailability(
  left: MentorAvailabilityDetailApiResponse,
  right: MentorAvailabilityDetailApiResponse
) {
  if (left.availabilityType !== right.availabilityType) {
    return left.availabilityType === 'RECURRING' ? -1 : 1
  }

  if (left.availabilityType === 'RECURRING' && right.availabilityType === 'RECURRING') {
    return (
      (left.dayOfWeek ?? Number.MAX_SAFE_INTEGER) - (right.dayOfWeek ?? Number.MAX_SAFE_INTEGER) ||
      left.startTime.localeCompare(right.startTime) ||
      left.endTime.localeCompare(right.endTime)
    )
  }

  return (
    (left.availableDate ?? '').localeCompare(right.availableDate ?? '') ||
    left.startTime.localeCompare(right.startTime) ||
    left.endTime.localeCompare(right.endTime)
  )
}

function compareBookings(left: BookingApiResponse, right: BookingApiResponse) {
  return (
    left.bookingDate.localeCompare(right.bookingDate) ||
    left.startTime.localeCompare(right.startTime) ||
    left.endTime.localeCompare(right.endTime)
  )
}

function getMeetingDetail(booking: BookingApiResponse) {
  if (booking.meetingType === 'ONLINE') {
    return booking.meetingLink?.trim() || 'Buổi học online'
  }

  return booking.meetingAddress?.trim() || 'Buổi học trực tiếp'
}

function getBookingSummary(booking: BookingApiResponse) {
  if (booking.note?.trim()) return booking.note.trim()
  if (booking.cancelReason?.trim()) return `Lý do hủy: ${booking.cancelReason.trim()}`
  if (booking.meetingType === 'ONLINE' && booking.meetingLink?.trim()) {
    return 'Booking đã có link học trực tuyến.'
  }
  if (booking.meetingAddress?.trim()) {
    return `Địa điểm học: ${booking.meetingAddress.trim()}`
  }

  return 'Booking hiện chưa có ghi chú bổ sung từ backend.'
}

function getBookedSessionAction(booking: BookedSessionItem) {
  if (booking.bookingStatus === 'CONFIRMED' && booking.joinLink) {
    return {
      href: booking.joinLink,
      label: 'Vào buổi học'
    }
  }

  if (booking.bookingStatus === 'PENDING') {
    return {
      href: null,
      label: 'Chờ xác nhận'
    }
  }

  if (booking.bookingStatus === 'CONFIRMED') {
    return {
      href: null,
      label: 'Đã đặt lịch'
    }
  }

  if (booking.bookingStatus === 'COMPLETED') {
    return {
      href: null,
      label: 'Đã hoàn thành'
    }
  }

  return {
    href: null,
    label: 'View-only'
  }
}

function SchedulePageSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-6 xl:grid-cols-[1.5fr_1fr]'>
        {['Khung giờ lặp lại hằng tuần', 'Lưu ý khi mở lịch'].map((title) => (
          <WorkspacePanel key={title} title={title}>
            <div className='animate-pulse space-y-4'>
              <div className='h-10 w-40 rounded-xl bg-slate-100' />
              <div className='h-28 rounded-2xl bg-slate-100' />
              <div className='h-28 rounded-2xl bg-slate-100' />
            </div>
          </WorkspacePanel>
        ))}
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.1fr_1.3fr]'>
        {['Khung giờ theo ngày cụ thể', 'Buổi đã được đặt'].map((title) => (
          <WorkspacePanel key={title} title={title}>
            <div className='animate-pulse space-y-4'>
              <div className='h-10 w-48 rounded-xl bg-slate-100' />
              <div className='h-32 rounded-2xl bg-slate-100' />
              <div className='h-32 rounded-2xl bg-slate-100' />
            </div>
          </WorkspacePanel>
        ))}
      </div>
    </div>
  )
}

export function meta() {
  return [{ title: 'Lịch dạy | Mentor' }]
}

export default function MentorSchedulePage() {
  const mentorScheduleQuery = useCurrentMentorScheduleQuery()
  const mentorBookingsQuery = useCurrentMentorBookingsQuery(
    Boolean(mentorScheduleQuery.data?.currentMentor)
  )

  const recurringAvailability = useMemo(() => {
    const currentMentor = mentorScheduleQuery.data?.currentMentor

    return (mentorScheduleQuery.data?.availabilities ?? [])
      .filter((item) => item.availabilityType === 'RECURRING')
      .sort(compareAvailability)
      .map<AvailabilityCardItem>((item) => ({
        id: item.id,
        kind: item.availabilityType,
        label: formatAvailabilityLabel(item),
        startTime: item.startTime,
        endTime: item.endTime,
        meetingTypeLabel: formatMeetingTypeLabel(currentMentor?.meetingType ?? null)
      }))
  }, [mentorScheduleQuery.data?.availabilities, mentorScheduleQuery.data?.currentMentor])

  const specificDateAvailability = useMemo(() => {
    const currentMentor = mentorScheduleQuery.data?.currentMentor

    return (mentorScheduleQuery.data?.availabilities ?? [])
      .filter((item) => item.availabilityType === 'SPECIFIC_DATE')
      .sort(compareAvailability)
      .map<AvailabilityCardItem>((item) => ({
        id: item.id,
        kind: item.availabilityType,
        label: formatAvailabilityLabel(item),
        startTime: item.startTime,
        endTime: item.endTime,
        meetingTypeLabel: formatMeetingTypeLabel(currentMentor?.meetingType ?? null)
      }))
  }, [mentorScheduleQuery.data?.availabilities, mentorScheduleQuery.data?.currentMentor])

  const bookedSessions = useMemo(
    () =>
      (mentorBookingsQuery.data ?? [])
        .slice()
        .sort(compareBookings)
        .map<BookedSessionItem>((booking) => ({
          id: booking.id,
          learnerName: booking.studentName.trim() || 'Học viên đang cập nhật',
          subjectLabel: [booking.subjectName, booking.gradeName].filter(Boolean).join(' · '),
          bookingDate: booking.bookingDate,
          startTime: booking.startTime,
          endTime: booking.endTime,
          bookingStatus: booking.status,
          meetingDetail: getMeetingDetail(booking),
          summary: getBookingSummary(booking),
          joinLink: booking.meetingType === 'ONLINE' ? booking.meetingLink : null
        })),
    [mentorBookingsQuery.data]
  )

  const handleRetrySchedule = () => {
    void mentorScheduleQuery.refetch()
  }

  const handleRetryBookings = () => {
    void mentorBookingsQuery.refetch()
  }

  if (mentorScheduleQuery.isLoading && !mentorScheduleQuery.data) {
    return (
      <DashboardPage
        description='Quản lý availability theo khung giờ lặp lại, ngày cụ thể và xem riêng các buổi đã được đặt.'
        title='Lịch dạy'
      >
        <SchedulePageSkeleton />
      </DashboardPage>
    )
  }

  if (mentorScheduleQuery.isError || !mentorScheduleQuery.data?.currentMentor) {
    return (
      <DashboardPage
        description='Quản lý availability theo khung giờ lặp lại, ngày cụ thể và xem riêng các buổi đã được đặt.'
        title='Lịch dạy'
      >
        <ScreenErrorState
          description='Không thể tải mentor hiện tại hoặc availability từ backend. Vui lòng thử lại để tiếp tục.'
          onRetry={handleRetrySchedule}
          retryLabel='Tải lại lịch dạy'
          title='Không tải được lịch dạy'
        />
      </DashboardPage>
    )
  }

  return (
    <DashboardPage
      description='Quản lý availability theo khung giờ lặp lại, ngày cụ thể và xem riêng các buổi đã được đặt.'
      title='Lịch dạy'
    >
      <div className='grid gap-6 xl:grid-cols-[1.5fr_1fr]'>
        <WorkspacePanel
          title='Khung giờ lặp lại hằng tuần'
          description='Dùng cho lịch dạy cố định theo tuần. Đây là availability, chưa phải lịch đã được học viên chốt.'
          action={
            <Button disabled>
              <Plus aria-hidden='true' size={16} />
              Thêm khung giờ
            </Button>
          }
        >
          {recurringAvailability.length === 0 ? (
            <EmptyState
              className='min-h-[220px] border-solid bg-slate-50'
              description='Bạn chưa có availability lặp lại nào từ backend. Hãy bổ sung khi workflow create/update availability được nối thật.'
              icon={<Repeat aria-hidden='true' size={24} />}
              title='Chưa có khung giờ lặp lại'
            />
          ) : (
            <div className='grid gap-4 md:grid-cols-2'>
              {recurringAvailability.map((window) => (
                <Card
                  className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'
                  key={window.id}
                >
                  <CardContent className='space-y-4 p-4'>
                    <div className='flex items-start justify-between gap-3'>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl'>
                            <Repeat aria-hidden='true' size={18} />
                          </div>
                          <div>
                            <p className='text-ink font-semibold'>{window.label}</p>
                            <p className='text-muted text-sm'>
                              {formatTimeRange(window.startTime, window.endTime)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Badge variant='success'>Đang mở</Badge>
                    </div>

                    {window.meetingTypeLabel ? (
                      <div className='flex flex-wrap gap-2'>
                        <Badge variant='muted'>{window.meetingTypeLabel}</Badge>
                      </div>
                    ) : (
                      <p className='text-muted text-sm'>
                        Backend availability hiện chưa trả hình thức dạy theo từng khung giờ.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </WorkspacePanel>

        <WorkspacePanel
          title='Lưu ý khi mở lịch'
          description='Giữ availability rõ ràng để phụ huynh và học viên hiểu đâu là khung giờ có thể đặt.'
        >
          <div className='space-y-3'>
            {mentorScheduleNotes.map((note) => (
              <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none' key={note}>
                <CardContent className='p-4 text-sm text-slate-700'>{note}</CardContent>
              </Card>
            ))}
          </div>
        </WorkspacePanel>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.1fr_1.3fr]'>
        <WorkspacePanel
          title='Khung giờ theo ngày cụ thể'
          description='Dùng cho buổi tăng cường, thay đổi lịch ngắn hạn hoặc mở thêm ca trước kỳ kiểm tra.'
        >
          {specificDateAvailability.length === 0 ? (
            <EmptyState
              className='min-h-[220px] border-solid bg-slate-50'
              description='Bạn chưa mở thêm khung giờ nào theo ngày cụ thể. Hãy thêm khi cần đổi lịch hoặc tăng cường ngắn hạn.'
              icon={<Sparkles aria-hidden='true' size={24} />}
              title='Chưa có availability theo ngày'
            />
          ) : (
            <div className='space-y-4'>
              {specificDateAvailability.map((window) => (
                <Card className='rounded-2xl shadow-none' key={window.id}>
                  <CardContent className='space-y-3 p-4'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <CalendarDays aria-hidden='true' className='text-primary' size={16} />
                          <p className='text-ink font-semibold'>{window.label}</p>
                        </div>
                        <p className='text-muted text-sm'>
                          {formatTimeRange(window.startTime, window.endTime)}
                        </p>
                      </div>
                      <Badge variant='info'>Ngắn hạn</Badge>
                    </div>

                    {window.meetingTypeLabel ? (
                      <div className='flex flex-wrap gap-2'>
                        <Badge variant='muted'>{window.meetingTypeLabel}</Badge>
                      </div>
                    ) : (
                      <p className='text-muted text-sm'>
                        Hình thức dạy theo từng availability chưa có trong contract backend hiện
                        tại.
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </WorkspacePanel>

        <WorkspacePanel
          title='Buổi đã được đặt'
          description='Hiển thị riêng với availability để bạn biết buổi nào đã chốt với học viên.'
        >
          {mentorBookingsQuery.isLoading && !mentorBookingsQuery.data ? (
            <div className='space-y-4'>
              {[1, 2].map((item) => (
                <Card className='rounded-2xl shadow-none' key={item}>
                  <CardContent className='animate-pulse space-y-4 p-4'>
                    <div className='h-6 w-48 rounded-xl bg-slate-100' />
                    <div className='grid gap-3 md:grid-cols-2'>
                      <div className='h-5 rounded-xl bg-slate-100' />
                      <div className='h-5 rounded-xl bg-slate-100' />
                    </div>
                    <div className='h-16 rounded-2xl bg-slate-100' />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : mentorBookingsQuery.isError ? (
            <ScreenErrorState
              description='Không thể tải danh sách booking của mentor lúc này. Vui lòng thử lại để tiếp tục.'
              onRetry={handleRetryBookings}
              retryLabel='Tải lại booking'
              title='Không tải được booking'
            />
          ) : bookedSessions.length === 0 ? (
            <EmptyState
              className='min-h-[220px] border-solid bg-slate-50'
              description='Backend chưa trả về booking nào cho mentor hiện tại. Khi có học viên đặt lịch, các buổi sẽ xuất hiện riêng ở đây.'
              icon={<Video aria-hidden='true' size={24} />}
              title='Chưa có buổi đã được đặt'
            />
          ) : (
            <div className='space-y-4'>
              {bookedSessions.map((session) => {
                const action = getBookedSessionAction(session)

                return (
                  <Card className='rounded-2xl shadow-none' key={session.id}>
                    <CardContent className='flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between'>
                      <div className='space-y-3'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='text-ink font-semibold'>
                            {session.learnerName} ·{' '}
                            {session.subjectLabel || 'Môn học đang cập nhật'}
                          </p>
                          <StatusBadge kind='booking' status={session.bookingStatus} />
                        </div>
                        <div className='text-muted grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-3'>
                          <p className='flex items-center gap-2'>
                            <CalendarDays aria-hidden='true' className='text-primary' size={15} />
                            {formatShortBookingDate(session.bookingDate)}
                          </p>
                          <p className='flex items-center gap-2'>
                            <Clock3 aria-hidden='true' className='text-primary' size={15} />
                            {formatTimeRange(session.startTime, session.endTime)}
                          </p>
                          <p className='flex items-center gap-2 break-all'>
                            {action.href ? (
                              <LinkIcon
                                aria-hidden='true'
                                className='text-primary shrink-0'
                                size={15}
                              />
                            ) : (
                              <MapPin
                                aria-hidden='true'
                                className='text-primary shrink-0'
                                size={15}
                              />
                            )}
                            {session.meetingDetail}
                          </p>
                        </div>
                        <p className='text-muted text-sm'>{session.summary}</p>
                      </div>

                      {action.href ? (
                        <a
                          className={buttonVariants()}
                          href={action.href}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <Video aria-hidden='true' size={16} />
                          {action.label}
                        </a>
                      ) : (
                        <Button disabled>{action.label}</Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </WorkspacePanel>
      </div>

      <WorkspaceNotice
        description='Availability và booking hiện đã dùng dữ liệu thật. Tạo hoặc chỉnh sửa khung giờ vẫn đang để view-only vì frontend service chưa có endpoint create/update availability.'
        icon={CalendarDays}
        title='Availability trước, booking sau'
        tone='neutral'
      />
    </DashboardPage>
  )
}
