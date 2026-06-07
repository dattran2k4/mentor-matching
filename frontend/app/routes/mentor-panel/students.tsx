import { BookOpenText, CalendarDays, MessageSquareMore, Search, Users } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceMetricCard } from '@/components/WorkspaceMetricCard'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
        <WorkspaceMetricCard
          helper='Tính theo các booking đã xác nhận hoặc đang chờ giữ chỗ.'
          icon={Users}
          label='Học viên đang theo học'
          value={activeStudents.length}
        />
        <WorkspaceMetricCard
          helper='Gia Hân vừa tạo buổi đầu tiên, cần xác nhận thanh toán để chốt tài liệu.'
          icon={CalendarDays}
          label='Học viên mới trong tuần'
          value='1'
        />
        <WorkspaceMetricCard
          helper='Lịch sử nhắn tin và progress note sâu hơn vẫn là placeholder cho đến khi backend hỗ trợ đầy đủ.'
          icon={MessageSquareMore}
          label='Lưu ý dữ liệu'
          value='Tĩnh theo milestone'
        />
      </div>

      <WorkspacePanel
        title='Danh sách học viên'
        description='Nhìn theo mối quan hệ booking thực, không phải danh bạ chung. Mỗi dòng cần cho bạn biết buổi gần nhất và bước tiếp theo.'
        action={
          <div className='relative w-full max-w-sm'>
            <Search
              aria-hidden='true'
              className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
              size={16}
            />
            <Input
              className='pl-10'
              id='mentor-student-search'
              placeholder='Tìm kiếm sẽ nối dữ liệu ở milestone tích hợp'
              readOnly
              type='search'
              value=''
            />
          </div>
        }
      >
        <div className='space-y-4'>
          {mentorStudents.map((student) => (
            <Card className='rounded-2xl shadow-none' key={student.id}>
              <CardContent className='flex flex-col gap-4 p-4 xl:flex-row xl:items-start xl:justify-between'>
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
                  <Button>Xem chi tiết buổi học</Button>
                  <Button variant='outline'>Ghi chú nội bộ</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </WorkspacePanel>

      <WorkspacePanel
        title='Ghi chú triển khai'
        description='Giữ màn hình trung thực với phạm vi backend hiện tại để không hứa quá nhiều chức năng.'
      >
        <div className='grid gap-3 lg:grid-cols-3'>
          {[
            'Màn hình này đang ưu tiên quan hệ học viên qua bookings, chưa mở nhắn tin realtime.',
            'Progress note sâu hơn nên chỉ bật khi có backend lưu ghi chú hoặc timeline học tập.',
            'Các nút chi tiết hiện đóng vai trò giữ bố cục hành động cho milestone tích hợp dữ liệu.'
          ].map((item) => (
            <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none' key={item}>
              <CardContent className='flex items-start gap-3 p-4 text-sm text-slate-700'>
                <MessageSquareMore aria-hidden='true' className='mt-0.5 text-blue-600' size={18} />
                <p>{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </WorkspacePanel>
    </DashboardPage>
  )
}
