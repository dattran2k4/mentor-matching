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
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { StatusBadge } from '@/components/StatusBadge'
import { path } from '@/config/path'
import {
  mentorUpcomingSessions,
  mentorWorkspaceProfile,
  mentorWorkspaceSummary
} from '@/mocks/mentor-workspace'
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
        {mentorWorkspaceSummary.map((item) => (
          <section
            className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'
            key={item.label}
          >
            <p className='text-muted text-xs font-semibold tracking-wide uppercase'>{item.label}</p>
            <p className='text-ink mt-3 text-3xl font-semibold'>{item.value}</p>
            <p className='text-muted mt-2 text-sm'>{item.helper}</p>
          </section>
        ))}
      </div>

      <div className='grid gap-6 xl:grid-cols-[1.45fr_1fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Buổi dạy sắp tới'
            description='Tách rõ trạng thái booking và thanh toán để biết buổi nào đã chốt, buổi nào mới chỉ đang giữ chỗ.'
            action={
              <Link
                className='text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline'
                to={path.mentorPanel.schedule}
              >
                Mở lịch dạy
                <ArrowRight aria-hidden='true' size={14} />
              </Link>
            }
          />

          <div className='mt-6 space-y-4'>
            {mentorUpcomingSessions.map((session) => (
              <article className='rounded-2xl border border-slate-200 p-4' key={session.id}>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
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

                  <button
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      session.action.variant === 'primary'
                        ? 'bg-primary text-white hover:opacity-90'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                    type='button'
                  >
                    {session.action.label}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Tín hiệu vận hành'
            description='Các nhắc việc ngắn để mentor ưu tiên đúng phần: lịch, học viên và doanh thu.'
          />
          <div className='mt-6 space-y-3'>
            {weeklySignals.map((item) => (
              <div
                className='flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4'
                key={item.label}
              >
                <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                  <item.icon aria-hidden='true' size={20} />
                </div>
                <div className='space-y-1'>
                  <p className='text-ink font-semibold'>{item.label}</p>
                  <p className='text-ink text-lg font-semibold'>{item.value}</p>
                  <p className='text-muted text-sm'>{item.helper}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm'>
            <div className='space-y-2'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='font-semibold text-blue-900'>{mentorWorkspaceProfile.name}</p>
                <StatusBadge kind='approval' status={mentorWorkspaceProfile.approvalStatus} />
                <StatusBadge
                  kind='verification'
                  status={mentorWorkspaceProfile.verificationStatus}
                />
              </div>
              <p className='text-blue-800'>
                Hồ sơ hiện đang đủ điều kiện nhận lịch công khai. Vẫn nên rà soát offerings và ghi
                chú dạy học trước mỗi tuần cao điểm.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Hành động nhanh'
          description='Đi thẳng vào phần mentor thường phải cập nhật nhất trong giai đoạn giao diện tĩnh.'
        />
        <div className='mt-6 grid gap-3 lg:grid-cols-3'>
          {quickActions.map((action) => (
            <Link
              className='hover:border-primary/30 hover:bg-primary/5 rounded-2xl border border-slate-200 p-4 transition'
              key={action.title}
              to={action.href}
            >
              <div className='flex items-start gap-4'>
                <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                  <action.icon aria-hidden='true' size={20} />
                </div>
                <div className='space-y-1'>
                  <p className='text-ink font-semibold'>{action.title}</p>
                  <p className='text-muted text-sm'>{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DashboardPage>
  )
}
