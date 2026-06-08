import { CalendarDays, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'

import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Mentor } from '@/types/models/mentor'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format'

interface BookingSidebarProps {
  mentor: Mentor
  selectedOfferingId?: string
  className?: string
}

const BookingSidebar = ({ className, mentor, selectedOfferingId }: BookingSidebarProps) => {
  const activeOffering =
    mentor.offerings.find((offering) => offering.id === selectedOfferingId) ??
    mentor.offerings.find((offering) => offering.active) ??
    mentor.offerings[0]
  const nextWindows = mentor.specificDateAvailability.slice(0, 2)
  const primaryMeetingType = mentor.meetingTypes[0]

  return (
    <Card
      className={cn(
        'shadow-soft rounded-[28px] border-slate-200/80 lg:sticky lg:top-24',
        className
      )}
    >
      <CardContent className='p-5'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <p className='text-muted text-sm'>Tóm tắt đặt buổi học</p>
            <p className='text-ink mt-1 text-2xl font-semibold'>
              {formatPrice(activeOffering?.pricePerHour ?? mentor.startingPrice)}
            </p>
            <p className='text-muted mt-1 text-xs'>mỗi buổi học 60 phút</p>
          </div>
          <StatusBadge kind='approval' status={mentor.approvalStatus} />
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          <StatusBadge kind='verification' status={mentor.verificationStatus} />
          <Badge variant='muted'>
            {mentor.rating} / 5 từ {mentor.reviewsCount} đánh giá
          </Badge>
        </div>

        <div className='mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-ink text-sm font-semibold'>Môn học đang chọn</p>
            <Badge variant='info'>1 buổi 60 phút</Badge>
          </div>
          <div className='mt-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='text-ink font-semibold'>
                  {activeOffering?.subject} · {activeOffering?.grade}
                </p>
                <p className='text-muted mt-1 text-xs'>{activeOffering?.teachingNote}</p>
                <div className='mt-2 flex flex-wrap gap-2'>
                  <Badge variant='muted'>{activeOffering?.proficiency}</Badge>
                </div>
              </div>
              <span className='text-ink text-sm font-semibold'>
                {formatPrice(activeOffering?.pricePerHour ?? mentor.startingPrice)}
              </span>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {mentor.meetingTypes.map((meetingType) => (
              <Badge
                key={meetingType}
                variant={meetingType === primaryMeetingType ? 'info' : 'outline'}
              >
                {meetingType}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className='my-6' />

        <div className='mt-6'>
          <div className='text-ink flex items-center gap-2 text-sm font-semibold'>
            <CalendarDays size={16} />
            Lịch gần nhất có thể gửi yêu cầu
          </div>
          <div className='mt-3 space-y-2 text-sm'>
            {nextWindows.length ? (
              nextWindows.map((window) => (
                <div
                  key={`${window.dateLabel}-${window.startTime}`}
                  className='rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3'
                >
                  <div className='flex items-center justify-between gap-3'>
                    <p className='text-ink font-semibold'>{window.dateLabel}</p>
                    <span className='text-muted text-xs'>{window.meetingTypes.join(' / ')}</span>
                  </div>
                  <p className='text-muted mt-1 text-xs'>
                    {window.startTime} - {window.endTime}
                    {window.note ? ` · ${window.note}` : ''}
                  </p>
                </div>
              ))
            ) : (
              <div className='rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600'>
                Mentor hiện ưu tiên nhận lịch theo khung giờ lặp lại hằng tuần:{' '}
                {mentor.availabilitySummary}.
              </div>
            )}
          </div>
        </div>

        <div className='mt-6'>
          <div className='text-ink flex items-center gap-2 text-sm font-semibold'>
            <Clock size={16} />
            Khung giờ lặp lại hằng tuần
          </div>
          <div className='mt-3 space-y-2 text-xs'>
            {mentor.recurringAvailability.map((window) => (
              <div
                key={`${window.dayLabel}-${window.startTime}`}
                className='flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-2.5'
              >
                <div>
                  <p className='text-ink text-sm font-semibold'>{window.dayLabel}</p>
                  <p className='text-muted mt-1'>
                    {window.startTime} - {window.endTime}
                  </p>
                </div>
                <Badge variant='muted'>{window.meetingTypes.join(' / ')}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 rounded-2xl bg-slate-50 p-4 text-sm'>
          <p className='text-ink mb-3 font-semibold'>Tóm tắt gửi yêu cầu</p>
          <div className='text-muted flex items-center justify-between'>
            <span>Buổi học dự kiến</span>
            <span>{formatPrice(activeOffering?.pricePerHour ?? mentor.startingPrice)}</span>
          </div>
          <div className='text-muted mt-2 flex items-center justify-between'>
            <span>Môn học</span>
            <span>
              {activeOffering?.subject} · {activeOffering?.grade}
            </span>
          </div>
          <div className='text-muted mt-2 flex items-center justify-between'>
            <span>Hình thức ưu tiên</span>
            <span>{primaryMeetingType}</span>
          </div>
          <div className='text-ink mt-2 flex items-center justify-between font-semibold'>
            <span>Tạm tính</span>
            <span>{formatPrice(activeOffering?.pricePerHour ?? mentor.startingPrice)}</span>
          </div>
        </div>

        <div className='mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm'>
          <div className='flex items-start gap-2'>
            <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' />
            <div>
              <p className='text-ink font-semibold'>Điều gì xảy ra tiếp theo?</p>
              <ul className='text-muted mt-2 space-y-2 leading-relaxed'>
                <li>Chọn đúng offering theo môn học và cấp lớp.</li>
                <li>Tham chiếu lịch gần nhất hoặc khung giờ lặp lại phù hợp.</li>
                <li>Gửi yêu cầu để mentor phản hồi theo tốc độ hiển thị trên hồ sơ.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800'>
          <div className='flex items-start gap-2'>
            <ShieldCheck className='mt-0.5 h-4 w-4 shrink-0' />
            <p>
              Gửi yêu cầu đặt lịch sau khi chọn môn học và thời gian phù hợp. Mentor sẽ phản hồi
              theo tốc độ hiển thị trên hồ sơ.
            </p>
          </div>
        </div>

        <Button className='mt-6 w-full rounded-2xl' size='lg'>
          Đặt buổi học
        </Button>
        <p className='text-muted mt-3 text-center text-xs'>
          Chọn môn học và khung giờ trước khi gửi yêu cầu đặt lịch.
        </p>
      </CardContent>
    </Card>
  )
}

export default BookingSidebar
