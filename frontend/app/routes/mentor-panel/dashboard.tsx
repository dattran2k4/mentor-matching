import { Link } from 'react-router'
import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  FileText,
  UserRoundCheck,
  Users
} from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceActionCard } from '@/components/WorkspaceActionCard'
import { WorkspaceMetricCard } from '@/components/WorkspaceMetricCard'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { path } from '@/config/path'
import {
  mentorUpcomingSessions,
  mentorWorkspaceProfile,
  mentorWorkspaceSummary
} from '@/mocks/mentor-workspace'
import { cn } from '@/utils/cn'
import { formatShortBookingDate, formatTimeRange } from '@/utils/format'

const quickActions = [
  {
    title: 'Cập nhật lịch dạy',
    description: 'Mở thêm khung giờ lặp lại hoặc thêm buổi tăng cường theo ngày cụ thể.',
    href: path.mentorPanel.schedule,
    icon: CalendarDays
  },
  {
    title: 'Rà soát hồ sơ công khai',
    description: 'Giữ offerings, giới thiệu và trạng thái duyệt rõ ràng trước khi nhận lịch mới.',
    href: path.mentorPanel.profile,
    icon: FileText
  },
  {
    title: 'Theo dõi học viên',
    description: 'Xem ai đang học đều, ai mới đặt buổi đầu và ai cần chốt lịch tiếp theo.',
    href: path.mentorPanel.students,
    icon: Users
  }
] as const

const weeklySignals = [
  {
    label: 'Buổi cần chuẩn bị tài liệu',
    value: '2',
    helper: 'Một buổi ôn kiểm tra và một buổi đầu tiên cần gửi checklist trước.',
    icon: Clock3
  },
  {
    label: 'Học viên mới trong tuần',
    value: '1',
    helper: 'Gia Hân vừa đặt buổi đầu tiên, hiện vẫn đang chờ thanh toán giữ chỗ.',
    icon: UserRoundCheck
  },
  {
    label: 'Thu nhập chờ đối soát',
    value: '4,2 triệu',
    helper: 'Theo dõi riêng với thu nhập đã về để không nhầm availability với doanh thu thực nhận.',
    icon: CircleDollarSign
  }
] as const

export function meta() {
  return [{ title: 'Tổng quan | Mentor' }]
}

export default function MentorDashboardPage() {
  return (
    <DashboardPage
      description='Theo dõi lịch dạy, trạng thái học viên, duyệt hồ sơ và các đầu việc cần xử lý trong tuần.'
      title='Tổng quan'
    >
      <div className='grid gap-4 xl:grid-cols-3'>
        {mentorWorkspaceSummary.map((item, index) => {
          const icons = [CalendarDays, Users, CircleDollarSign] as const

          return (
            <WorkspaceMetricCard
              helper={item.helper}
              icon={icons[index]}
              key={item.label}
              label={item.label}
              value={item.value}
            />
          )
        })}
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.45fr_1fr]'>
        <WorkspacePanel
          title='Buổi dạy sắp tới'
          description='Tách rõ trạng thái booking và thanh toán để biết buổi nào đã chốt, buổi nào mới chỉ đang giữ chỗ.'
          action={
            <Link
              className={cn(buttonVariants({ size: 'sm', variant: 'link' }), 'h-auto px-0')}
              to={path.mentorPanel.schedule}
            >
              Mở lịch dạy
              <ArrowRight aria-hidden='true' size={14} />
            </Link>
          }
        >
          <div className='space-y-4'>
            {mentorUpcomingSessions.map((session) => (
              <Card className='rounded-2xl shadow-none' key={session.id}>
                <CardContent className='flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between'>
                  <div className='space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='text-ink font-semibold'>
                        {session.subject} · {session.grade}
                      </p>
                      <StatusBadge kind='booking' status={session.bookingStatus} />
                      <StatusBadge kind='payment' status={session.paymentStatus} />
                    </div>
                    <p className='text-muted text-sm'>
                      Học viên <span className='text-ink font-medium'>{session.studentName}</span>
                    </p>
                    <div className='text-muted grid gap-2 text-sm md:grid-cols-2'>
                      <p className='flex items-center gap-2'>
                        <CalendarDays aria-hidden='true' className='text-primary' size={15} />
                        {formatShortBookingDate(session.bookingDate)}
                      </p>
                      <p className='flex items-center gap-2'>
                        <Clock3 aria-hidden='true' className='text-primary' size={15} />
                        {formatTimeRange(session.startTime, session.endTime)}
                      </p>
                    </div>
                    <p className='text-muted text-sm'>{session.prepNote}</p>
                  </div>

                  <Button variant={session.action.variant === 'primary' ? 'default' : 'outline'}>
                    {session.action.label}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </WorkspacePanel>

        <div className='space-y-6'>
          <WorkspacePanel
            title='Tín hiệu vận hành'
            description='Các nhắc việc ngắn để mentor ưu tiên đúng phần: lịch, học viên và doanh thu.'
          >
            <div className='grid gap-3'>
              {weeklySignals.map((item) => (
                <WorkspaceMetricCard
                  helper={item.helper}
                  icon={item.icon}
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </WorkspacePanel>

          <WorkspaceNotice
            description='Hồ sơ hiện đang đủ điều kiện nhận lịch công khai. Vẫn nên rà soát offerings và ghi chú dạy học trước mỗi tuần cao điểm.'
            icon={FileText}
            title={`${mentorWorkspaceProfile.name} · hồ sơ đang sẵn sàng`}
            tone='info'
          />
        </div>
      </div>

      <WorkspacePanel
        title='Hành động nhanh'
        description='Đi thẳng vào phần mentor thường phải cập nhật nhất trong giai đoạn giao diện tĩnh.'
      >
        <div className='grid gap-3 lg:grid-cols-3'>
          {quickActions.map((action) => (
            <WorkspaceActionCard
              description={action.description}
              icon={action.icon}
              key={action.title}
              title={action.title}
              to={action.href}
            />
          ))}
        </div>
      </WorkspacePanel>
    </DashboardPage>
  )
}
