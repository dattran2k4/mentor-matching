import { CalendarClock, Clock3, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { path } from '@/config/path'
import { formatPrice, getInitials } from '@/utils/format'
import { cn } from '@/utils/cn'

import RatingStars from './RatingStars'

export type MentorCardMeetingType = 'ONLINE' | 'OFFLINE' | 'HYBRID'
export type MentorCardApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
export type MentorCardVerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'
export type MentorCardOfferingProficiency = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

export type MentorCardOffering = {
  id: string
  subject: string
  grade: string
  proficiency: MentorCardOfferingProficiency
  pricePerHour: number
  active: boolean
  teachingNote?: string | null
}

export type MentorCardSpecificDateAvailability = {
  dateLabel: string
  startTime: string
  endTime: string
  meetingTypes: MentorCardMeetingType[]
  note?: string
}

export interface MentorCardData {
  id: string
  name: string
  headline?: string | null
  approvalStatus?: MentorCardApprovalStatus | null
  verificationStatus?: MentorCardVerificationStatus | null
  rating?: number | null
  reviewsCount?: number | null
  responseTime?: string | null
  activeStudentsCount?: number | null
  startingPrice?: number | null
  expertise?: string | null
  highlights?: string[]
  subjects?: string[]
  grades?: string[]
  meetingTypes?: MentorCardMeetingType[]
  availabilitySummary?: string | null
  offerings?: MentorCardOffering[]
  specificDateAvailability?: MentorCardSpecificDateAvailability[]
}

interface MentorCardProps {
  mentor: MentorCardData
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const subjects = mentor.subjects ?? []
  const grades = mentor.grades ?? []
  const meetingTypes = mentor.meetingTypes ?? []
  const offerings = mentor.offerings ?? []
  const highlights = mentor.highlights ?? []
  const specificDateAvailability = mentor.specificDateAvailability ?? []

  const featuredOfferings = offerings.filter((offering) => offering.active).slice(0, 2)
  const gradePreview = grades.slice(0, 2)
  const extraGrades = grades.length - gradePreview.length
  const rating = mentor.rating ?? null
  const reviewsCount = mentor.reviewsCount ?? null
  const responseTime = mentor.responseTime?.trim() || 'Đang cập nhật'
  const activeStudentsCount = mentor.activeStudentsCount ?? null
  const availabilitySummary =
    mentor.availabilitySummary?.trim() || 'Lịch học và khu vực sẽ hiển thị rõ hơn trong hồ sơ.'
  const expertise =
    mentor.expertise?.trim() || 'Thông tin phù hợp và thế mạnh giảng dạy đang được cập nhật.'
  const headline = mentor.headline?.trim() || 'Hồ sơ mentor đang được hoàn thiện thêm.'
  const startingPrice = typeof mentor.startingPrice === 'number' ? mentor.startingPrice : null
  const hasPrice = startingPrice !== null

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }} className='h-full'>
      <Card className='group flex h-full flex-col rounded-3xl border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300'>
        <CardContent className='flex h-full flex-col gap-5 p-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-start gap-4'>
              <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold'>
                {getInitials(mentor.name)}
              </div>
              <div className='min-h-20 space-y-1.5'>
                <h3 className='text-ink text-base font-semibold'>{mentor.name}</h3>
                <p className='text-muted line-clamp-2 min-h-10 text-sm leading-relaxed'>
                  {headline}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {mentor.approvalStatus ? (
                    <StatusBadge kind='approval' status={mentor.approvalStatus} />
                  ) : null}
                  {mentor.verificationStatus ? (
                    <StatusBadge kind='verification' status={mentor.verificationStatus} />
                  ) : null}
                </div>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-muted text-[11px] font-semibold tracking-[0.18em] uppercase'>Từ</p>
              <p className='text-ink text-sm font-semibold'>
                {hasPrice ? formatPrice(startingPrice) : 'Liên hệ'}
              </p>
              <p className='text-muted text-xs'>{hasPrice ? 'mỗi giờ học' : 'để xem học phí'}</p>
            </div>
          </div>

          <div className='flex min-h-16 flex-wrap content-start gap-2'>
            {subjects.map((subject) => (
              <Badge key={subject} variant='default'>
                {subject}
              </Badge>
            ))}
            {gradePreview.map((grade) => (
              <Badge key={grade} variant='muted'>
                {grade}
              </Badge>
            ))}
            {extraGrades > 0 ? <Badge variant='outline'>+{extraGrades} cấp độ khác</Badge> : null}
            {meetingTypes.map((meetingType) => (
              <Badge key={meetingType} variant='outline'>
                {formatMeetingType(meetingType)}
              </Badge>
            ))}
          </div>

          <div className='grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3'>
            <div className='flex min-h-20 flex-col'>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Đánh giá
              </p>
              {rating !== null ? (
                <>
                  <div className='mt-2 flex items-center gap-2'>
                    <RatingStars rating={rating} size={14} />
                    <span className='text-ink text-sm font-semibold'>{rating.toFixed(1)}</span>
                  </div>
                  <p className='text-muted mt-1 text-xs'>
                    {reviewsCount ?? 0} {reviewsCount === 1 ? 'đánh giá' : 'đánh giá'}
                  </p>
                </>
              ) : (
                <>
                  <p className='text-ink mt-2 text-sm font-medium'>Chưa có dữ liệu</p>
                  <p className='text-muted mt-1 text-xs'>
                    Đánh giá công khai sẽ hiển thị khi sẵn sàng
                  </p>
                </>
              )}
            </div>
            <div className='flex min-h-20 flex-col'>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Phản hồi
              </p>
              <p className='text-ink mt-2 flex items-center gap-1.5 text-sm font-medium'>
                <Clock3 size={14} className='text-slate-500' />
                {responseTime}
              </p>
              <p className='text-muted mt-1 text-xs'>Tốc độ xác nhận tin nhắn và lịch học</p>
            </div>
            <div className='flex min-h-20 flex-col'>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Học viên
              </p>
              <p className='text-ink mt-2 flex items-center gap-1.5 text-sm font-medium'>
                <Users size={14} className='text-slate-500' />
                {activeStudentsCount !== null
                  ? `${activeStudentsCount} đang theo học`
                  : 'Đang cập nhật'}
              </p>
              <p className='text-muted mt-1 text-xs'>Tín hiệu phù hợp với nhu cầu phổ biến</p>
            </div>
          </div>

          <div className='min-h-32 rounded-2xl border border-slate-200 bg-white p-4'>
            <p className='text-ink text-[11px] font-semibold tracking-[0.2em] uppercase'>
              Phù hợp nếu bạn đang cần
            </p>
            <p className='text-muted mt-2 line-clamp-3 text-sm leading-relaxed'>{expertise}</p>
            <div className='mt-3 flex items-start gap-2 text-xs text-slate-600'>
              <ShieldCheck size={14} className='text-primary mt-0.5 shrink-0' />
              <span>{availabilitySummary}</span>
            </div>
          </div>

          <div className='min-h-52'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-ink text-sm font-semibold'>Offering nổi bật</p>
              <p className='text-muted text-xs'>So sánh nhanh theo môn, lớp và học phí</p>
            </div>
            <div className='mt-3 space-y-2.5'>
              {featuredOfferings.length ? (
                featuredOfferings.map((offering) => (
                  <div
                    key={offering.id}
                    className='rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition group-hover:border-slate-300'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-ink text-sm font-semibold'>
                          {offering.subject} · {offering.grade}
                        </p>
                        <p className='text-muted mt-1 line-clamp-2 min-h-8 text-xs'>
                          {offering.teachingNote?.trim() ||
                            'Chi tiết offering sẽ hiển thị trong hồ sơ mentor.'}
                        </p>
                      </div>
                      <span className='text-ink shrink-0 text-sm font-semibold'>
                        {formatPrice(offering.pricePerHour)}
                      </span>
                    </div>
                    <div className='mt-3 flex flex-wrap gap-2'>
                      <Badge variant='muted'>{offering.proficiency}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4'>
                  <p className='text-ink text-sm font-semibold'>Offering đang được cập nhật</p>
                  <p className='text-muted mt-1 text-xs leading-relaxed'>
                    Hồ sơ công khai này chưa có danh sách offering chi tiết trong dữ liệu hiện tại.
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className='mt-auto flex min-h-9 flex-wrap content-start gap-2'>
            {highlights.slice(0, 3).map((highlight) => (
              <Badge key={highlight} variant='muted'>
                {highlight}
              </Badge>
            ))}
            {!highlights.length ? (
              <Badge variant='muted'>Hồ sơ đang được cập nhật thêm</Badge>
            ) : null}
            {specificDateAvailability[0] ? (
              <Badge className='gap-1.5' variant='outline'>
                <CalendarClock size={13} />
                Slot gần: {specificDateAvailability[0].dateLabel}
              </Badge>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className='mt-auto flex-col gap-3 p-5 pt-0 sm:flex-row'>
          <Link
            className={cn(
              buttonVariants({ className: 'w-full rounded-xl sm:flex-1', variant: 'outline' })
            )}
            to={path.mentorProfile(mentor.id)}
          >
            Xem hồ sơ
          </Link>
          <Link
            className={cn(buttonVariants({ className: 'w-full rounded-xl sm:flex-1' }))}
            to={path.mentorProfile(mentor.id)}
          >
            Xem lịch và đặt buổi
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MentorCard

function formatMeetingType(meetingType: MentorCardMeetingType) {
  if (meetingType === 'ONLINE') return 'Online'
  if (meetingType === 'OFFLINE') return 'Offline'
  if (meetingType === 'HYBRID') return 'Hybrid'

  return meetingType
}
