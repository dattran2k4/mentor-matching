import { ArrowLeft, BookOpen, CalendarDays, GraduationCap, Star, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

import BookingSidebar from '@/components/BookingSidebar'
import { EmptyState } from '@/components/EmptyState'
import { MentorTrustBlock } from '@/components/MentorTrustBlock'
import RatingStars from '@/components/RatingStars'
import SectionTitle from '@/components/SectionTitle'
import { StatusBadge } from '@/components/StatusBadge'
import { path } from '@/config/path'
import { mentors } from '@/constants/mentors'
import type { Mentor, MentorOffering } from '@/types/mentor'
import { formatPrice, getInitials } from '@/utils/format'

const publicMentors = mentors.filter((mentor) => mentor.approvalStatus === 'APPROVED')

const MentorProfile = () => {
  const { id } = useParams()
  const mentor = publicMentors.find((item) => item.id === id)
  const [selectedOfferingId, setSelectedOfferingId] = useState<string | undefined>(
    mentor?.offerings.find((offering) => offering.active)?.id
  )

  if (!mentor) {
    return (
      <div className='py-8'>
        <EmptyState
          actionHref={path.discover}
          actionLabel='Quay lại danh sách mentor'
          description='Hồ sơ này hiện không có sẵn hoặc chưa đủ điều kiện để hiển thị công khai.'
          title='Không tìm thấy mentor'
        />
      </div>
    )
  }

  return (
    <div className='grid gap-8 py-6 lg:grid-cols-[minmax(0,1.15fr)_360px]'>
      <div className='lg:col-span-2'>
        <Link
          to={path.discover}
          className='text-muted hover:text-primary group inline-flex items-center gap-2 text-sm font-semibold transition-colors'
        >
          <ArrowLeft size={16} className='transition-transform group-hover:-translate-x-1' />
          Quay lại tìm mentor
        </Link>
      </div>

      <div className='space-y-6'>
        <ProfileSummary mentor={mentor} />

        <OfferingsSection
          mentor={mentor}
          selectedOfferingId={selectedOfferingId}
          onSelectOffering={setSelectedOfferingId}
        />

        <section className='grid gap-6 xl:grid-cols-2'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6'>
            <SectionTitle size='md' subtitle={mentor.teachingStyle} title='Phong cách dạy' />
            <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'>
              <p className='font-semibold text-slate-900'>Cách mentor thường triển khai buổi học</p>
              <p className='mt-2 leading-relaxed'>{mentor.introduction}</p>
            </div>
          </div>

          <MentorTrustBlock mentor={mentor} />
        </section>

        <section className='grid gap-6 xl:grid-cols-2'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6'>
            <SectionTitle
              size='md'
              subtitle='Kinh nghiệm và nền tảng đào tạo giúp phụ huynh kiểm tra độ phù hợp nhanh hơn.'
              title='Kinh nghiệm và học vấn'
            />
            <div className='mt-5 space-y-4'>
              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex items-center gap-2'>
                  <BookOpen className='text-primary h-4 w-4' />
                  <p className='text-ink font-semibold'>Kinh nghiệm giảng dạy</p>
                </div>
                <div className='mt-3 space-y-3'>
                  {mentor.experience.map((item) => (
                    <div key={`${item.title}-${item.period}`} className='rounded-2xl bg-white p-3'>
                      <p className='text-ink font-semibold'>{item.title}</p>
                      <p className='text-muted mt-1 text-sm'>{item.company}</p>
                      <p className='text-muted mt-1 text-xs'>{item.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='text-primary h-4 w-4' />
                  <p className='text-ink font-semibold'>Học vấn</p>
                </div>
                <div className='mt-3 space-y-3'>
                  {mentor.education.map((item) => (
                    <div key={`${item.degree}-${item.school}`} className='rounded-2xl bg-white p-3'>
                      <p className='text-ink font-semibold'>{item.degree}</p>
                      <p className='text-muted mt-1 text-sm'>{item.school}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AvailabilitySection mentor={mentor} />
        </section>

        <ReviewsSection mentor={mentor} />
      </div>

      <BookingSidebar mentor={mentor} selectedOfferingId={selectedOfferingId} />
    </div>
  )
}

type ProfileSummaryProps = {
  mentor: Mentor
}

function ProfileSummary({ mentor }: ProfileSummaryProps) {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6 md:p-8'>
      <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
        <div className='flex items-start gap-4'>
          <div className='bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-semibold'>
            {getInitials(mentor.name)}
          </div>
          <div className='space-y-3'>
            <div>
              <h1 className='text-ink text-2xl font-semibold md:text-3xl'>{mentor.name}</h1>
              <p className='text-muted mt-1 text-sm md:text-base'>{mentor.headline}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <StatusBadge kind='approval' status={mentor.approvalStatus} />
              <StatusBadge kind='verification' status={mentor.verificationStatus} />
              {mentor.meetingTypes.map((meetingType) => (
                <span
                  key={meetingType}
                  className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600'
                >
                  {meetingType}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='grid gap-3 sm:grid-cols-3 md:min-w-[320px]'>
          <SummaryStat
            icon={<Star className='h-4 w-4 text-amber-500' />}
            label='Đánh giá'
            value={`${mentor.rating} / 5`}
          />
          <SummaryStat
            icon={<Users className='h-4 w-4 text-blue-600' />}
            label='Học viên đang học'
            value={String(mentor.activeStudentsCount)}
          />
          <SummaryStat
            icon={<CalendarDays className='h-4 w-4 text-emerald-600' />}
            label='Phản hồi'
            value={mentor.responseTime}
          />
        </div>
      </div>

      <div className='mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5'>
        <p className='text-ink text-sm font-semibold'>Giới thiệu ngắn</p>
        <p className='text-muted mt-2 text-sm leading-relaxed'>{mentor.introduction}</p>
      </div>
    </section>
  )
}

type OfferingsSectionProps = {
  mentor: Mentor
  selectedOfferingId?: string
  onSelectOffering: (offeringId: string) => void
}

function OfferingsSection({
  mentor,
  onSelectOffering,
  selectedOfferingId
}: OfferingsSectionProps) {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6'>
      <SectionTitle
        size='md'
        subtitle='Chọn đúng môn học và cấp lớp để phần đặt buổi học bám sát nhu cầu thực tế của người học.'
        title='Môn học và học phí'
      />
      <div className='mt-5 space-y-4'>
        {mentor.offerings.map((offering) => (
          <OfferingCard
            key={offering.id}
            offering={offering}
            meetingTypes={mentor.meetingTypes}
            isSelected={offering.id === selectedOfferingId}
            onSelect={onSelectOffering}
          />
        ))}
      </div>
    </section>
  )
}

type AvailabilitySectionProps = {
  mentor: Mentor
}

function AvailabilitySection({ mentor }: AvailabilitySectionProps) {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6'>
      <SectionTitle
        size='md'
        subtitle='Khung giờ lặp lại và lịch gần nhất giúp ước lượng khả năng đặt buổi đầu.'
        title='Khả dụng đặt lịch'
      />
      <div className='mt-5 grid gap-4 md:grid-cols-2'>
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='flex items-center gap-2'>
            <CalendarDays className='text-primary h-4 w-4' />
            <p className='text-ink font-semibold'>Lặp lại hằng tuần</p>
          </div>
          <div className='mt-3 space-y-3'>
            {mentor.recurringAvailability.map((window) => (
              <div key={`${window.dayLabel}-${window.startTime}`} className='rounded-2xl bg-white p-3'>
                <p className='text-ink text-sm font-semibold'>{window.dayLabel}</p>
                <p className='text-muted mt-1 text-xs'>
                  {window.startTime} - {window.endTime}
                </p>
                <p className='text-muted mt-1 text-xs'>{window.meetingTypes.join(' / ')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='flex items-center gap-2'>
            <CalendarDays className='text-primary h-4 w-4' />
            <p className='text-ink font-semibold'>Lịch gần nhất</p>
          </div>
          <div className='mt-3 space-y-3'>
            {mentor.specificDateAvailability.map((window) => (
              <div key={`${window.dateLabel}-${window.startTime}`} className='rounded-2xl bg-white p-3'>
                <p className='text-ink text-sm font-semibold'>{window.dateLabel}</p>
                <p className='text-muted mt-1 text-xs'>
                  {window.startTime} - {window.endTime}
                </p>
                <p className='text-muted mt-1 text-xs'>
                  {window.meetingTypes.join(' / ')}
                  {window.note ? ` · ${window.note}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type ReviewsSectionProps = {
  mentor: Mentor
}

function ReviewsSection({ mentor }: ReviewsSectionProps) {
  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6'>
      <SectionTitle
        size='md'
        subtitle={`${mentor.reviewsCount} đánh giá từ học viên và phụ huynh`}
        title='Đánh giá'
      />
      <div className='mt-5 grid gap-4 xl:grid-cols-2'>
        {mentor.reviews.map((review) => (
          <div key={review.name} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <div className='flex items-start justify-between gap-3'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold'>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className='text-ink font-semibold'>{review.name}</p>
                  <p className='text-muted text-xs'>Đánh giá sau buổi học đã hoàn thành</p>
                </div>
              </div>
              <RatingStars rating={review.rating} size={15} />
            </div>
            <p className='text-muted mt-4 text-sm leading-relaxed'>{review.text}</p>
            {review.tags?.length ? (
              <div className='mt-4 flex flex-wrap gap-2'>
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

type SummaryStatProps = {
  icon: ReactNode
  label: string
  value: string
}

function SummaryStat({ icon, label, value }: SummaryStatProps) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3'>
      <div className='flex items-center gap-2 text-sm text-slate-600'>
        {icon}
        {label}
      </div>
      <p className='text-ink mt-2 text-lg font-semibold'>{value}</p>
    </div>
  )
}

type OfferingCardProps = {
  offering: MentorOffering
  meetingTypes: Mentor['meetingTypes']
  isSelected: boolean
  onSelect: (offeringId: string) => void
}

function OfferingCard({ isSelected, meetingTypes, offering, onSelect }: OfferingCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        isSelected ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
        <div>
          <p className='text-ink font-semibold'>
            {offering.subject} · {offering.grade}
          </p>
          <p className='text-muted mt-1 text-sm'>{offering.teachingNote}</p>
          <div className='mt-3 flex flex-wrap gap-2'>
            <span className='rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600'>
              {offering.proficiency}
            </span>
            <span className='rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600'>
              {meetingTypes.join(' / ')}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-3 md:items-end'>
          <div className='text-left md:text-right'>
            <p className='text-ink text-lg font-semibold'>{formatPrice(offering.pricePerHour)}</p>
            <p className='text-muted text-xs'>mỗi buổi 60 phút</p>
          </div>
          <button
            type='button'
            onClick={() => onSelect(offering.id)}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              isSelected
                ? 'bg-primary text-white hover:bg-blue-700'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {isSelected ? 'Đang chọn' : 'Chọn buổi học này'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MentorProfile
