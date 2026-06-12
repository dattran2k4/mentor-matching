import axios from 'axios'
import {
  ArrowLeft,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
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
import { useMentorProfileQuery } from '@/hooks/queries/mentor/useMentorProfileQuery'
import {
  formatMeetingTypeLabel,
  formatTimeLabel,
  mapMentorProfileToViewModel,
  type MentorProfileOffering,
  type MentorProfileViewModel
} from '@/routes/mentor-profile.presentation'
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
  const selectedOfferingId = mentor?.offerings.some(
    (offering) => offering.id === selectedOfferingIdState
  )
    ? selectedOfferingIdState
    : (mentor?.offerings.find((offering) => offering.active)?.id ?? mentor?.offerings[0]?.id)

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
          <AvailabilitySection mentor={mentor} />
          <ReviewsSection mentor={mentor} />
        </main>

        <BookingSidebar
          mentor={mentor}
          selectedOfferingId={selectedOfferingId}
          className='lg:col-start-2 lg:row-start-1'
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

function AvailabilitySection({ mentor }: { mentor: MentorProfileViewModel }) {
  return (
    <ContentSection
      id='availability'
      title='Khả dụng và lịch dạy'
      subtitle='Các khung giờ mentor đang mở để học viên cân nhắc trước khi đặt.'
    >
      <div className='grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]'>
        <div className='overflow-hidden rounded-xl border border-slate-200'>
          {mentor.recurringAvailability.length ? (
            mentor.recurringAvailability.map((window) => (
              <div
                key={window.id}
                className='grid grid-cols-[100px_minmax(0,1fr)] border-b border-slate-200 last:border-b-0'
              >
                <div className='bg-slate-50 px-3 py-3 text-sm font-bold'>{window.dayLabel}</div>
                <div className='px-3 py-3'>
                  <Badge variant='info'>
                    {formatTimeLabel(window.startTime)} - {formatTimeLabel(window.endTime)}
                  </Badge>
                  <span className='text-muted ml-2 text-xs'>
                    {window.meetingTypes.map(formatMeetingTypeLabel).join(' / ')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <InlineEmpty text='Chưa có lịch lặp lại hằng tuần.' />
          )}
        </div>

        <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-primary flex items-center gap-2 text-sm font-bold'>
            <CalendarDays size={16} /> Lịch gần nhất
          </p>
          {mentor.specificDateAvailability[0] ? (
            <div className='mt-3 rounded-lg bg-white p-3'>
              <p className='text-ink text-sm font-bold'>
                {mentor.specificDateAvailability[0].dateLabel}
              </p>
              <p className='text-muted mt-1 text-xs'>
                {formatTimeLabel(mentor.specificDateAvailability[0].startTime)} -{' '}
                {formatTimeLabel(mentor.specificDateAvailability[0].endTime)}
              </p>
            </div>
          ) : (
            <p className='text-muted mt-3 text-xs'>Chưa có lịch theo ngày cụ thể.</p>
          )}
        </div>
      </div>
    </ContentSection>
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

export default MentorProfile
