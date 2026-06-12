import axios from 'axios'
import { ArrowLeft, BookOpen, CalendarDays, GraduationCap, Star, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'

import BookingSidebar from '@/components/BookingSidebar'
import { EmptyState } from '@/components/EmptyState'
import { MentorTrustBlock } from '@/components/MentorTrustBlock'
import RatingStars from '@/components/RatingStars'
import { ScreenErrorState } from '@/components/ScreenErrorState'
import SectionTitle from '@/components/SectionTitle'
import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { path } from '@/config/path'
import { useMentorProfileQuery } from '@/hooks/queries/mentor/useMentorProfileQuery'
import {
  type MentorProfileOffering,
  type MentorProfileViewModel,
  formatMeetingTypeLabel,
  formatTimeLabel,
  mapMentorProfileToViewModel
} from '@/routes/mentor-profile.presentation'
import type { ErrorResponse } from '@/types/api/common'
import { formatPrice, getInitials } from '@/utils/format'

function parseMentorId(value: string | undefined) {
  if (!value) return null

  const parsedValue = Number(value)

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null
}

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
      <MentorProfilePageShell>
        <div className='py-8'>
          <EmptyState
            actionHref={path.discover}
            actionLabel='Quay lại danh sách mentor'
            description='Hồ sơ này hiện không có sẵn hoặc chưa đủ điều kiện để hiển thị công khai.'
            title='Không tìm thấy mentor'
          />
        </div>
      </MentorProfilePageShell>
    )
  }

  if (mentorProfileQuery.isLoading) {
    return (
      <MentorProfilePageShell>
        <MentorProfileSkeleton />
      </MentorProfilePageShell>
    )
  }

  if (mentorProfileQuery.isError) {
    return (
      <MentorProfilePageShell>
        <div className='py-8'>
          <ScreenErrorState
            description='Không thể tải hồ sơ mentor lúc này. Vui lòng thử lại để tiếp tục xem thông tin.'
            onRetry={() => {
              void mentorProfileQuery.refetch()
            }}
            title='Chưa tải được hồ sơ mentor'
          />
        </div>
      </MentorProfilePageShell>
    )
  }

  if (!mentor) {
    return null
  }

  return (
    <MentorProfilePageShell>
      <div className='mt-5 space-y-6'>
        <ProfileSummary mentor={mentor} />

        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start'>
          <BookingSidebar
            className='order-1 lg:order-2'
            mentor={mentor}
            selectedOfferingId={selectedOfferingId}
          />

          <div className='order-2 space-y-6 lg:order-1'>
            <OfferingsSection
              mentor={mentor}
              selectedOfferingId={selectedOfferingId}
              onSelectOffering={setSelectedOfferingId}
            />

            <section className='grid gap-6 xl:grid-cols-2'>
              <Card className='rounded-[28px] border-slate-200/80'>
                <CardContent className='p-6'>
                  <SectionTitle size='md' subtitle={mentor.teachingStyle} title='Phong cách dạy' />
                  <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'>
                    <p className='font-semibold text-slate-900'>
                      Cách mentor thường triển khai buổi học
                    </p>
                    <p className='mt-2 leading-relaxed'>{mentor.introduction}</p>
                    {mentor.highlights.length ? (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {mentor.highlights.slice(0, 4).map((highlight) => (
                          <Badge key={highlight} variant='muted'>
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              <MentorTrustBlock mentor={mentor} />
            </section>

            <section className='grid gap-6 xl:grid-cols-2'>
              <Card className='rounded-[28px] border-slate-200/80'>
                <CardContent className='p-6'>
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
                        {mentor.experience.length ? (
                          mentor.experience.map((item) => (
                            <div
                              key={`${item.title}-${item.period}`}
                              className='rounded-2xl border border-slate-200 bg-white p-3'
                            >
                              <p className='text-ink font-semibold'>{item.title}</p>
                              {item.company ? (
                                <p className='text-muted mt-1 text-sm'>{item.company}</p>
                              ) : null}
                              <p className='text-muted mt-1 text-xs'>{item.period}</p>
                            </div>
                          ))
                        ) : (
                          <InfoFallbackCard description='Mentor chưa công khai thêm kinh nghiệm giảng dạy chi tiết trên hồ sơ này.' />
                        )}
                      </div>
                    </div>

                    <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                      <div className='flex items-center gap-2'>
                        <GraduationCap className='text-primary h-4 w-4' />
                        <p className='text-ink font-semibold'>Học vấn</p>
                      </div>
                      <div className='mt-3 space-y-3'>
                        {mentor.education.length ? (
                          mentor.education.map((item) => (
                            <div
                              key={`${item.degree}-${item.school}`}
                              className='rounded-2xl border border-slate-200 bg-white p-3'
                            >
                              <p className='text-ink font-semibold'>{item.degree}</p>
                              <p className='text-muted mt-1 text-sm'>{item.school}</p>
                            </div>
                          ))
                        ) : (
                          <InfoFallbackCard description='Mentor chưa công khai thêm thông tin học vấn hoặc chuyên ngành chi tiết.' />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AvailabilitySection mentor={mentor} />
            </section>

            <ReviewsSection mentor={mentor} />
          </div>
        </div>
      </div>
    </MentorProfilePageShell>
  )
}

function MentorProfilePageShell({ children }: { children: ReactNode }) {
  return (
    <div className='py-6'>
      <div>
        <Link
          to={path.discover}
          className='text-muted hover:text-primary group inline-flex items-center gap-2 text-sm font-semibold transition-colors'
        >
          <ArrowLeft size={16} className='transition-transform group-hover:-translate-x-1' />
          Quay lại tìm mentor
        </Link>
      </div>

      {children}
    </div>
  )
}

type ProfileSummaryProps = {
  mentor: MentorProfileViewModel
}

function ProfileSummary({ mentor }: ProfileSummaryProps) {
  return (
    <Card className='rounded-[32px] border-slate-200/80'>
      <CardContent className='p-6 md:p-8'>
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
                {mentor.approvalStatus ? (
                  <StatusBadge kind='approval' status={mentor.approvalStatus} />
                ) : (
                  <Badge variant='muted'>Trạng thái duyệt chưa được công khai</Badge>
                )}
                {mentor.verificationStatus ? (
                  <StatusBadge kind='verification' status={mentor.verificationStatus} />
                ) : (
                  <Badge variant='outline'>Trạng thái xác minh chưa được công khai</Badge>
                )}
                {mentor.meetingTypes.map((meetingType) => (
                  <Badge key={meetingType} variant='outline'>
                    {formatMeetingTypeLabel(meetingType)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-3 md:min-w-[320px]'>
            <SummaryStat
              icon={<Star className='h-4 w-4 text-amber-500' />}
              label='Đánh giá'
              value={mentor.rating !== null ? `${mentor.rating.toFixed(1)} / 5` : 'Chưa có dữ liệu'}
            />
            <SummaryStat
              icon={<Users className='h-4 w-4 text-blue-600' />}
              label='Học viên đang học'
              value={
                mentor.activeStudentsCount !== null
                  ? String(mentor.activeStudentsCount)
                  : 'Đang cập nhật'
              }
            />
            <SummaryStat
              icon={<CalendarDays className='h-4 w-4 text-emerald-600' />}
              label='Phản hồi'
              value={mentor.responseTime || 'Chưa công khai'}
            />
          </div>
        </div>

        <div className='mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5'>
          <p className='text-ink text-sm font-semibold'>Giới thiệu ngắn</p>
          <p className='text-muted mt-2 text-sm leading-relaxed'>{mentor.introduction}</p>
        </div>
      </CardContent>
    </Card>
  )
}

type OfferingsSectionProps = {
  mentor: MentorProfileViewModel
  selectedOfferingId?: string
  onSelectOffering: (offeringId: string) => void
}

function OfferingsSection({ mentor, onSelectOffering, selectedOfferingId }: OfferingsSectionProps) {
  return (
    <Card className='rounded-[28px] border-slate-200/80'>
      <CardContent className='p-6'>
        <SectionTitle
          size='md'
          subtitle='Chọn đúng môn học và cấp lớp để phần đặt buổi học bám sát nhu cầu thực tế của người học.'
          title='Môn học và học phí'
        />
        <div className='mt-5 space-y-4'>
          {mentor.offerings.length ? (
            mentor.offerings.map((offering) => (
              <OfferingCard
                key={offering.id}
                offering={offering}
                meetingTypes={mentor.meetingTypes}
                isSelected={offering.id === selectedOfferingId}
                onSelect={onSelectOffering}
              />
            ))
          ) : (
            <InfoFallbackCard description='Mentor chưa công khai offering theo môn học hoặc học phí trên endpoint hiện tại.' />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

type AvailabilitySectionProps = {
  mentor: MentorProfileViewModel
}

function AvailabilitySection({ mentor }: AvailabilitySectionProps) {
  return (
    <Card className='rounded-[28px] border-slate-200/80'>
      <CardContent className='p-6'>
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
              {mentor.recurringAvailability.length ? (
                mentor.recurringAvailability.map((window) => (
                  <div key={window.id} className='rounded-2xl bg-white p-3'>
                    <p className='text-ink text-sm font-semibold'>{window.dayLabel}</p>
                    <p className='text-muted mt-1 text-xs'>
                      {formatTimeLabel(window.startTime)} - {formatTimeLabel(window.endTime)}
                    </p>
                    <p className='text-muted mt-1 text-xs'>
                      {window.meetingTypes.map(formatMeetingTypeLabel).join(' / ') ||
                        'Đang cập nhật'}
                    </p>
                  </div>
                ))
              ) : (
                <InfoFallbackCard description='Mentor chưa công khai khung giờ lặp lại trên backend hiện tại.' />
              )}
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <div className='flex items-center gap-2'>
              <CalendarDays className='text-primary h-4 w-4' />
              <p className='text-ink font-semibold'>Lịch gần nhất</p>
            </div>
            <div className='mt-3 space-y-3'>
              {mentor.specificDateAvailability.length ? (
                mentor.specificDateAvailability.map((window) => (
                  <div key={window.id} className='rounded-2xl bg-white p-3'>
                    <p className='text-ink text-sm font-semibold'>{window.dateLabel}</p>
                    <p className='text-muted mt-1 text-xs'>
                      {formatTimeLabel(window.startTime)} - {formatTimeLabel(window.endTime)}
                    </p>
                    <p className='text-muted mt-1 text-xs'>
                      {window.meetingTypes.map(formatMeetingTypeLabel).join(' / ') ||
                        'Đang cập nhật'}
                      {window.note ? ` · ${window.note}` : ''}
                    </p>
                  </div>
                ))
              ) : (
                <InfoFallbackCard description='Mentor chưa công khai lịch theo ngày cụ thể để gửi booking trực tiếp.' />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type ReviewsSectionProps = {
  mentor: MentorProfileViewModel
}

function ReviewsSection({ mentor }: ReviewsSectionProps) {
  return (
    <Card className='rounded-[28px] border-slate-200/80'>
      <CardContent className='p-6'>
        <SectionTitle
          size='md'
          subtitle={
            mentor.reviewsCount !== null
              ? `${mentor.reviewsCount} đánh giá từ học viên và phụ huynh`
              : 'Đánh giá công khai sẽ hiển thị khi backend cung cấp endpoint phù hợp.'
          }
          title='Đánh giá'
        />
        <div className='mt-5'>
          {mentor.reviews.length ? (
            <div className='grid gap-4 xl:grid-cols-2'>
              {mentor.reviews.map((review) => (
                <div
                  key={review.name}
                  className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                >
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
                        <Badge key={tag} variant='outline'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
              <p className='text-ink text-sm font-semibold'>Đánh giá đang được cập nhật</p>
              <p className='text-muted mt-2 text-sm leading-relaxed'>
                {mentor.reviewsUnavailableReason}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
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
  offering: MentorProfileOffering
  meetingTypes: MentorProfileViewModel['meetingTypes']
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
            <Badge variant='outline'>{offering.proficiency}</Badge>
            {meetingTypes.length ? (
              <Badge variant='outline'>
                {meetingTypes.map(formatMeetingTypeLabel).join(' / ')}
              </Badge>
            ) : null}
          </div>
        </div>
        <div className='flex flex-col gap-3 md:items-end'>
          <div className='text-left md:text-right'>
            <p className='text-ink text-lg font-semibold'>{formatPrice(offering.pricePerHour)}</p>
            <p className='text-muted text-xs'>mỗi buổi 60 phút</p>
          </div>
          <Button
            type='button'
            onClick={() => onSelect(offering.id)}
            className='rounded-2xl'
            variant={isSelected ? 'default' : 'outline'}
          >
            {isSelected ? 'Đang chọn' : 'Chọn buổi học này'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function InfoFallbackCard({ description }: { description: string }) {
  return (
    <div className='rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600'>
      {description}
    </div>
  )
}

function MentorProfileSkeleton() {
  return (
    <div className='mt-5 space-y-6'>
      <Card className='rounded-[32px] border-slate-200/80'>
        <CardContent className='p-6 md:p-8'>
          <div className='animate-pulse space-y-6'>
            <div className='flex flex-col gap-6 md:flex-row md:justify-between'>
              <div className='flex items-start gap-4'>
                <div className='h-16 w-16 rounded-2xl bg-slate-200' />
                <div className='space-y-3'>
                  <div className='h-8 w-56 rounded-full bg-slate-200' />
                  <div className='h-4 w-72 rounded-full bg-slate-100' />
                  <div className='flex flex-wrap gap-2'>
                    <div className='h-7 w-36 rounded-full bg-slate-100' />
                    <div className='h-7 w-36 rounded-full bg-slate-100' />
                  </div>
                </div>
              </div>
              <div className='grid gap-3 sm:grid-cols-3 md:min-w-[320px]'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className='h-20 rounded-2xl bg-slate-100' />
                ))}
              </div>
            </div>
            <div className='h-28 rounded-3xl bg-slate-100' />
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start'>
        <Card className='order-1 rounded-[28px] border-slate-200/80 lg:order-2'>
          <CardContent className='p-5'>
            <div className='animate-pulse space-y-4'>
              <div className='h-20 rounded-2xl bg-slate-100' />
              <div className='h-48 rounded-2xl bg-slate-100' />
              <div className='h-40 rounded-2xl bg-slate-100' />
              <div className='h-12 rounded-2xl bg-slate-100' />
            </div>
          </CardContent>
        </Card>

        <div className='order-2 space-y-6 lg:order-1'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className='rounded-[28px] border-slate-200/80'>
              <CardContent className='p-6'>
                <div className='animate-pulse space-y-4'>
                  <div className='h-6 w-40 rounded-full bg-slate-200' />
                  <div className='h-4 w-72 rounded-full bg-slate-100' />
                  <div className='h-32 rounded-2xl bg-slate-100' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MentorProfile
