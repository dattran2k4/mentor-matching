import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ExternalLink,
  Filter,
  GraduationCap,
  Search,
  ShieldCheck,
  Users,
  XCircle
} from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import type { MentorApprovalStatus, MentorVerificationStatus } from '@/types/mentor'
import { getInitials } from '@/utils/format'

type PendingMentorReview = {
  mentorId: string
  mentorName: string
  headline: string
  submittedAtLabel: string
  approvalStatus: MentorApprovalStatus
  verificationStatus: MentorVerificationStatus
  offeringsSummary: string
  experienceSummary: string
  approvalNote?: string
}

type ActiveMentorSummary = {
  mentorId: string
  mentorName: string
  headline: string
  approvalStatus: MentorApprovalStatus
  verificationStatus: MentorVerificationStatus
  ratingLabel: string
  activeStudentsCount: number
  offeringsSummary: string
}

const pendingMentors: PendingMentorReview[] = [
  {
    mentorId: 'mentor-pending-1',
    mentorName: 'Nguyễn Văn Nam',
    headline: 'Mentor Toán THPT và ôn thi tốt nghiệp',
    submittedAtLabel: '2 giờ trước',
    approvalStatus: 'PENDING',
    verificationStatus: 'PENDING',
    offeringsSummary: 'Toán lớp 11-12 · 300k/giờ',
    experienceSummary: '5 năm dạy kèm cá nhân'
  },
  {
    mentorId: 'mentor-pending-2',
    mentorName: 'Trần Thị Thu',
    headline: 'Mentor Tiếng Anh THCS, luyện giao tiếp',
    submittedAtLabel: '5 giờ trước',
    approvalStatus: 'PENDING',
    verificationStatus: 'VERIFIED',
    offeringsSummary: 'Tiếng Anh lớp 6-9 · 260k/giờ',
    experienceSummary: 'Cựu trợ giảng trung tâm Anh ngữ',
    approvalNote: 'Đã đủ giấy tờ, cần rà lại video giới thiệu.'
  }
]

const activeMentors: ActiveMentorSummary[] = [
  {
    mentorId: 'mentor-1',
    mentorName: 'Nguyễn Minh Anh',
    headline: 'Mentor Toán THCS, luyện nền tảng và ôn thi chuyển cấp',
    approvalStatus: 'APPROVED',
    verificationStatus: 'VERIFIED',
    ratingLabel: '4.9/5',
    activeStudentsCount: 45,
    offeringsSummary: 'Toán lớp 8-9 · 280k/giờ'
  },
  {
    mentorId: 'mentor-2',
    mentorName: 'Trần Quốc Huy',
    headline: 'Mentor Tiếng Anh giao tiếp và IELTS nền tảng',
    approvalStatus: 'APPROVED',
    verificationStatus: 'VERIFIED',
    ratingLabel: '5.0/5',
    activeStudentsCount: 28,
    offeringsSummary: 'IELTS Foundation · 320k/giờ'
  }
]

export function meta() {
  return [{ title: 'Mentor | Admin' }]
}

