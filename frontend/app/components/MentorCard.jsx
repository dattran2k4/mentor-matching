import { BadgeCheck, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import RatingStars from './RatingStars'
import { formatPrice } from '../utils/format'

const MentorCard = ({ mentor }) => {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${mentor.accent} text-sm font-semibold text-white`}
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

      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex-1 rounded-full border border-primary px-4 py-2 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          View Profile
        </Link>
        <Link
          to={`/mentor/${mentor.id}`}
          className="flex-1 rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow-lift transition hover:translate-y-[-2px]"
        >
          Book Now
        </Link>
      </div>
    </motion.article>
  )
}

export default MentorCard
