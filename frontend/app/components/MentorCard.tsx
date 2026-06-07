import { CalendarClock, Clock3, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { path } from '@/config/path'
import type { Mentor } from '@/types/mentor'
import { formatPrice, getInitials } from '@/utils/format'
import { cn } from '@/utils/cn'

import RatingStars from './RatingStars'

interface MentorCardProps {
  mentor: Mentor
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const featuredOfferings = mentor.offerings.filter((offering) => offering.active).slice(0, 2)
  const gradePreview = mentor.grades.slice(0, 2)
  const extraGrades = mentor.grades.length - gradePreview.length

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }} className='h-full'>
      <Card className='group flex h-full flex-col rounded-3xl border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300'>
        <CardContent className='flex h-full flex-col gap-5 p-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-start gap-4'>
              <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold'>
                {getInitials(mentor.name)}
              </div>
              <div className='space-y-1.5'>
                <h3 className='text-ink text-base font-semibold'>{mentor.name}</h3>
                <p className='text-muted line-clamp-2 text-sm leading-relaxed'>{mentor.headline}</p>
                <div className='flex flex-wrap gap-2'>
                  <StatusBadge kind='approval' status={mentor.approvalStatus} />
                  <StatusBadge kind='verification' status={mentor.verificationStatus} />
                </div>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-muted text-[11px] font-semibold tracking-[0.18em] uppercase'>Từ</p>
              <p className='text-ink text-sm font-semibold'>{formatPrice(mentor.startingPrice)}</p>
              <p className='text-muted text-xs'>mỗi giờ học</p>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {mentor.subjects.map((subject) => (
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
            {mentor.meetingTypes.map((meetingType) => (
              <Badge key={meetingType} variant='outline'>
                {formatMeetingType(meetingType)}
              </Badge>
            ))}
          </div>

          <div className='grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3'>
            <div>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Đánh giá
              </p>
              <div className='mt-2 flex items-center gap-2'>
                <RatingStars rating={mentor.rating} size={14} />
                <span className='text-ink text-sm font-semibold'>{mentor.rating.toFixed(1)}</span>
              </div>
              <p className='text-muted mt-1 text-xs'>{mentor.reviewsCount} đánh giá</p>
            </div>
            <div>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Phản hồi
              </p>
              <p className='text-ink mt-2 flex items-center gap-1.5 text-sm font-medium'>
                <Clock3 size={14} className='text-slate-500' />
                {mentor.responseTime}
              </p>
              <p className='text-muted mt-1 text-xs'>Tốc độ xác nhận tin nhắn và lịch học</p>
            </div>
            <div>
              <p className='text-muted text-[11px] font-semibold tracking-[0.16em] uppercase'>
                Học viên
              </p>
              <p className='text-ink mt-2 flex items-center gap-1.5 text-sm font-medium'>
                <Users size={14} className='text-slate-500' />
                {mentor.activeStudentsCount} đang theo học
              </p>
              <p className='text-muted mt-1 text-xs'>Tín hiệu phù hợp với nhu cầu phổ biến</p>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-4'>
            <p className='text-ink text-[11px] font-semibold tracking-[0.2em] uppercase'>
              Phù hợp nếu bạn đang cần
            </p>
            <p className='text-muted mt-2 text-sm leading-relaxed'>{mentor.expertise}</p>
            <div className='mt-3 flex items-start gap-2 text-xs text-slate-600'>
              <ShieldCheck size={14} className='text-primary mt-0.5 shrink-0' />
              <span>{mentor.availabilitySummary}</span>
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-ink text-sm font-semibold'>Offering nổi bật</p>
              <p className='text-muted text-xs'>So sánh nhanh theo môn, lớp và học phí</p>
            </div>
            <div className='mt-3 space-y-2.5'>
              {featuredOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className='rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition group-hover:border-slate-300'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-ink text-sm font-semibold'>
                        {offering.subject} · {offering.grade}
                      </p>
                      <p className='text-muted mt-1 text-xs'>{offering.teachingNote}</p>
                    </div>
                    <span className='text-ink shrink-0 text-sm font-semibold'>
                      {formatPrice(offering.pricePerHour)}
                    </span>
                  </div>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    <Badge variant='muted'>{offering.proficiency}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className='mt-auto flex flex-wrap gap-2'>
            {mentor.highlights.slice(0, 3).map((highlight) => (
              <Badge key={highlight} variant='muted'>
                {highlight}
              </Badge>
            ))}
            {mentor.specificDateAvailability[0] ? (
              <Badge className='gap-1.5' variant='outline'>
                <CalendarClock size={13} />
                Slot gần: {mentor.specificDateAvailability[0].dateLabel}
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

function formatMeetingType(meetingType: Mentor['meetingTypes'][number]) {
  if (meetingType === 'ONLINE') return 'Online'
  if (meetingType === 'OFFLINE') return 'Offline'
  if (meetingType === 'HYBRID') return 'Hybrid'

  return meetingType
}
