import { useMemo, useState } from 'react'
import { AlertTriangle, FileWarning } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import {
  adminReports,
  type AdminReportRecord,
  type AdminReportStatus
} from '@/mocks/admin-workspace'

type ReportFilter = 'ALL' | AdminReportStatus

const reportFilters: Array<{ key: ReportFilter; label: string }> = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'NEW', label: 'Mới' },
  { key: 'IN_REVIEW', label: 'Đang xử lý' },
  { key: 'CLOSED', label: 'Đã đóng' }
]

const matchesReportFilter = (report: AdminReportRecord, filter: ReportFilter) =>
  filter === 'ALL' ? true : report.status === filter

const reportStatusLabelMap: Record<AdminReportStatus, string> = {
  NEW: 'Mới',
  IN_REVIEW: 'Đang xử lý',
  CLOSED: 'Đã đóng'
}

export function meta() {
  return [{ title: 'Báo cáo | Admin' }]
}

export default function AdminReportsPage() {
  const [activeFilter, setActiveFilter] = useState<ReportFilter>('ALL')

  const filteredReports = useMemo(
    () => adminReports.filter((report) => matchesReportFilter(report, activeFilter)),
    [activeFilter]
  )

  const filterCounts = useMemo(
    () =>
      reportFilters.reduce<Record<ReportFilter, number>>(
        (accumulator, filter) => {
          accumulator[filter.key] = adminReports.filter((report) =>
            matchesReportFilter(report, filter.key)
          ).length

          return accumulator
        },
        {} as Record<ReportFilter, number>
      ),
    []
  )

  return (
    <DashboardPage
      description='Giữ khu vực báo cáo trung thực với hiện trạng backend: có hàng đợi đọc và ưu tiên, nhưng chưa giả lập một moderation engine hoàn chỉnh.'
      title='Báo cáo và sự cố'
    >
      <div className='space-y-6'>
        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Trạng thái báo cáo'
            description='Tách báo cáo mới, đang xử lý và đã đóng để admin rà hàng đợi theo mức ưu tiên thay vì đọc một danh sách phẳng.'
          />

          <div className='mt-5 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1'>
            {reportFilters.map((filter) => {
              const isActive = activeFilter === filter.key

              return (
                <button
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive ? 'text-primary bg-white shadow-sm' : 'text-muted hover:text-ink'
                  }`}
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  type='button'
                >
                  {filter.label} ({filterCounts[filter.key]})
                </button>
              )
            })}
          </div>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Hàng đợi báo cáo'
            description='Mỗi mục chỉ mô tả loại vấn đề, thực thể liên quan, mức độ và trạng thái hiện có; thao tác đóng/mở chính thức vẫn chờ workflow backend.'
          />

          {filteredReports.length === 0 ? (
            <div className='mt-6'>
              <EmptyState
                description='Khi có báo cáo hệ thống, khiếu nại học viên hoặc cờ vận hành mới, chúng sẽ hiển thị ở đây theo trạng thái đã chọn.'
                title='Chưa có báo cáo nào'
              />
            </div>
          ) : (
            <div className='mt-6 grid gap-4'>
              {filteredReports.map((report) => (
                <article className='rounded-2xl border border-slate-200 p-5' key={report.id}>
                  <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                    <div className='flex items-start gap-4'>
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                          report.severity === 'HIGH'
                            ? 'bg-red-50 text-red-700'
                            : report.severity === 'MEDIUM'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <FileWarning aria-hidden='true' size={18} />
                      </div>
                      <div className='space-y-3'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <h2 className='text-ink text-lg font-semibold'>{report.title}</h2>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              report.severity === 'HIGH'
                                ? 'bg-red-50 text-red-700'
                                : report.severity === 'MEDIUM'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {report.severity === 'HIGH'
                              ? 'Mức cao'
                              : report.severity === 'MEDIUM'
                                ? 'Mức trung bình'
                                : 'Mức thấp'}
                          </span>
                          <span className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700'>
                            {reportStatusLabelMap[report.status]}
                          </span>
                        </div>

                        <div className='text-muted grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-3'>
                          <p>{report.reportType}</p>
                          <p>{report.relatedEntity}</p>
                          <p>{report.submittedAtLabel}</p>
                        </div>

                        <p className='text-muted text-sm'>{report.summary}</p>
                      </div>
                    </div>

                    <button
                      className='rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                      type='button'
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className='rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm'>
          <div className='flex items-start gap-3'>
            <div className='text-amber-700'>
              <AlertTriangle aria-hidden='true' size={18} />
            </div>
            <div className='space-y-2'>
              <p className='font-semibold text-amber-900'>Ghi chú về mức độ hoàn thiện</p>
              <p className='text-sm text-amber-800'>
                Route này cố ý dừng ở mức triage queue và trạng thái đọc được. Việc phân công, đóng
                báo cáo hoặc ghi log xử lý chi tiết chưa nên được giả lập như tính năng đã có.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardPage>
  )
}
