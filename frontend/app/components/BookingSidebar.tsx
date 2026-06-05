import { CalendarDays, Clock } from 'lucide-react'
import { formatPrice } from '../utils/format'
import type { Mentor } from '../types/mentor'

interface BookingSidebarProps {
  mentor: Mentor
}

const BookingSidebar = ({ mentor }: BookingSidebarProps) => {
  return (
    <div className='shadow-soft sticky top-24 rounded-2xl border border-slate-200 bg-white p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-muted text-sm'>Học phí từ</p>
          <p className='text-ink text-2xl font-semibold'>{formatPrice(mentor.startingPrice)}</p>
        </div>
        <span className='bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold'>
          {mentor.rating} sao
        </span>
      </div>

      <div className='mt-6'>
        <p className='text-muted mb-2 text-xs font-semibold uppercase tracking-wide'>
          Gợi ý môn học
        </p>
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm'>
          <p className='text-ink font-semibold'>
            {mentor.offerings[0]?.subject} · {mentor.offerings[0]?.grade}
          </p>
          <p className='text-muted mt-1 text-xs'>{mentor.offerings[0]?.teachingNote}</p>
        </div>
      </div>

      <div className='mt-6'>
        <div className='text-ink flex items-center gap-2 text-sm font-semibold'>
          <CalendarDays size={16} />
          Tháng 11, 2026
        </div>
        <div className='text-muted mt-3 grid grid-cols-7 gap-2 text-xs'>
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

      <div className='mt-6'>
        <div className='text-ink flex items-center gap-2 text-sm font-semibold'>
          <Clock size={16} />
          Khung giờ có thể học
        </div>
        <div className='mt-3 grid grid-cols-2 gap-2 text-xs'>
          {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
            <button
              key={time}
              className={`rounded-full border px-3 py-2 ${
                time === '02:00 PM'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'text-muted border-slate-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className='mt-6 rounded-2xl bg-slate-50 p-4 text-sm'>
        <div className='text-muted flex items-center justify-between'>
          <span>1 buổi học (60p)</span>
          <span>{formatPrice(mentor.offerings[0]?.pricePerHour ?? mentor.startingPrice)}</span>
        </div>
        <div className='text-ink mt-2 flex items-center justify-between font-semibold'>
          <span>Tạm tính</span>
          <span>{formatPrice(mentor.offerings[0]?.pricePerHour ?? mentor.startingPrice)}</span>
        </div>
      </div>

      <button className='bg-primary shadow-lift mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-2px]'>
        Đặt buổi học
      </button>
      <p className='text-muted mt-3 text-center text-xs'>
        Chọn môn học và khung giờ trước khi gửi yêu cầu đặt lịch.
      </p>
    </div>
  )
}

export default BookingSidebar
