import { BadgeCheck, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

import { StatusBadge } from '@/components/StatusBadge'
import { formatPrice, getInitials } from '@/utils/format'

import RatingStars from './RatingStars'
import type { Mentor } from '../types/mentor'

interface MentorCardProps {
  mentor: Mentor
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className='glass-panel card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur'
    >
      <div className='bg-primary/5 pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full transition-transform group-hover:scale-110' />
      <div className='relative z-10 flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div
            className='bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold'
          >
            {getInitials(mentor.name)}
          </div>
          <div>
            <div className='flex items-center gap-2'>
              <h3 className='text-ink text-base font-semibold'>{mentor.name}</h3>
              {mentor.verificationStatus === 'VERIFIED' ? (
                <BadgeCheck className='text-primary h-4 w-4' />
              ) : null}
            </div>
            <p className='text-muted text-xs'>{mentor.headline}</p>
          </div>
        </div>
        <div className='text-right'>
          <p className='text-ink text-sm font-semibold'>{formatPrice(mentor.startingPrice)}</p>
          <p className='text-muted text-xs'>mỗi giờ</p>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        <StatusBadge kind='approval' status={mentor.approvalStatus} />
        <span className='rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600'>
          {mentor.meetingTypes.join(' / ')}
        </span>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <RatingStars rating={mentor.rating} size={14} />
          <span className='text-muted text-xs'>({mentor.reviewsCount})</span>
        </div>
        <div className='text-muted flex items-center gap-3 text-xs'>
          <span className='flex items-center gap-1'>
            <Clock size={14} />
            {mentor.responseTime}
          </span>
          <span className='flex items-center gap-1'>
            <Users size={14} />
            {mentor.activeStudentsCount}
          </span>
        </div>
      </div>

      <p className='text-muted mt-4 text-sm'>{mentor.introduction}</p>

      <p className='text-ink mt-4 text-xs font-semibold'>
        {mentor.subjects.join(', ')} · {mentor.grades.slice(0, 2).join(', ')}
      </p>
      <p className='text-muted mt-1 text-xs'>{mentor.availabilitySummary}</p>

      <div className='mt-5 flex flex-wrap gap-2'>
        {mentor.highlights.map((highlight: string) => (
          <span
            key={highlight}
            className='text-muted rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs shadow-sm'
          >
            {highlight}
          </span>
        ))}
      </div>

      <div className='relative z-10 mt-6 flex items-center gap-3'>
        <Link
          to={`/mentor/${mentor.id}`}
          className='border-primary/30 text-primary hover:bg-primary/5 hover:border-primary flex-1 shrink-0 rounded-full border px-4 py-2.5 text-center text-sm font-semibold transition-all'
        >
          Xem hồ sơ
        </Link>
        <Link
          to={`/mentor/${mentor.id}`}
          className='from-primary to-primary-light shadow-soft hover:shadow-glow flex-1 rounded-full bg-gradient-to-r px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:-translate-y-0.5'
        >
          Đặt buổi học
        </Link>
      </div>
    </motion.article>
  )
}

export default MentorCard
