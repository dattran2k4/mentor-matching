import { BookOpenText, CalendarDays, MessageSquareMore, Search, Users } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { StatusBadge } from '@/components/StatusBadge'
import { mentorStudents } from '@/mocks/mentor-workspace'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

export function meta() {
  return [{ title: 'Học viên | Mentor' }]
}

export default function MentorStudentsPage() {
  const activeStudents = mentorStudents.filter(
    (student) => student.bookingStatus === 'CONFIRMED' || student.bookingStatus === 'PENDING'
  )

  return (
    <DashboardPage
      description='Theo dõi học viên dựa trên buổi học đã đặt, mục tiêu học tập và bước tiếp theo cần chốt.'
      title='Học viên'
    >
      <div className='grid gap-4 lg:grid-cols-3'>
        <section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
          <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
            Học viên đang theo học
          </p>
          <p className='text-ink mt-3 text-3xl font-semibold'>{activeStudents.length}</p>
          <p className='text-muted mt-2 text-sm'>
            Tính theo các booking đã xác nhận hoặc đang chờ giữ chỗ.
          </p>
        </section>
        <section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
          <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
            Học viên mới trong tuần
          </p>
          <p className='text-ink mt-3 text-3xl font-semibold'>1</p>
          <p className='text-muted mt-2 text-sm'>
            Gia Hân vừa tạo buổi đầu tiên, cần xác nhận thanh toán để chốt tài liệu.
          </p>
        </section>
        <section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
          <p className='text-muted text-xs font-semibold tracking-wide uppercase'>Lưu ý dữ liệu</p>
          <p className='text-ink mt-3 text-lg font-semibold'>Tĩnh theo milestone</p>
          <p className='text-muted mt-2 text-sm'>
            Lịch sử nhắn tin và progress note sâu hơn vẫn là placeholder cho đến khi backend hỗ trợ
            đầy đủ.
          </p>
        </section>
      </div>

      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Danh sách học viên'
          description='Nhìn theo mối quan hệ booking thực, không phải danh bạ chung. Mỗi dòng cần cho bạn biết buổi gần nhất và bước tiếp theo.'
          action={
            <label className='relative block w-full max-w-sm' htmlFor='mentor-student-search'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <input
                className='focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm transition focus:ring-2 focus:outline-none'
                id='mentor-student-search'
                placeholder='Tìm kiếm sẽ nối dữ liệu ở milestone tích hợp'
                readOnly
                type='search'
                value=''
              />
            </label>
          }
        />

        <div className='mt-6 space-y-4'>
          {mentorStudents.map((student) => (
            <article className='rounded-2xl border border-slate-200 p-4' key={student.id}>
              <div className='flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between'>
                <div className='space-y-3'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <p className='text-ink font-semibold'>{student.studentName}</p>
                    <StatusBadge kind='booking' status={student.bookingStatus} />
                  </div>
                  <p className='text-muted text-sm'>{student.learnerGoal}</p>
                  <div className='grid gap-2 text-sm text-slate-700 md:grid-cols-2'>
                    <p className='flex items-center gap-2'>
                      <BookOpenText aria-hidden='true' className='text-primary' size={15} />
                      {student.recentOffering}
                    </p>
                    <p className='flex items-center gap-2'>
                      <Users aria-hidden='true' className='text-primary' size={15} />
                      {student.bookingCount} buổi đã ghi nhận
                    </p>
                    {student.nextSession ? (
                      <>
                        <p className='flex items-center gap-2'>
                          <CalendarDays aria-hidden='true' className='text-primary' size={15} />
                          {formatShortBookingDate(student.nextSession.bookingDate)}
                        </p>
                        <p className='flex items-center gap-2'>
                          <CalendarDays aria-hidden='true' className='text-primary' size={15} />
                          {formatTimeRange(
                            student.nextSession.startTime,
                            student.nextSession.endTime
                          )}
                        </p>
                      </>
                    ) : null}
                  </div>
                  <p className='text-muted text-sm'>{student.recentSummary}</p>
                </div>

                <div className='flex min-w-[220px] flex-col gap-3'>
                  <button
                    className='bg-primary rounded-xl px-4 py-3 text-sm font-semibold text-white hover:opacity-90'
                    type='button'
                  >
                    Xem chi tiết buổi học
                  </button>
                  <button
                    className='rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50'
                    type='button'
                  >
                    Ghi chú nội bộ
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Ghi chú triển khai'
          description='Giữ màn hình trung thực với phạm vi backend hiện tại để không hứa quá nhiều chức năng.'
        />
        <div className='mt-6 grid gap-3 lg:grid-cols-3'>
          {[
            'Màn hình này đang ưu tiên quan hệ học viên qua bookings, chưa mở nhắn tin realtime.',
            'Progress note sâu hơn nên chỉ bật khi có backend lưu ghi chú hoặc timeline học tập.',
            'Các nút chi tiết hiện đóng vai trò giữ bố cục hành động cho milestone tích hợp dữ liệu.'
          ].map((item) => (
            <div
              className='rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'
              key={item}
            >
              <div className='flex items-start gap-3'>
                <MessageSquareMore aria-hidden='true' className='mt-0.5 text-blue-600' size={18} />
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardPage>
  )
}
