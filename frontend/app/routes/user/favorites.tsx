import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Heart, Search, Trash2 } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { path } from '@/config/path'
import { mentors } from '@/constants/mentors'
import { formatPrice } from '@/utils/format'

export function meta() {
  return [{ title: 'Yêu thích | Học viên' }]
}

export default function UserFavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hiddenMentorIds, setHiddenMentorIds] = useState<string[]>([])

  const favoriteMentors = useMemo(
    () =>
      mentors
        .filter((mentor) => mentor.approvalStatus === 'APPROVED')
        .slice(0, 4)
        .filter((mentor) => !hiddenMentorIds.includes(mentor.id)),
    [hiddenMentorIds]
  )

  const filteredMentors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (normalizedQuery.length === 0) {
      return favoriteMentors
    }

    return favoriteMentors.filter((mentor) =>
      [mentor.name, mentor.headline, mentor.subjects.join(' '), mentor.grades.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }, [favoriteMentors, searchQuery])

  return (
    <DashboardPage
      description='Lưu lại các mentor phù hợp để quay lại so sánh, xem lịch phù hợp và tiếp tục đặt buổi học.'
      title='Mentor yêu thích'
    >
      <div className='flex flex-col gap-8'>
        <section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
          <DashboardSectionHeader
            title='Danh sách đã lưu'
            description='Bản Milestone 3 dùng dữ liệu tĩnh để chốt cấu trúc; thao tác bỏ lưu hiện chỉ áp dụng trên giao diện.'
          />

          <div className='mt-5 flex flex-wrap items-center justify-between gap-4'>
            <label className='relative max-w-md flex-1' htmlFor='favorite-search'>
              <Search
                aria-hidden='true'
                className='text-muted absolute top-1/2 left-4 -translate-y-1/2'
                size={18}
              />
              <input
                className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-white py-3 pr-4 pl-12 text-sm shadow-sm focus:ring-2 focus:outline-none'
                id='favorite-search'
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder='Tìm theo tên mentor, môn học hoặc lớp'
                type='text'
                value={searchQuery}
              />
            </label>
            <p className='text-muted text-sm font-medium'>
              Đang hiển thị {filteredMentors.length} mentor
            </p>
          </div>
        </section>

        {filteredMentors.length === 0 ? (
          <EmptyState
            actionHref={path.discover}
            actionLabel='Khám phá mentor'
            description='Hãy thử tìm theo môn học khác hoặc quay lại trang khám phá để lưu thêm mentor phù hợp.'
            icon={<Heart aria-hidden='true' size={24} />}
            title='Chưa có mentor phù hợp trong danh sách lưu'
          />
        ) : (
          <div className='grid gap-5 lg:grid-cols-2'>
            {filteredMentors.map((mentor) => {
              const firstOffering = mentor.offerings[0]

              return (
                <article
                  className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'
                  key={mentor.id}
                >
                  <div className='flex flex-col gap-5'>
                    <div className='flex items-start justify-between gap-4'>
                      <div className='space-y-3'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <h2 className='text-ink text-lg font-semibold'>{mentor.name}</h2>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                        <p className='text-muted text-sm'>{mentor.headline}</p>
                      </div>
                      <button
                        className='rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700'
                        onClick={() =>
                          setHiddenMentorIds((currentIds) => [...currentIds, mentor.id])
                        }
                        type='button'
                      >
                        <Trash2 aria-hidden='true' size={16} />
                        <span className='sr-only'>Bỏ lưu mentor {mentor.name}</span>
                      </button>
                    </div>

                    <div className='grid gap-3 text-sm text-slate-700 sm:grid-cols-2'>
                      <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                        <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                          Môn học phù hợp
                        </p>
                        <p className='mt-2 font-semibold'>
                          {firstOffering.subject} · {firstOffering.grade}
                        </p>
                        <p className='text-muted mt-1'>{firstOffering.teachingNote}</p>
                      </div>
                      <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                        <p className='text-muted text-xs font-semibold tracking-wide uppercase'>
                          Học phí từ
                        </p>
                        <p className='text-ink mt-2 font-semibold'>
                          {formatPrice(mentor.startingPrice)} / giờ
                        </p>
                        <p className='text-muted mt-1'>{mentor.availabilitySummary}</p>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {mentor.highlights.slice(0, 3).map((highlight) => (
                        <span
                          className='rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700'
                          key={highlight}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      <Link
                        className='rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                        to={path.mentorProfile(mentor.id)}
                      >
                        Xem hồ sơ
                      </Link>
                      <Link
                        className='bg-primary rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
                        to={path.mentorProfile(mentor.id)}
                      >
                        Tiếp tục đặt lịch
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </DashboardPage>
  )
}
