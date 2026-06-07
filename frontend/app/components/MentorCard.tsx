import { Clock3, ShieldCheck, Users } from 'lucide-react'
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

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }} className='h-full'>
      <Card className='group shadow-soft flex h-full flex-col rounded-[28px] border-slate-200/80'>
        <CardContent className='flex h-full flex-col p-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold'>
                {getInitials(mentor.name)}
              </div>
              <div className='space-y-1'>
                <h3 className='text-ink text-base font-semibold'>{mentor.name}</h3>
                <p className='text-muted text-sm leading-relaxed'>{mentor.headline}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-ink text-sm font-semibold'>{formatPrice(mentor.startingPrice)}</p>
              <p className='text-muted text-xs'>mỗi buổi 60 phút</p>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <StatusBadge kind='approval' status={mentor.approvalStatus} />
            <StatusBadge kind='verification' status={mentor.verificationStatus} />
            {mentor.meetingTypes.map((meetingType) => (
              <Badge key={meetingType} variant='outline'>
                {meetingType}
              </Badge>
            ))}
          </div>

          <div className='mt-5 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3'>
              <div className='flex items-center gap-2'>
                <RatingStars rating={mentor.rating} size={14} />
                <span className='text-muted text-xs'>{mentor.reviewsCount} đánh giá</span>
              </div>
              <p className='text-muted mt-2 text-xs leading-relaxed'>
                {mentor.activeStudentsCount} học viên đang học cùng mentor này.
              </p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3'>
              <div className='text-muted flex items-center gap-3 text-xs'>
                <span className='flex items-center gap-1'>
                  <Clock3 size={14} />
                  {mentor.responseTime}
                </span>
                <span className='flex items-center gap-1'>
                  <Users size={14} />
                  {mentor.activeStudentsCount} học viên
                </span>
              </div>
              <div className='mt-2 flex items-center gap-1 text-xs text-slate-600'>
                <ShieldCheck size={13} className='text-primary' />
                {mentor.availabilitySummary}
              </div>
            </div>
          </div>

          <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-ink text-[11px] font-semibold tracking-[0.2em] uppercase'>
              Phù hợp nếu bạn đang cần
            </p>
            <p className='text-muted mt-2 text-sm leading-relaxed'>{mentor.expertise}</p>
          </div>

          <div className='mt-5'>
            <div className='flex items-center justify-between gap-3'>
              <p className='text-ink text-sm font-semibold'>Offering nổi bật</p>
              <p className='text-muted text-xs'>So sánh nhanh theo môn, lớp và học phí</p>
            </div>
            <div className='mt-3 space-y-3'>
              {featuredOfferings.map((offering) => (
                <div
                  key={offering.id}
                  className='rounded-2xl border border-slate-200 bg-white p-4 transition group-hover:border-slate-300'
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

          <Separator className='my-5' />

          <div className='mt-auto flex flex-wrap gap-2'>
            {mentor.highlights.map((highlight) => (
              <Badge key={highlight} variant='muted'>
                {highlight}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className='mt-auto flex-col gap-3 p-5 pt-0 sm:flex-row'>
          <Link
            className={cn(
              buttonVariants({ className: 'w-full rounded-2xl sm:flex-1', variant: 'outline' })
            )}
            to={path.mentorProfile(mentor.id)}
          >
            Xem hồ sơ
          </Link>
          <Link
            className={cn(buttonVariants({ className: 'w-full rounded-2xl sm:flex-1' }))}
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
