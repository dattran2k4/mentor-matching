import RatingStars from './RatingStars'

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div>
        <RatingStars rating={testimonial.rating} />
        <p className="mt-4 text-sm text-muted">{testimonial.text}</p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.accent} text-sm font-semibold text-white`}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
