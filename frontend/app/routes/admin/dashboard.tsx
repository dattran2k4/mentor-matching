import { Link } from 'react-router'
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  FileWarning,
  Settings2,
  ShieldCheck,
  Users
} from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { path } from '@/config/path'
import { adminDashboardSummary, adminQueueItems, adminReports } from '@/mocks/admin-workspace'

const quickLinks = [
  {
    title: 'Mở hàng duyệt mentor',
    description: 'Đi thẳng đến các hồ sơ cần chốt duyệt hoặc từ chối.',
    href: path.admin.mentors,
    icon: BookOpenCheck
  },
  {
    title: 'Rà soát người dùng',
    description: 'Kiểm tra tài khoản mentor, học viên và phụ huynh cần theo dõi.',
    href: path.admin.users,
    icon: Users
  },
  {
    title: 'Kiểm tra cài đặt vận hành',
    description: 'Xem các nhóm cấu hình đang có quy ước và phần nào còn chờ backend.',
    href: path.admin.settings,
    icon: Settings2
  }
] as const

const systemHealth = [
  {
    label: 'Hàng đợi duyệt mentor',
    value: 'Ổn định',
    helper: 'Đang còn 6 hồ sơ, trong đó 2 hồ sơ cần xử lý ngay trong hôm nay.'
  },
  {
    label: 'Báo cáo người dùng',
    value: 'Cần chú ý',
    helper: 'Có một báo cáo mức cao mới gửi, nên ưu tiên kiểm tra trước các việc theo dõi khác.'
  },
  {
    label: 'Thiết lập vận hành',
    value: 'Một phần thủ công',
    helper: 'Reports và payment operations vẫn cần backend rõ hơn trước khi mở cấu hình trực tiếp.'
  }
] as const

export function meta() {
  return [{ title: 'Tổng quan | Admin' }]
}

export default function AdminDashboardPage() {
  const highlightedReports = adminReports.filter((report) => report.status !== 'CLOSED').slice(0, 2)

  return (
    <DashboardPage
      description='Ưu tiên hàng chờ duyệt, báo cáo mở và các tín hiệu vận hành ảnh hưởng trực tiếp đến marketplace.'
      title='Tổng quan Admin'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Cần xử lý hôm nay'
          description='Đưa các đầu việc cần quyết định lên trước metric để admin biết nên mở màn hình nào ngay.'
          action={
            <Link
              className='text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline'
              to={path.admin.mentors}
            >
              Mở duyệt mentor
              <ArrowRight aria-hidden='true' size={14} />
            </Link>
          }
        />

        {adminQueueItems.length === 0 ? (
          <div className='mt-6'>
            <EmptyState
              description='Khi không còn hồ sơ mentor nào chờ xử lý, phần tổng quan sẽ chuyển sang tập trung vào báo cáo và theo dõi hệ thống.'
              title='Không có mục cần xử lý gấp'
            />
          </div>
        ) : (
          <div className='mt-6 grid gap-4'>
            {adminQueueItems.map((item) => (
              <article className='rounded-2xl border border-slate-200 p-4' key={item.id}>
                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                  <div className='space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <h2 className='text-ink text-lg font-semibold'>{item.mentorName}</h2>
                      <StatusBadge kind='approval' status={item.approvalStatus} />
                      <StatusBadge kind='verification' status={item.verificationStatus} />
                    </div>
                    <p className='text-muted text-sm'>{item.headline}</p>
                    <div className='text-muted grid gap-2 text-sm md:grid-cols-2'>
                      <p>{item.offeringsSummary}</p>
                      <p>Gửi hồ sơ {item.submittedAtLabel}</p>
                    </div>
                    <p className='rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                      {item.note}
                    </p>
                  </div>

                  <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0'>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.priority === 'high'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {item.priority === 'high' ? 'Ưu tiên cao' : 'Theo dõi'}
                    </span>
                    <Link
                      className='bg-primary inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90'
                      to={path.admin.mentors}
                    >
                      Rà soát hồ sơ
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className='grid gap-4 xl:grid-cols-4'>
        {adminDashboardSummary.map((item) => (
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

      <div className='grid gap-6 xl:grid-cols-[1.3fr_1fr]'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Báo cáo và cờ vận hành'
            description='Giữ màn hình này trung thực: chỉ hiển thị hàng đợi và bối cảnh xử lý, chưa giả lập moderation workflow đầy đủ.'
            action={
              <Link
                className='text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline'
                to={path.admin.reports}
              >
                Xem tất cả báo cáo
                <ArrowRight aria-hidden='true' size={14} />
              </Link>
            }
          />

          <div className='mt-6 space-y-4'>
            {highlightedReports.map((report) => (
              <article className='rounded-2xl border border-slate-200 p-4' key={report.id}>
                <div className='flex items-start gap-4'>
                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-700'>
                    <FileWarning aria-hidden='true' size={20} />
                  </div>
                  <div className='min-w-0 flex-1 space-y-2'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='text-ink font-semibold'>{report.title}</p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          report.severity === 'HIGH'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {report.severity === 'HIGH' ? 'Mức cao' : 'Mức trung bình'}
                      </span>
                    </div>
                    <p className='text-muted text-sm'>
                      {report.reportType} · {report.relatedEntity} · {report.submittedAtLabel}
                    </p>
                    <p className='text-muted text-sm'>{report.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='space-y-6'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Tình trạng vận hành'
              description='Các tín hiệu ngắn giúp admin biết phần nào đang ổn, phần nào còn cần thao tác thủ công.'
            />

            <div className='mt-6 space-y-3'>
              {systemHealth.map((item) => (
                <div
                  className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                  key={item.label}
                >
                  <div className='flex items-start gap-3'>
                    <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl'>
                      <ShieldCheck aria-hidden='true' size={18} />
                    </div>
                    <div className='space-y-1'>
                      <p className='text-ink font-semibold'>{item.label}</p>
                      <p className='text-ink text-sm font-semibold'>{item.value}</p>
                      <p className='text-muted text-sm'>{item.helper}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm'>
            <div className='flex items-start gap-3'>
              <div className='text-amber-700'>
                <AlertTriangle aria-hidden='true' size={18} />
              </div>
              <div className='space-y-2'>
                <p className='font-semibold text-amber-900'>Lưu ý ở giai đoạn UI tĩnh</p>
                <p className='text-sm text-amber-800'>
                  Reports và settings mới mô tả hàng đợi, quy ước vận hành và phạm vi backend hiện
                  có. Chúng chưa đại diện cho workflow moderation hoặc cấu hình hệ thống hoàn chỉnh.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <DashboardSectionHeader
          title='Đi nhanh tới màn hình cần dùng'
          description='Giữ điều hướng admin thực dụng: mentor, users, reports và settings đều có entry point rõ ràng.'
        />

        <div className='mt-6 grid gap-3 lg:grid-cols-3'>
          {quickLinks.map((item) => (
            <Link
              className='hover:border-primary/30 hover:bg-primary/5 rounded-2xl border border-slate-200 p-4 transition'
              key={item.title}
              to={item.href}
            >
              <div className='flex items-start gap-4'>
                <div className='bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
                  <item.icon aria-hidden='true' size={20} />
                </div>
                <div className='space-y-1'>
                  <p className='text-ink font-semibold'>{item.title}</p>
                  <p className='text-muted text-sm'>{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DashboardPage>
  )
}
