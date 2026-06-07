import { CalendarDays, Clock3, Plus, Repeat, Sparkles, Video } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  mentorRecurringAvailability,
  mentorScheduleNotes,
  mentorSpecificDateAvailability,
  mentorUpcomingSessions
} from '@/mocks/mentor-workspace'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

const meetingTypeLabelMap = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  HYBRID: 'Linh hoạt'
} as const

export function meta() {
  return [{ title: 'Lịch dạy | Mentor' }]
}

export default function MentorSchedulePage() {
  const nextBookedSessions = mentorUpcomingSessions.filter(
    (session) => session.bookingStatus === 'CONFIRMED' || session.bookingStatus === 'PENDING'
  )

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
            <Button>
              <Plus aria-hidden='true' size={16} />
              Thêm khung giờ
            </Button>
          }
        >
          <div className='grid gap-4 md:grid-cols-2'>
            {mentorRecurringAvailability.map((window) => (
              <Card
                className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'
                key={`${window.dayLabel}-${window.startTime}`}
              >
                <CardContent className='space-y-4 p-4'>
                  <div className='flex items-start justify-between gap-3'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl'>
                          <Repeat aria-hidden='true' size={18} />
                        </div>
                        <div>
                          <p className='text-ink font-semibold'>{window.dayLabel}</p>
                          <p className='text-muted text-sm'>
                            {formatTimeRange(window.startTime, window.endTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge variant='success'>Đang mở</Badge>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {window.meetingTypes.map((meetingType) => (
                      <Badge key={meetingType} variant='muted'>
                        {meetingTypeLabelMap[meetingType]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
          {mentorSpecificDateAvailability.length === 0 ? (
            <EmptyState
              className='min-h-[220px] border-solid bg-slate-50'
              description='Bạn chưa mở thêm khung giờ nào theo ngày cụ thể. Hãy thêm khi cần đổi lịch hoặc tăng cường ngắn hạn.'
              icon={<Sparkles aria-hidden='true' size={24} />}
              title='Chưa có availability theo ngày'
            />
          ) : (
            <div className='space-y-4'>
              {mentorSpecificDateAvailability.map((window) => (
                <Card
                  className='rounded-2xl shadow-none'
                  key={`${window.dateLabel}-${window.startTime}`}
                >
                  <CardContent className='space-y-3 p-4'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <CalendarDays aria-hidden='true' className='text-primary' size={16} />
                          <p className='text-ink font-semibold'>{window.dateLabel}</p>
                        </div>
                        <p className='text-muted text-sm'>
                          {formatTimeRange(window.startTime, window.endTime)}
                        </p>
                      </div>
                      <Badge variant='info'>Ngắn hạn</Badge>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {window.meetingTypes.map((meetingType) => (
                        <Badge key={meetingType} variant='muted'>
                          {meetingTypeLabelMap[meetingType]}
                        </Badge>
                      ))}
                    </div>

                    {window.note ? <p className='text-muted text-sm'>{window.note}</p> : null}
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
          <div className='space-y-4'>
            {nextBookedSessions.map((session) => (
              <Card className='rounded-2xl shadow-none' key={session.id}>
                <CardContent className='flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between'>
                  <div className='space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='text-ink font-semibold'>
                        {session.studentName} · {session.subject} {session.grade}
                      </p>
                      <StatusBadge kind='booking' status={session.bookingStatus} />
                    </div>
                    <div className='text-muted grid gap-2 text-sm md:grid-cols-2'>
                      <p className='flex items-center gap-2'>
                        <CalendarDays aria-hidden='true' className='text-primary' size={15} />
                        {formatShortBookingDate(session.bookingDate)}
                      </p>
                      <p className='flex items-center gap-2'>
                        <Clock3 aria-hidden='true' className='text-primary' size={15} />
                        {formatTimeRange(session.startTime, session.endTime)}
                      </p>
                    </div>
                    <p className='text-muted text-sm'>{session.prepNote}</p>
                  </div>
                  <Button>
                    <Video aria-hidden='true' size={16} />
                    {session.bookingStatus === 'CONFIRMED' ? 'Vào buổi học' : 'Theo dõi booking'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </WorkspacePanel>
      </div>

      <WorkspaceNotice
        description='Màn hình này cố ý giữ rõ ranh giới giữa availability mở cho học viên đặt và các buổi đã thành booking thực tế.'
        icon={CalendarDays}
        title='Availability trước, booking sau'
        tone='neutral'
      />
    </DashboardPage>
  )
}
