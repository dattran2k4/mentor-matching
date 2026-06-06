import { useMemo, useState } from 'react'
import { ExternalLink, Filter, Search, ShieldCheck, Users } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import {
  adminMentorDirectory,
  adminQueueItems,
  type AdminMentorDirectoryItem
} from '@/mocks/admin-workspace'
import { getInitials } from '@/utils/format'

type MentorDirectoryFilter = 'ALL' | 'APPROVED' | 'SUSPENDED'

const mentorDirectoryFilters: Array<{ key: MentorDirectoryFilter; label: string }> = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'APPROVED', label: 'Đã duyệt' },
  { key: 'SUSPENDED', label: 'Tạm dừng' }
]

const matchesDirectoryFilter = (
  mentor: AdminMentorDirectoryItem,
  filter: MentorDirectoryFilter
) => {
  switch (filter) {
    case 'APPROVED':
      return mentor.approvalStatus === 'APPROVED'
    case 'SUSPENDED':
      return mentor.approvalStatus === 'SUSPENDED'
    default:
      return true
  }
}

export function meta() {
  return [{ title: 'Mentor | Admin' }]
}

export default function AdminMentorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [directoryFilter, setDirectoryFilter] = useState<MentorDirectoryFilter>('ALL')

  const filteredMentorDirectory = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return adminMentorDirectory.filter((mentor) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        mentor.mentorName.toLowerCase().includes(normalizedQuery) ||
        mentor.offeringsSummary.toLowerCase().includes(normalizedQuery) ||
        mentor.headline.toLowerCase().includes(normalizedQuery)

      return matchesSearch && matchesDirectoryFilter(mentor, directoryFilter)
    })
  }, [directoryFilter, searchQuery])

  const directoryCounts = useMemo(
    () =>
      mentorDirectoryFilters.reduce<Record<MentorDirectoryFilter, number>>(
        (accumulator, filter) => {
          accumulator[filter.key] = adminMentorDirectory.filter((mentor) =>
            matchesDirectoryFilter(mentor, filter.key)
          ).length

          return accumulator
        },
        {} as Record<MentorDirectoryFilter, number>
      ),
    []
  )

  return (
    <DashboardPage
      description='Tách rõ hàng chờ phê duyệt và danh sách mentor đang hoạt động để admin không trộn lẫn duyệt hồ sơ với vận hành lâu dài.'
      title='Quản lý mentor'
    >
      <div className='space-y-6'>
        <section className='rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Hồ sơ chờ duyệt'
            description='Approval và verification luôn hiển thị tách riêng để admin biết hồ sơ nào thiếu giấy tờ, hồ sơ nào chỉ còn bước quyết định cuối.'
          />

          {adminQueueItems.length === 0 ? (
            <div className='mt-6'>
              <EmptyState
                description='Khi có mentor mới gửi hồ sơ, hàng chờ xét duyệt sẽ xuất hiện tại đây để đội admin xử lý trước khi mentor lên marketplace.'
                title='Không có hồ sơ cần duyệt'
              />
            </div>
          ) : (
            <div className='mt-6 grid gap-4'>
              {adminQueueItems.map((mentor) => (
                <article
                  className='rounded-2xl border border-amber-200 bg-white p-5'
                  key={mentor.id}
                >
                  <div className='flex flex-col gap-5 xl:flex-row xl:items-start'>
                    <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-lg font-semibold text-amber-700'>
                      {getInitials(mentor.mentorName)}
                    </div>

                    <div className='min-w-0 flex-1 space-y-4'>
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div>
                          <h2 className='text-ink text-lg font-semibold'>{mentor.mentorName}</h2>
                          <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                      </div>

                      <div className='text-muted grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-3'>
                        <p>{mentor.offeringsSummary}</p>
                        <p>Gửi hồ sơ {mentor.submittedAtLabel}</p>
                        <p>
                          {mentor.priority === 'high'
                            ? 'Ưu tiên xử lý trong ngày'
                            : 'Cần phản hồi bổ sung'}
                        </p>
                      </div>

                      <p className='rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                        {mentor.note}
                      </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 xl:border-t-0 xl:pt-0'>
                      <button
                        className='bg-primary inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90'
                        type='button'
                      >
                        Duyệt
                      </button>
                      <button
                        className='inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50'
                        type='button'
                      >
                        Từ chối
                      </button>
                      <button
                        className='text-primary inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-50'
                        type='button'
                      >
                        <ExternalLink aria-hidden='true' size={16} />
                        Xem hồ sơ
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <DashboardSectionHeader
            title='Mentor đang hoạt động'
            description='Dùng để rà soát mentor đã lên sàn, tạm dừng hồ sơ khi cần và theo dõi chất lượng hoạt động hiện tại.'
            action={
              <div className='flex flex-wrap items-center gap-2 rounded-2xl bg-slate-100 p-1'>
                {mentorDirectoryFilters.map((filter) => {
                  const isActive = directoryFilter === filter.key

                  return (
                    <button
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        isActive ? 'text-primary bg-white shadow-sm' : 'text-muted hover:text-ink'
                      }`}
                      key={filter.key}
                      onClick={() => setDirectoryFilter(filter.key)}
                      type='button'
                    >
                      {filter.label} ({directoryCounts[filter.key]})
                    </button>
                  )
                })}
              </div>
            }
          />

          <div className='mt-5 flex w-full flex-wrap items-center gap-3'>
            <label className='relative min-w-[260px] flex-1' htmlFor='admin-mentor-search'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-3 -translate-y-1/2'
                size={16}
              />
              <input
                className='focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm transition focus:ring-2 focus:outline-none'
                id='admin-mentor-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo mentor, môn học hoặc headline'
                type='search'
                value={searchQuery}
              />
            </label>
            <button
              className='text-muted inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium'
              type='button'
            >
              <Filter aria-hidden='true' size={16} />
              Bộ lọc mở rộng
            </button>
          </div>

          {filteredMentorDirectory.length === 0 ? (
            <div className='mt-6'>
              <EmptyState
                description='Hãy thử đổi từ khóa hoặc quay lại trạng thái khác để xem thêm mentor phù hợp với hàng duyệt hiện tại.'
                title='Không tìm thấy mentor phù hợp'
              />
            </div>
          ) : (
            <div className='mt-6 grid gap-4'>
              {filteredMentorDirectory.map((mentor) => (
                <article className='rounded-2xl border border-slate-200 p-5' key={mentor.id}>
                  <div className='flex flex-col gap-5 xl:flex-row xl:items-center'>
                    <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold'>
                      {getInitials(mentor.mentorName)}
                    </div>

                    <div className='min-w-0 flex-1 space-y-4'>
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div>
                          <h2 className='text-ink text-lg font-semibold'>{mentor.mentorName}</h2>
                          <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                      </div>

                      <div className='text-muted grid gap-2 text-sm md:grid-cols-2 xl:grid-cols-4'>
                        <p>{mentor.offeringsSummary}</p>
                        <p>{mentor.ratingLabel} đánh giá</p>
                        <p className='inline-flex items-center gap-2'>
                          <Users aria-hidden='true' size={14} />
                          {mentor.activeStudentsCount} học viên đang học
                        </p>
                        <p>{mentor.submittedAtLabel}</p>
                      </div>

                      <p className='rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                        {mentor.reviewNote}
                      </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 xl:border-t-0 xl:pt-0'>
                      <button
                        className='text-primary inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-50'
                        type='button'
                      >
                        <ShieldCheck aria-hidden='true' size={16} />
                        Xem hồ sơ
                      </button>
                      <button
                        className='rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                        type='button'
                      >
                        {mentor.approvalStatus === 'SUSPENDED' ? 'Mở lại' : 'Tạm dừng'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardPage>
  )
}