export default function AdminMentorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredActiveMentors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (normalizedQuery.length === 0) {
      return activeMentors
    }

    return activeMentors.filter((mentor) => {
      return (
        mentor.mentorName.toLowerCase().includes(normalizedQuery) ||
        mentor.offeringsSummary.toLowerCase().includes(normalizedQuery) ||
        mentor.headline.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [searchQuery])

  return (
    <DashboardPage
      description='Duyệt hồ sơ mentor mới, theo dõi xác minh và giữ trải nghiệm học tập trên sàn luôn đáng tin cậy.'
      title='Quản lý mentor'
    >
      <div className='space-y-8'>
        <section className='space-y-4'>
          <div className='flex items-start gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700'>
              <ShieldCheck aria-hidden='true' size={20} />
            </div>
            <div>
              <h2 className='text-ink text-xl font-semibold'>Hồ sơ chờ duyệt</h2>
              <p className='text-muted text-sm'>
                Ưu tiên kiểm tra xác minh, môn học đăng ký và ghi chú trước khi mentor xuất hiện công khai.
              </p>
            </div>
          </div>

          {pendingMentors.length === 0 ? (
            <EmptyState
              description='Khi có hồ sơ mentor mới gửi lên, hàng chờ xét duyệt sẽ xuất hiện tại đây.'
              title='Không có hồ sơ cần duyệt'
            />
          ) : (
            <div className='grid gap-4'>
              {pendingMentors.map((mentor, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className='rounded-3xl border border-amber-200 bg-white p-5 shadow-sm'
                  initial={{ opacity: 0, y: 10 }}
                  key={mentor.mentorId}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className='flex flex-col gap-5 xl:flex-row xl:items-start'>
                    <div className='bg-amber-100 text-amber-700 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold'>
                      {getInitials(mentor.mentorName)}
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div>
                          <h3 className='text-ink text-lg font-semibold'>{mentor.mentorName}</h3>
                          <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                      </div>

                      <div className='text-muted mt-4 grid gap-2 text-sm md:grid-cols-3'>
                        <p>{mentor.offeringsSummary}</p>
                        <p>{mentor.experienceSummary}</p>
                        <p>Gửi hồ sơ {mentor.submittedAtLabel}</p>
                      </div>

                      {mentor.approvalNote ? (
                        <p className='mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600'>
                          Ghi chú duyệt: {mentor.approvalNote}
                        </p>
                      ) : null}
                    </div>

                    <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 xl:border-t-0 xl:pt-0'>
                      <button
                        className='inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5'
                        type='button'
                      >
                        <CheckCircle2 aria-hidden='true' size={16} />
                        Duyệt
                      </button>
                      <button
                        className='inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50'
                        type='button'
                      >
                        <XCircle aria-hidden='true' size={16} />
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
                </motion.article>
              ))}
            </div>
          )}
        </section>

        <section className='space-y-4 border-t border-slate-100 pt-8'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
            <div className='flex items-start gap-3'>
              <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl'>
                <GraduationCap aria-hidden='true' size={20} />
              </div>
              <div>
                <h2 className='text-ink text-xl font-semibold'>Mentor đang hoạt động</h2>
                <p className='text-muted text-sm'>
                  Theo dõi nhanh trạng thái phê duyệt, xác minh và nhóm mentor đang có học viên.
                </p>
              </div>
            </div>

            <div className='flex w-full flex-wrap items-center gap-3 lg:w-auto'>
              <label className='relative min-w-[260px] flex-1 lg:flex-none' htmlFor='admin-mentor-search'>
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
                Bộ lọc
              </button>
            </div>
          </div>

          {filteredActiveMentors.length === 0 ? (
            <EmptyState
              description='Hãy thử đổi từ khóa tìm kiếm hoặc mở rộng bộ lọc trạng thái để xem nhiều mentor hơn.'
              title='Không tìm thấy mentor phù hợp'
            />
          ) : (
            <div className='grid gap-4'>
              {filteredActiveMentors.map((mentor, index) => (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'
                  initial={{ opacity: 0, y: 10 }}
                  key={mentor.mentorId}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className='flex flex-col gap-5 xl:flex-row xl:items-center'>
                    <div className='bg-primary/10 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold'>
                      {getInitials(mentor.mentorName)}
                    </div>

                    <div className='min-w-0 flex-1'>
                      <div className='flex flex-wrap items-start justify-between gap-3'>
                        <div>
                          <h3 className='text-ink text-lg font-semibold'>{mentor.mentorName}</h3>
                          <p className='text-muted mt-1 text-sm'>{mentor.headline}</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          <StatusBadge kind='approval' status={mentor.approvalStatus} />
                          <StatusBadge kind='verification' status={mentor.verificationStatus} />
                        </div>
                      </div>

                      <div className='text-muted mt-4 grid gap-2 text-sm md:grid-cols-3'>
                        <p>{mentor.offeringsSummary}</p>
                        <p>{mentor.ratingLabel} đánh giá</p>
                        <p className='inline-flex items-center gap-2'>
                          <Users aria-hidden='true' size={14} />
                          {mentor.activeStudentsCount} học viên đang học
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 xl:border-t-0 xl:pt-0'>
                      <button
                        className='rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                        type='button'
                      >
                        Xem hồ sơ
                      </button>
                      <button
                        className='rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5'
                        type='button'
                      >
                        Tạm dừng
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardPage>
  )
}
