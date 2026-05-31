import RatingStars from './RatingStars'
import type { Testimonial } from '../types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className='shadow-soft flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6'>
      <div>
        <RatingStars rating={testimonial.rating} />
        <p className='text-muted mt-4 text-sm'>{testimonial.text}</p>
      </div>
      <div className='mt-6 flex items-center gap-3'>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.accent} text-sm font-semibold text-white`}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className='text-ink text-sm font-semibold'>{testimonial.name}</p>
          <p className='text-muted text-xs'>{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
