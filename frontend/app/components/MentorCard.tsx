import { Clock3, ShieldCheck, Users } from 'lucide-react'
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
  const featuredOfferings = mentor.offerings.filter((offering) => offering.active).slice(0, 2)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className='shadow-soft group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6'
    >
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
          <p className='text-muted text-xs'>mỗi giờ</p>
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

      <p className='text-muted mt-4 text-sm leading-relaxed'>{mentor.introduction}</p>

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
          <span
            key={meetingType}
            className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600'
          >
            {meetingType}
          </span>
        ))}
        <span className='inline-flex items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700'>
          <ShieldCheck size={13} />
          {mentor.availabilitySummary}
        </span>
      </div>

      <div className='mt-5 flex flex-wrap gap-2'>
        {mentor.highlights.map((highlight) => (
          <span
            key={highlight}
            className='text-muted rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs'
          >
            {highlight}
          </span>
        ))}
      </div>

      <div className='mt-6 flex items-center gap-3'>
        <Link
          to={`/mentor/${mentor.id}`}
          className='border-primary/30 text-primary hover:bg-primary/5 hover:border-primary flex-1 shrink-0 rounded-2xl border px-4 py-2.5 text-center text-sm font-semibold transition-all'
        >
          Xem hồ sơ
        </Link>
        <Link
          to={`/mentor/${mentor.id}`}
          className='bg-primary hover:bg-primary-dark flex-1 rounded-2xl px-4 py-2.5 text-center text-sm font-semibold text-white transition-all'
        >
          Đặt buổi học
        </Link>
      </div>
    </motion.article>
  )
}

export default MentorCard
