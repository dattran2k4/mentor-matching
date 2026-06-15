import axios from 'axios'
import {
  ArrowLeft,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'

import BookingSidebar from '@/components/BookingSidebar'
import { EmptyState } from '@/components/EmptyState'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { path } from '@/config/path'
import {
  mapMentorCalendarToViewModel,
  resolveSelectedCalendarSlot,
  type MentorCalendarSlotViewModel,
  type MentorCalendarViewModel
} from '@/features/mentor-profile/mentor-calendar.mapper'
import { useMentorProfileQuery } from '@/hooks/queries/mentor/useMentorProfileQuery'
import { useMentorCalendarQuery } from '@/hooks/queries/mentor/useMentorCalendarQuery'
import {
  formatMeetingTypeLabel,
  formatTimeLabel,
  mapMentorProfileToViewModel,
  type MentorProfileOffering,
  type MentorProfileViewModel
} from '@/features/mentor-profile/mentor-profile.mapper'
import type { ErrorResponse } from '@/types/api/common'
import { cn } from '@/utils/cn'
import { formatPrice, getInitials } from '@/utils/format'

const MentorProfile = () => {
  const { id } = useParams()
  const mentorId = parseMentorId(id)
  const mentorProfileQuery = useMentorProfileQuery(mentorId)
  const mentor = useMemo(
    () => (mentorProfileQuery.data ? mapMentorProfileToViewModel(mentorProfileQuery.data) : null),
    [mentorProfileQuery.data]
  )
  const [selectedOfferingIdState, setSelectedOfferingId] = useState<string>()
  const [initialWeekStart] = useState(() => getWeekStartIso(new Date()))
  const [requestedWeekStart, setRequestedWeekStart] = useState<string>()
  const [selectedSlotIdState, setSelectedSlotId] = useState<string>()
  const calendarRange = requestedWeekStart
    ? getCalendarWeekRange(requestedWeekStart)
    : getInitialCalendarDiscoveryRange(initialWeekStart)
  const mentorCalendarQuery = useMentorCalendarQuery(mentorId, calendarRange.from, calendarRange.to)
  const queriedCalendar = useMemo(
    () =>
      mentorCalendarQuery.data && mentor
        ? mapMentorCalendarToViewModel(mentorCalendarQuery.data, mentor.bookableMeetingType)
        : null,
    [mentor, mentorCalendarQuery.data]
  )
  const displayWeekStart =
    requestedWeekStart ??
    (queriedCalendar?.slots[0] ? getWeekStartIso(queriedCalendar.slots[0].date) : initialWeekStart)
  const calendar = useMemo(
    () => (queriedCalendar ? getCalendarWeekView(queriedCalendar, displayWeekStart) : null),
    [displayWeekStart, queriedCalendar]
  )
  const selectedSlot = calendar
    ? resolveSelectedCalendarSlot(calendar.slots, selectedSlotIdState)
    : null
  const selectedSlotId = selectedSlot?.id
  const selectedOfferingId = mentor?.offerings.some(
    (offering) => offering.id === selectedOfferingIdState
  )
    ? selectedOfferingIdState
    : (mentor?.offerings.find((offering) => offering.active)?.id ?? mentor?.offerings[0]?.id)

  const handleChangeWeek = (weekOffset: number) => {
    const nextWeekStart = addDaysToIsoDate(displayWeekStart, weekOffset * 7)

    setRequestedWeekStart(nextWeekStart)
  }

  const notFound =
    mentorId === null ||
    (axios.isAxiosError<ErrorResponse>(mentorProfileQuery.error) &&
      mentorProfileQuery.error.response?.status === 404)

  if (notFound) {
    return (
      <PageShell>
        <EmptyState
          actionHref={path.discover}
          actionLabel='Quay lại danh sách mentor'
          description='Hồ sơ này hiện không có sẵn hoặc chưa đủ điều kiện hiển thị.'
          title='Không tìm thấy mentor'
        />
      </PageShell>
    )
  }

  if (mentorProfileQuery.isLoading) {
    return (
      <PageShell>
        <ProfileSkeleton />
      </PageShell>
    )
  }

  if (mentorProfileQuery.isError) {
    return (
      <PageShell>
        <ScreenErrorState
          description='Không thể tải hồ sơ mentor lúc này. Vui lòng thử lại.'
          onRetry={() => void mentorProfileQuery.refetch()}
          title='Chưa tải được hồ sơ mentor'
        />
      </PageShell>
    )
  }

  if (!mentor) return null

  return (
    <PageShell>
      <ProfileHeader mentor={mentor} />

      <div className='mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start'>
        <main className='space-y-5'>
          <ContentSection id='introduction' title='Giới thiệu ngắn'>
            <p className='text-muted text-sm leading-7'>{mentor.introduction}</p>
            {mentor.highlights.length ? (
              <div className='mt-4 flex flex-wrap gap-2'>
                {mentor.highlights.slice(0, 5).map((highlight) => (
                  <Badge key={highlight} variant='muted'>
                    {highlight}
                  </Badge>
                ))}
              </div>
            ) : null}
          </ContentSection>

          <OfferingsSection
            mentor={mentor}
            selectedOfferingId={selectedOfferingId}
            onSelectOffering={setSelectedOfferingId}
          />

          <TrustAndExperienceSection mentor={mentor} />
          <AvailabilitySection
            calendar={calendar}
            isError={mentorCalendarQuery.isError}
            isLoading={mentorCalendarQuery.isLoading}
            selectedSlotId={selectedSlotId}
            weekStart={displayWeekStart}
            onChangeWeek={handleChangeWeek}
            onSelectSlot={setSelectedSlotId}
          />
          <ReviewsSection mentor={mentor} />
        </main>

        <BookingSidebar
          calendarSlots={calendar?.slots ?? []}
          isCalendarLoading={mentorCalendarQuery.isLoading}
          mentor={mentor}
          selectedSlotId={selectedSlotId}
          selectedOfferingId={selectedOfferingId}
          className='lg:col-start-2 lg:row-start-1'
          onSelectSlot={setSelectedSlotId}
        />
      </div>
    </PageShell>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className='py-2'>
      <Link
        className='text-muted hover:text-primary group mb-4 inline-flex items-center gap-2 text-sm font-semibold'
        to={path.discover}
      >
        <ArrowLeft size={16} className='transition group-hover:-translate-x-1' />
        Quay lại tìm mentor
      </Link>
      {children}
    </div>
  )
}

function ProfileHeader({ mentor }: { mentor: MentorProfileViewModel }) {
  return (
    <Card className='overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm'>
      <CardContent className='p-0'>
        <div className='flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6'>
          <div className='flex min-w-0 items-center gap-4'>
            <div className='bg-primary/10 text-primary h-20 w-20 shrink-0 overflow-hidden rounded-full'>
              {mentor.avatarUrl ? (
                <img
                  alt={mentor.name}
                  className='h-full w-full object-cover'
                  src={mentor.avatarUrl}
                />
              ) : (
                <span className='flex h-full w-full items-center justify-center text-2xl font-bold'>
                  {getInitials(mentor.name)}
                </span>
              )}
            </div>
            <div className='min-w-0'>
              <h1 className='text-ink text-2xl font-bold md:text-3xl'>{mentor.name}</h1>
              <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {mentor.verificationStatus ? (
                  <StatusBadge kind='verification' status={mentor.verificationStatus} />
                ) : null}
                {mentor.approvalStatus ? (
                  <StatusBadge kind='approval' status={mentor.approvalStatus} />
                ) : null}
                {mentor.meetingTypes.map((meetingType) => (
                  <Badge key={meetingType} variant='outline'>
                    {formatMeetingTypeLabel(meetingType)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-3 gap-2 md:min-w-[360px]'>
            <HeaderMetric
              icon={<Star size={14} className='text-amber-500' />}
              label='Đánh giá'
              value={mentor.rating !== null ? mentor.rating.toFixed(1) : 'Chưa có'}
            />
            <HeaderMetric
              icon={<Users size={14} className='text-blue-600' />}
              label='Học viên'
              value={
                mentor.activeStudentsCount !== null
                  ? String(mentor.activeStudentsCount)
                  : 'Đang cập nhật'
              }
            />
            <HeaderMetric
              icon={<MessageSquareText size={14} className='text-emerald-600' />}
              label='Phản hồi'
              value={mentor.responseTime || 'Chưa công khai'}
            />
          </div>
        </div>

        <nav className='flex gap-1 overflow-x-auto border-t border-slate-200 px-4'>
          <ProfileNavItem
            href='#introduction'
            icon={<CheckCircle2 size={15} />}
            label='Mentor tin cậy'
          />
          <ProfileNavItem href='#offerings' icon={<BookOpen size={15} />} label='Môn học' />
          <ProfileNavItem href='#experience' icon={<Award size={15} />} label='Kinh nghiệm' />
          <ProfileNavItem href='#availability' icon={<CalendarDays size={15} />} label='Lịch dạy' />
          <ProfileNavItem href='#reviews' icon={<MessageSquareText size={15} />} label='Đánh giá' />
        </nav>
      </CardContent>
    </Card>
  )
}

function ProfileNavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      className='text-muted hover:text-primary inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-4 py-3 text-xs font-semibold hover:border-blue-500'
      href={href}
    >
      {icon}
      {label}
    </a>
  )
}

function HeaderMetric({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
      <p className='text-muted flex items-center gap-1.5 text-[10px]'>
        {icon}
        {label}
      </p>
      <p className='text-ink mt-1 text-xs font-bold'>{value}</p>
    </div>
  )
}

function ContentSection({
  children,
  id,
  subtitle,
  title
}: {
  children: ReactNode
  id: string
  subtitle?: string
  title: string
}) {
  return (
    <Card id={id} className='scroll-mt-24 rounded-2xl border-slate-200 bg-white shadow-sm'>
      <CardContent className='p-5 md:p-6'>
        <h2 className='text-ink text-xl font-bold'>{title}</h2>
        {subtitle ? <p className='text-muted mt-1 text-sm'>{subtitle}</p> : null}
        <div className='mt-4'>{children}</div>
      </CardContent>
    </Card>
  )
}

function OfferingsSection({
  mentor,
  onSelectOffering,
  selectedOfferingId
}: {
  mentor: MentorProfileViewModel
  onSelectOffering: (id: string) => void
  selectedOfferingId?: string
}) {
  return (
    <ContentSection
      id='offerings'
      title='Môn học và học phí'
      subtitle='Chọn môn học phù hợp để xem lịch và gửi yêu cầu đặt buổi.'
    >
      <div className='space-y-3'>
        {mentor.offerings.length ? (
          mentor.offerings.map((offering) => (
            <OfferingCard
              key={offering.id}
              meetingTypes={mentor.meetingTypes}
              offering={offering}
              selected={offering.id === selectedOfferingId}
              onSelect={onSelectOffering}
            />
          ))
        ) : (
          <InlineEmpty text='Mentor chưa có môn học đang mở.' />
        )}
      </div>
    </ContentSection>
  )
}

function OfferingCard({
  meetingTypes,
  offering,
  onSelect,
  selected
}: {
  meetingTypes: MentorProfileViewModel['meetingTypes']
  offering: MentorProfileOffering
  onSelect: (id: string) => void
  selected: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 transition',
        selected
          ? 'border-blue-400 bg-blue-50/70 ring-2 ring-blue-100'
          : 'border-slate-200 bg-slate-50'
      )}
    >
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <p className='text-ink font-bold'>
            {offering.subject} · {offering.grade}
          </p>
          <p className='text-muted mt-1 text-sm leading-relaxed'>{offering.teachingNote}</p>
          <div className='mt-2 flex flex-wrap gap-2'>
            <Badge variant='outline'>{formatProficiency(offering.proficiency)}</Badge>
            {meetingTypes.map((type) => (
              <Badge key={type} variant='outline'>
                {formatMeetingTypeLabel(type)}
              </Badge>
            ))}
          </div>
        </div>
        <div className='flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end'>
          <p className='text-primary text-lg font-bold'>
            {formatPrice(offering.pricePerHour)} / buổi
          </p>
          <Button
            className='rounded-xl'
            type='button'
            variant={selected ? 'default' : 'outline'}
            onClick={() => onSelect(offering.id)}
          >
            {selected ? 'Đã chọn' : 'Chọn môn này'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function TrustAndExperienceSection({ mentor }: { mentor: MentorProfileViewModel }) {
  const experience = mentor.experience[0]
  const education = mentor.education[0]

  return (
    <ContentSection id='experience' title='Điểm tin cậy và kinh nghiệm'>
      <div className='grid gap-3 md:grid-cols-3'>
        <InfoTile
          icon={<ShieldCheck size={18} />}
          title='Trạng thái hồ sơ'
          lines={[
            mentor.approvalStatus ? 'Đã có trạng thái duyệt' : 'Chưa công khai trạng thái duyệt',
            mentor.verificationStatus ? 'Đã có trạng thái xác minh' : 'Chưa công khai xác minh'
          ]}
        />
        <InfoTile
          icon={<BriefcaseBusiness size={18} />}
          title='Kinh nghiệm'
          lines={experience ? [experience.period, experience.title] : ['Chưa công khai']}
        />
        <InfoTile
          icon={<GraduationCap size={18} />}
          title='Học vấn'
          lines={education ? [education.degree, education.school] : ['Chưa công khai']}
        />
      </div>

      {mentor.achievements.length ? (
        <div className='mt-4 rounded-xl bg-slate-50 p-4'>
          <p className='text-ink text-sm font-bold'>Thành tích và chứng nhận</p>
          <ul className='mt-2 space-y-2'>
            {mentor.achievements.slice(0, 4).map((achievement) => (
              <li key={achievement} className='text-muted flex gap-2 text-sm'>
                <CheckCircle2 className='mt-0.5 shrink-0 text-emerald-600' size={15} />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ContentSection>
  )
}

function InfoTile({ icon, lines, title }: { icon: ReactNode; lines: string[]; title: string }) {
  return (
    <div className='rounded-xl bg-slate-50 p-4'>
      <div className='text-primary flex items-center gap-2'>
        {icon}
        <p className='text-ink text-sm font-bold'>{title}</p>
      </div>
      <div className='text-muted mt-2 space-y-1 text-xs'>
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}

function AvailabilitySection({
  calendar,
  isError,
  isLoading,
  onChangeWeek,
  onSelectSlot,
  selectedSlotId,
  weekStart
}: {
  calendar: MentorCalendarViewModel | null
  isError: boolean
  isLoading: boolean
  onChangeWeek: (weekOffset: number) => void
  onSelectSlot: (slotId: string) => void
  selectedSlotId?: string
  weekStart: string
}) {
  return (
    <ContentSection
      id='availability'
      title='Khả dụng và lịch dạy'
      subtitle='Chọn một khung giờ còn trống để cập nhật yêu cầu đặt lịch.'
    >
      <div className='flex items-center justify-between gap-3'>
        <Button size='sm' type='button' variant='outline' onClick={() => onChangeWeek(-1)}>
          <ChevronLeft size={16} />
          Tuần trước
        </Button>
        <p className='text-ink text-center text-sm font-bold'>{formatWeekRange(weekStart)}</p>
        <Button size='sm' type='button' variant='outline' onClick={() => onChangeWeek(1)}>
          Tuần sau
          <ChevronRight size={16} />
        </Button>
      </div>

      {isLoading ? (
        <div className='mt-4 h-48 animate-pulse rounded-xl bg-slate-100' />
      ) : isError ? (
        <div className='mt-4'>
          <InlineEmpty text='Không tải được lịch của mentor trong tuần này.' />
        </div>
      ) : calendar?.dates.length ? (
        <div className='mt-4 grid gap-2 md:grid-cols-7'>
          {calendar.dates.map((date) => (
            <CalendarDayColumn
              key={date.date}
              date={date.date}
              selectedSlotId={selectedSlotId}
              slots={date.slots}
              onSelectSlot={onSelectSlot}
            />
          ))}
        </div>
      ) : (
        <div className='mt-4'>
          <InlineEmpty text='Mentor chưa có khung giờ trống trong tuần này.' />
        </div>
      )}
    </ContentSection>
  )
}

function CalendarDayColumn({
  date,
  onSelectSlot,
  selectedSlotId,
  slots
}: {
  date: string
  onSelectSlot: (slotId: string) => void
  selectedSlotId?: string
  slots: MentorCalendarSlotViewModel[]
}) {
  return (
    <div className='overflow-hidden rounded-xl border border-slate-200 bg-slate-50'>
      <div className='border-b border-slate-200 bg-white px-2 py-2 text-center'>
        <p className='text-ink text-xs font-bold'>{formatCalendarDayLabel(date)}</p>
      </div>
      <div className='min-h-28 space-y-2 p-2'>
        {slots.length ? (
          slots.map((slot) => {
            const selected = slot.id === selectedSlotId

            return (
              <button
                key={slot.id}
                className={cn(
                  'w-full rounded-lg border px-2 py-2 text-center text-xs font-semibold transition',
                  selected
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-400'
                )}
                type='button'
                onClick={() => onSelectSlot(slot.id)}
              >
                {formatTimeLabel(slot.startTime)}-{formatTimeLabel(slot.endTime)}
              </button>
            )
          })
        ) : (
          <p className='pt-3 text-center text-xs text-slate-400'>Không có lịch</p>
        )}
      </div>
    </div>
  )
}

function ReviewsSection({ mentor }: { mentor: MentorProfileViewModel }) {
  return (
    <ContentSection id='reviews' title='Đánh giá'>
      {mentor.reviews.length ? (
        <div className='space-y-4'>
          {mentor.reviews.map((review) => (
            <div
              key={review.name}
              className='border-t border-slate-200 pt-4 first:border-0 first:pt-0'
            >
              <p className='text-ink font-bold'>{review.name}</p>
              <p className='mt-1 text-sm text-amber-500'>{'★'.repeat(Math.round(review.rating))}</p>
              <p className='text-muted mt-2 text-sm'>{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5'>
          <p className='text-ink text-sm font-bold'>Chưa có đánh giá</p>
          <p className='text-muted mt-1 text-sm'>
            Đánh giá sẽ xuất hiện sau khi học viên hoàn thành buổi học.
          </p>
        </div>
      )}
    </ContentSection>
  )
}

function InlineEmpty({ text }: { text: string }) {
  return <p className='text-muted rounded-xl bg-slate-50 p-4 text-sm'>{text}</p>
}

function ProfileSkeleton() {
  return (
    <div className='animate-pulse space-y-5'>
      <div className='h-44 rounded-2xl bg-slate-100' />
      <div className='grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]'>
        <div className='space-y-5'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='h-52 rounded-2xl bg-slate-100' />
          ))}
        </div>
        <div className='h-[560px] rounded-2xl bg-slate-100' />
      </div>
    </div>
  )
}

function formatProficiency(value: MentorProfileOffering['proficiency']) {
  if (value === 'BASIC') return 'Cơ bản'
  if (value === 'INTERMEDIATE') return 'Trung cấp'
  if (value === 'ADVANCED') return 'Nâng cao'
  return 'Chuyên sâu'
}

function parseMentorId(value: string | undefined) {
  if (!value) return null
  const parsedValue = Number(value)
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null
}

function getInitialCalendarDiscoveryRange(from: string) {
  return {
    from,
    to: addDaysToIsoDate(from, 30)
  }
}

function getCalendarWeekView(calendar: MentorCalendarViewModel, weekStart: string) {
  const weekEnd = addDaysToIsoDate(weekStart, 6)
  const weekDates = calendar.dates.filter((date) => date.date >= weekStart && date.date <= weekEnd)
  const weekSlots = weekDates.flatMap((date) => date.slots)
  const nearestSlotId = weekSlots.find((slot) => slot.status === 'AVAILABLE')?.id
  const slots = weekSlots.map((slot) => ({
    ...slot,
    isNearestBookable: slot.id === nearestSlotId
  }))

  return {
    ...calendar,
    from: weekStart,
    to: weekEnd,
    dates: weekDates.map((date) => ({
      ...date,
      slots: slots.filter((slot) => slot.date === date.date)
    })),
    slots
  }
}

function getCalendarWeekRange(weekStart: string) {
  return {
    from: weekStart,
    to: addDaysToIsoDate(weekStart, 6)
  }
}

function getWeekStartIso(value: Date | string) {
  const date = typeof value === 'string' ? new Date(`${value}T00:00:00`) : new Date(value)
  const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay()

  date.setDate(date.getDate() - dayOfWeek + 1)

  return toIsoDate(date)
}

function addDaysToIsoDate(value: string, days: number) {
  const date = new Date(`${value}T00:00:00`)

  date.setDate(date.getDate() + days)

  return toIsoDate(date)
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatWeekRange(weekStart: string) {
  const weekEnd = addDaysToIsoDate(weekStart, 6)

  return `${formatShortDate(weekStart)} - ${formatShortDate(weekEnd)}`
}

function formatCalendarDayLabel(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit'
  }).format(date)
}

function formatShortDate(value: string) {
  const date = new Date(`${value}T00:00:00`)

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export default MentorProfile
