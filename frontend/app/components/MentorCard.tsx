import { Clock3, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
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
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className='h-full'>
      <Card className='group shadow-soft flex h-full flex-col rounded-3xl'>
        <CardContent className='flex h-full flex-col p-6'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-4'>
              <div className='bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold'>
                {getInitials(mentor.name)}
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='text-ink text-base font-semibold'>{mentor.name}</h3>
                </div>
                <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-ink text-sm font-semibold'>{formatPrice(mentor.startingPrice)}</p>
              <p className='text-muted text-xs'>từ 60 phút</p>
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <StatusBadge kind='approval' status={mentor.approvalStatus} />
            <StatusBadge kind='verification' status={mentor.verificationStatus} />
          </div>

          <div className='mt-4 flex items-center justify-between border-b border-slate-100 pb-4'>
            <div className='flex items-center gap-2'>
              <RatingStars rating={mentor.rating} size={14} />
              <span className='text-muted text-xs'>{mentor.reviewsCount} đánh giá</span>
            </div>
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
          </div>

          <div className='mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-ink text-xs font-semibold tracking-[0.18em] uppercase'>
              Phù hợp nếu bạn đang cần
            </p>
            <p className='text-muted mt-2 text-sm leading-relaxed'>{mentor.expertise}</p>
          </div>

          <div className='mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-ink text-xs font-semibold tracking-[0.18em] uppercase'>
              Môn học phù hợp
            </p>
            <div className='mt-3 space-y-3'>
              {featuredOfferings.map((offering) => (
                <div key={offering.id} className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-ink text-sm font-semibold'>
                      {offering.subject} · {offering.grade}
                    </p>
                    <p className='text-muted mt-1 text-xs'>{offering.proficiency}</p>
                    <p className='text-muted mt-1 text-xs'>{offering.teachingNote}</p>
                  </div>
                  <span className='text-ink shrink-0 text-sm font-semibold'>
                    {formatPrice(offering.pricePerHour)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {mentor.meetingTypes.map((meetingType) => (
              <Badge key={meetingType} variant='outline'>
                {meetingType}
              </Badge>
            ))}
            <Badge className='gap-1' variant='info'>
              <ShieldCheck size={13} />
              {mentor.availabilitySummary}
            </Badge>
          </div>

          <div className='mt-5 flex flex-wrap gap-2'>
            {mentor.highlights.map((highlight) => (
              <Badge key={highlight} variant='muted'>
                {highlight}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className='mt-auto gap-3 p-6 pt-0'>
          <Link
            className={cn(buttonVariants({ className: 'flex-1 rounded-2xl', variant: 'outline' }))}
            to={path.mentorProfile(mentor.id)}
          >
            Xem hồ sơ
          </Link>
          <Link
            className={cn(buttonVariants({ className: 'flex-1 rounded-2xl' }))}
            to={path.mentorProfile(mentor.id)}
          >
            Đặt buổi học
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MentorCard
