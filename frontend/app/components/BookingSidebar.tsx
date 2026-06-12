import axios from 'axios'
import { CalendarDays, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import { StatusBadge } from '@/components/StatusBadge'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { path } from '@/config/path'
import { useCurrentUserQuery } from '@/hooks/queries/auth/useCurrentUserQuery'
import { useCreateBookingMutation } from '@/hooks/queries/booking/useCreateBookingMutation'
import type { MentorProfileViewModel } from '@/routes/mentor-profile.presentation'
import { formatMeetingTypeLabel, formatTimeLabel } from '@/routes/mentor-profile.presentation'
import { useAuthStore } from '@/store/auth-store'
import type { ErrorResponse } from '@/types/api/common'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format'

interface BookingSidebarProps {
  mentor: MentorProfileViewModel
  selectedOfferingId?: string
  className?: string
}

function getBookingErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    if (!error.response) return 'Không kết nối được máy chủ để gửi booking.'
    return error.response.data?.message || 'Không thể gửi booking lúc này.'
  }

  return 'Không thể gửi booking lúc này.'
}

const BookingSidebar = ({ className, mentor, selectedOfferingId }: BookingSidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const accessToken = useAuthStore((state) => state.accessToken)
  const currentUserQuery = useCurrentUserQuery()
  const createBookingMutation = useCreateBookingMutation()
  const [selectedSlotIdState, setSelectedSlotId] = useState<string>()

  const activeOffering =
    mentor.offerings.find((offering) => offering.id === selectedOfferingId) ??
    mentor.offerings.find((offering) => offering.active) ??
    mentor.offerings[0]
  const nextWindows = mentor.specificDateAvailability.slice(0, 4)
  const primaryMeetingType = mentor.meetingTypes[0]
  const selectedSlotId = mentor.specificDateAvailability.some(
    (window) => window.id === selectedSlotIdState
  )
    ? selectedSlotIdState
    : mentor.specificDateAvailability[0]?.id
  const selectedSlot = mentor.specificDateAvailability.find(
    (window) => window.id === selectedSlotId
  )
  const redirectTo = `${path.login}?redirectTo=${encodeURIComponent(`${location.pathname}${location.search}`)}`
  const isLoggedIn = Boolean(accessToken)
  const currentUser = currentUserQuery.data
  const isLearner = currentUser?.roles.includes('LEARNER') ?? false
  const canSubmitBooking = Boolean(
    isLoggedIn &&
    isLearner &&
    activeOffering &&
    selectedSlot &&
    mentor.bookableMeetingType &&
    !createBookingMutation.isPending
  )
  const resolvedPrice = activeOffering?.pricePerHour ?? mentor.startingPrice

  const bookingHelpText = useMemo(() => {
    if (!activeOffering) {
      return 'Mentor chưa có offering công khai để tạo booking từ màn này.'
    }

    if (!nextWindows.length) {
      return 'Cần lịch theo ngày cụ thể từ backend để gửi booking trực tiếp từ hồ sơ mentor.'
    }

    if (!mentor.bookableMeetingType) {
      return 'Contract booking hiện chỉ nhận ONLINE hoặc OFFLINE. Hồ sơ này đang trả về hình thức HYBRID nên mình giữ CTA ở trạng thái trung thực.'
    }

    if (!isLoggedIn) {
      return 'Đăng nhập bằng tài khoản learner để gửi yêu cầu đặt lịch.'
    }

    if (currentUserQuery.isLoading) {
      return 'Đang kiểm tra vai trò tài khoản trước khi gửi booking.'
    }

    if (!isLearner) {
      return 'Tài khoản hiện tại không phải learner nên chưa thể gửi booking từ màn này.'
    }

    if (!selectedSlot) {
      return 'Chọn một khung giờ cụ thể trước khi gửi yêu cầu đặt lịch.'
    }

    if (createBookingMutation.isSuccess) {
      return `Yêu cầu đã được gửi với mã booking #${createBookingMutation.data.bookingId}.`
    }

    return 'Chọn offering và khung giờ trước khi gửi yêu cầu đặt lịch.'
  }, [
    activeOffering,
    createBookingMutation.data,
    createBookingMutation.isSuccess,
    currentUserQuery.isLoading,
    isLearner,
    isLoggedIn,
    mentor.bookableMeetingType,
    nextWindows.length,
    selectedSlot
  ])

  const handleCreateBooking = () => {
    if (!activeOffering || !selectedSlot || !mentor.bookableMeetingType) return

    createBookingMutation.mutate(
      {
        mentorId: mentor.mentorId,
        mentorSubjectId: activeOffering.mentorSubjectId,
        bookingDate: selectedSlot.bookingDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        meetingType: mentor.bookableMeetingType
      },
      {
        onSuccess: ({ bookingId }) => {
          void navigate(`${path.user.bookings}?createdBookingId=${bookingId}&bookingCreated=1}`)
        }
      }
    )
  }

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
              {resolvedPrice !== null ? formatPrice(resolvedPrice) : 'Liên hệ'}
            </p>
            <p className='text-muted mt-1 text-xs'>mỗi buổi học 60 phút</p>
          </div>
          {mentor.approvalStatus ? (
            <StatusBadge kind='approval' status={mentor.approvalStatus} />
          ) : (
            <Badge variant='muted'>Duyệt hồ sơ chưa công khai</Badge>
          )}
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {mentor.verificationStatus ? (
            <StatusBadge kind='verification' status={mentor.verificationStatus} />
          ) : (
            <Badge variant='outline'>Xác minh chưa công khai</Badge>
          )}
          <Badge variant='muted'>
            {mentor.rating !== null && mentor.reviewsCount !== null
              ? `${mentor.rating.toFixed(1)} / 5 từ ${mentor.reviewsCount} đánh giá`
              : 'Chưa có dữ liệu đánh giá công khai'}
          </Badge>
        </div>

        <div className='mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-ink text-sm font-semibold'>Môn học đang chọn</p>
            <Badge variant='info'>1 buổi 60 phút</Badge>
          </div>
          <div className='mt-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm'>
            {activeOffering ? (
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-ink font-semibold'>
                    {activeOffering.subject} · {activeOffering.grade}
                  </p>
                  <p className='text-muted mt-1 text-xs'>{activeOffering.teachingNote}</p>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    <Badge variant='muted'>{activeOffering.proficiency}</Badge>
                  </div>
                </div>
                <span className='text-ink text-sm font-semibold'>
                  {formatPrice(activeOffering.pricePerHour)}
                </span>
              </div>
            ) : (
              <p className='text-muted text-xs'>
                Mentor chưa có offering công khai để gửi booking trực tiếp từ sidebar này.
              </p>
            )}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            {mentor.meetingTypes.length ? (
              mentor.meetingTypes.map((meetingType) => (
                <Badge
                  key={meetingType}
                  variant={meetingType === primaryMeetingType ? 'info' : 'outline'}
                >
                  {formatMeetingTypeLabel(meetingType)}
                </Badge>
              ))
            ) : (
              <Badge variant='outline'>Hình thức học đang cập nhật</Badge>
            )}
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
              nextWindows.map((window) => {
                const isSelected = window.id === selectedSlotId

                return (
                  <button
                    key={window.id}
                    className={cn(
                      'w-full rounded-2xl border px-3 py-3 text-left transition',
                      isSelected
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    )}
                    onClick={() => setSelectedSlotId(window.id)}
                    type='button'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <p className='text-ink font-semibold'>{window.dateLabel}</p>
                      <span className='text-muted text-xs'>
                        {window.meetingTypes.map(formatMeetingTypeLabel).join(' / ') ||
                          'Đang cập nhật'}
                      </span>
                    </div>
                    <p className='text-muted mt-1 text-xs'>
                      {formatTimeLabel(window.startTime)} - {formatTimeLabel(window.endTime)}
                      {window.note ? ` · ${window.note}` : ''}
                    </p>
                  </button>
                )
              })
            ) : (
              <div className='rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600'>
                Mentor hiện chưa có lịch theo ngày cụ thể để gửi booking trực tiếp. Tín hiệu khả
                dụng hiện có: {mentor.availabilitySummary}.
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
            {mentor.recurringAvailability.length ? (
              mentor.recurringAvailability.map((window) => (
                <div
                  key={window.id}
                  className='flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-2.5'
                >
                  <div>
                    <p className='text-ink text-sm font-semibold'>{window.dayLabel}</p>
                    <p className='text-muted mt-1'>
                      {formatTimeLabel(window.startTime)} - {formatTimeLabel(window.endTime)}
                    </p>
                  </div>
                  <Badge variant='muted'>
                    {window.meetingTypes.map(formatMeetingTypeLabel).join(' / ') || 'Đang cập nhật'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className='rounded-2xl border border-dashed border-slate-200 px-3 py-3 text-slate-600'>
                Mentor chưa công khai khung giờ lặp lại trên endpoint hiện tại.
              </div>
            )}
          </div>
        </div>

        <div className='mt-6 rounded-2xl bg-slate-50 p-4 text-sm'>
          <p className='text-ink mb-3 font-semibold'>Tóm tắt gửi yêu cầu</p>
          <div className='text-muted flex items-center justify-between'>
            <span>Buổi học dự kiến</span>
            <span>{resolvedPrice !== null ? formatPrice(resolvedPrice) : 'Chưa có'}</span>
          </div>
          <div className='text-muted mt-2 flex items-center justify-between'>
            <span>Môn học</span>
            <span>
              {activeOffering ? `${activeOffering.subject} · ${activeOffering.grade}` : 'Chưa có'}
            </span>
          </div>
          <div className='text-muted mt-2 flex items-center justify-between'>
            <span>Hình thức gửi booking</span>
            <span>
              {mentor.bookableMeetingType
                ? formatMeetingTypeLabel(mentor.bookableMeetingType)
                : 'Chưa hỗ trợ'}
            </span>
          </div>
          <div className='text-muted mt-2 flex items-center justify-between'>
            <span>Khung giờ đang chọn</span>
            <span>
              {selectedSlot
                ? `${selectedSlot.dateLabel} · ${formatTimeLabel(selectedSlot.startTime)}-${formatTimeLabel(selectedSlot.endTime)}`
                : 'Chưa chọn'}
            </span>
          </div>
          <div className='text-ink mt-2 flex items-center justify-between font-semibold'>
            <span>Tạm tính</span>
            <span>{resolvedPrice !== null ? formatPrice(resolvedPrice) : 'Chưa có'}</span>
          </div>
        </div>

        <div className='mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm'>
          <div className='flex items-start gap-2'>
            <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0 text-emerald-600' />
            <div>
              <p className='text-ink font-semibold'>Điều gì xảy ra tiếp theo?</p>
              <ul className='text-muted mt-2 space-y-2 leading-relaxed'>
                <li>Chọn đúng offering theo môn học và cấp lớp.</li>
                <li>Chọn một khung giờ cụ thể nếu backend đã trả về lịch theo ngày.</li>
                <li>Gửi yêu cầu để mentor phản hồi theo quy trình booking hiện có của hệ thống.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800'>
          <div className='flex items-start gap-2'>
            <ShieldCheck className='mt-0.5 h-4 w-4 shrink-0' />
            <p>{bookingHelpText}</p>
          </div>
        </div>

        {createBookingMutation.isError ? (
          <div className='mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
            {getBookingErrorMessage(createBookingMutation.error)}
          </div>
        ) : null}

        {!isLoggedIn ? (
          <Link
            className={cn(buttonVariants({ className: 'mt-6 w-full rounded-2xl', size: 'lg' }))}
            to={redirectTo}
          >
            Đăng nhập để đặt buổi học
          </Link>
        ) : (
          <Button
            className='mt-6 w-full rounded-2xl'
            disabled={!canSubmitBooking}
            isLoading={createBookingMutation.isPending}
            onClick={handleCreateBooking}
            size='lg'
          >
            Gửi yêu cầu đặt lịch
          </Button>
        )}
        <p className='text-muted mt-3 text-center text-xs'>{bookingHelpText}</p>
      </CardContent>
    </Card>
  )
}

export default BookingSidebar
