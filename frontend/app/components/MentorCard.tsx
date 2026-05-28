import { BadgeCheck, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import RatingStars from './RatingStars'
import { formatPrice } from '../utils/format'

interface MentorCardProps {
  mentor: any
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur p-6 glass-panel card-hover relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${mentor.accent} text-lg font-bold text-white shadow-md`}
          >
            {mentor.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-ink">{mentor.name}</h3>
              {mentor.verified ? (
                <BadgeCheck className="h-4 w-4 text-primary" />
              ) : null}
            </div>
            <p className="text-xs text-muted">{mentor.role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-ink">
            {formatPrice(mentor.price)}
          </p>
          <p className="text-xs text-muted">per hour</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RatingStars rating={mentor.rating} size={14} />
          <span className="text-xs text-muted">({mentor.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {mentor.responseTime}
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} />
            {mentor.students}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">{mentor.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {mentor.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs text-muted shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 relative z-10">
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex-1 rounded-full border border-primary/30 px-4 py-2.5 text-center text-sm font-semibold text-primary transition-all hover:bg-primary/5 hover:border-primary shrink-0"
        >
          View Profile
        </Link>
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex-1 rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-2.5 text-center text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
        >
          Book Now
        </Link>
      </div>
    </motion.article>
  )
}

export default MentorCard
