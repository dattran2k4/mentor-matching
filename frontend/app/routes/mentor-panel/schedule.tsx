import { CalendarDays, Clock3, Plus, Repeat, Sparkles, Video } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
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
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Khung giờ lặp lại hằng tuần'
            description='Dùng cho lịch dạy cố định theo tuần. Đây là availability, chưa phải lịch đã được học viên chốt.'
            action={
              <button
                className='bg-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90'
                type='button'
              >
                <Plus aria-hidden='true' size={16} />
                Thêm khung giờ
              </button>
            }
          />

          <div className='mt-6 grid gap-4 md:grid-cols-2'>
            {mentorRecurringAvailability.map((window) => (
              <article
                className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                key={`${window.dayLabel}-${window.startTime}`}
              >
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
                    <div className='flex flex-wrap gap-2'>
                      {window.meetingTypes.map((meetingType) => (
                        <span
                          className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700'
                          key={meetingType}
                        >
                          {meetingTypeLabelMap[meetingType]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700'>
                    Đang mở
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Lưu ý khi mở lịch'
            description='Giữ availability rõ ràng để phụ huynh và học viên hiểu đâu là khung giờ có thể đặt.'
          />
          <div className='mt-6 space-y-3'>
            {mentorScheduleNotes.map((note) => (
              <div
                className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700'
                key={note}
              >
                {note}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.1fr_1.3fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Khung giờ theo ngày cụ thể'
            description='Dùng cho buổi tăng cường, thay đổi lịch ngắn hạn hoặc mở thêm ca trước kỳ kiểm tra.'
          />

          {mentorSpecificDateAvailability.length === 0 ? (
            <EmptyState
              className='mt-6 min-h-[220px] border-solid bg-slate-50'
              description='Bạn chưa mở thêm khung giờ nào theo ngày cụ thể. Hãy thêm khi cần đổi lịch hoặc tăng cường ngắn hạn.'
              icon={<Sparkles aria-hidden='true' size={24} />}
              title='Chưa có availability theo ngày'
            />
          ) : (
            <div className='mt-6 space-y-4'>
              {mentorSpecificDateAvailability.map((window) => (
                <article
                  className='rounded-2xl border border-slate-200 p-4'
                  key={`${window.dateLabel}-${window.startTime}`}
                >
                  <div className='flex flex-wrap items-center justify-between gap-3'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <CalendarDays aria-hidden='true' className='text-primary' size={16} />
                        <p className='text-ink font-semibold'>{window.dateLabel}</p>
                      </div>
                      <p className='text-muted text-sm'>
                        {formatTimeRange(window.startTime, window.endTime)}
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {window.meetingTypes.map((meetingType) => (
                          <span
                            className='rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700'
                            key={meetingType}
                          >
                            {meetingTypeLabelMap[meetingType]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700'>
                      Ngắn hạn
                    </span>
                  </div>
                  {window.note ? <p className='text-muted mt-3 text-sm'>{window.note}</p> : null}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Buổi đã được đặt'
            description='Hiển thị riêng với availability để bạn biết buổi nào đã chốt với học viên.'
          />
          <div className='mt-6 space-y-4'>
            {nextBookedSessions.map((session) => (
              <article className='rounded-2xl border border-slate-200 p-4' key={session.id}>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
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
                  <button
                    className='bg-primary inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-90'
                    type='button'
                  >
                    <Video aria-hidden='true' size={16} />
                    {session.bookingStatus === 'CONFIRMED' ? 'Vào buổi học' : 'Theo dõi booking'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
