import { CalendarDays, Clock } from 'lucide-react'
import { formatPrice } from '../utils/format'

const BookingSidebar = ({ mentor }) => {
  return (
    <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">Hourly rate</p>
          <p className="text-2xl font-semibold text-ink">
            {formatPrice(mentor.price)}
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {mentor.rating} rating
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <CalendarDays size={16} />
          November 2026
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2 text-xs text-muted">
          {Array.from({ length: 28 }).map((_, index) => (
            <div
              key={index}
              className={`flex h-8 items-center justify-center rounded-lg ${
                index === 15 ? 'bg-primary text-white' : 'bg-slate-50'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Clock size={16} />
          Available Times
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
            <button
              key={time}
              className={`rounded-full border px-3 py-2 ${
                time === '02:00 PM'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 text-muted'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm">
        <div className="flex items-center justify-between text-muted">
          <span>1 session (60m)</span>
          <span>{formatPrice(mentor.price)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between font-semibold text-ink">
          <span>Total</span>
          <span>{formatPrice(mentor.price)}</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lift transition hover:translate-y-[-2px]">
        Book Now
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        100% satisfaction guarantee
      </p>
    </div>
  )
}

export default BookingSidebar
