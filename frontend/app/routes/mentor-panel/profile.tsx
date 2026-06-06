import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { BadgeCheck, BookOpenText, Clock3, ShieldCheck, Star } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { StatusBadge } from '@/components/StatusBadge'
import {
  mentorOfferingSummaries,
  mentorProfileChecklist,
  mentorProfileHighlights,
  mentorTeachingContent,
  mentorWorkspaceProfile,
  proficiencyLabelMap
} from '@/mocks/mentor-workspace'
import { formatPrice } from '@/utils/format'

type MentorProfileDraft = {
  headline: string
  introduction: string
  teachingStyle: string
}

const initialDraft: MentorProfileDraft = {
  headline: mentorWorkspaceProfile.headline,
  introduction: mentorWorkspaceProfile.introduction,
  teachingStyle: mentorWorkspaceProfile.teachingStyle
}

export function meta() {
  return [{ title: 'Hồ sơ mentor | Mentor' }]
}

export default function MentorProfilePage() {
  const [formValues, setFormValues] = useState(initialDraft)
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const completedCount = useMemo(
    () => mentorProfileChecklist.filter((item) => item.done).length,
    []
  )

  const handleFieldChange =
    (field: keyof MentorProfileDraft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsDraftSaved(false)
      setFormValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value
      }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsDraftSaved(true)
  }

  return (
    <DashboardPage
      description='Ưu tiên offerings, nội dung dạy học, duyệt hồ sơ và tín hiệu tin cậy để phụ huynh có thể đặt lịch với đủ ngữ cảnh.'
      title='Hồ sơ mentor'
    >
      <div className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
        <div className='space-y-6'>
          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Trạng thái công khai'
              description='Hiển thị riêng approval và verification để học viên hiểu hồ sơ đã sẵn sàng ở mức nào.'
            />
            <div className='mt-5 flex flex-wrap items-center gap-3'>
              <StatusBadge kind='approval' status={mentorWorkspaceProfile.approvalStatus} />
              <StatusBadge kind='verification' status={mentorWorkspaceProfile.verificationStatus} />
              <span className='text-muted text-sm'>
                {mentorWorkspaceProfile.rating}/5 từ {mentorWorkspaceProfile.reviewsCount} đánh giá
              </span>
            </div>
            <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <p className='text-ink text-lg font-semibold'>{mentorWorkspaceProfile.name}</p>
              <p className='text-muted mt-1 text-sm'>{mentorWorkspaceProfile.expertise}</p>
              <p className='text-muted mt-3 text-sm'>{mentorWorkspaceProfile.responseTime}</p>
            </div>
          </section>

          <form
            className='space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
            onSubmit={handleSubmit}
          >
            <section className='space-y-4'>
              <DashboardSectionHeader
                title='Giới thiệu công khai'
                description='Giữ headline ngắn, intro rõ đối tượng học viên và teaching style đủ cụ thể để phụ huynh hiểu cách bạn dạy.'
              />
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Headline</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('headline')}
                  type='text'
                  value={formValues.headline}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Giới thiệu</span>
                <textarea
                  className='focus:ring-primary/20 min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('introduction')}
                  value={formValues.introduction}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Phong cách dạy</span>
                <textarea
                  className='focus:ring-primary/20 min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('teachingStyle')}
                  value={formValues.teachingStyle}
                />
              </label>
            </section>

            <section className='space-y-4 border-t border-slate-100 pt-6'>
              <DashboardSectionHeader
                title='Offerings đang mở'
                description='Pricing, subject và grade là phần học viên dùng để so sánh nhanh trước khi đặt lịch.'
              />
              <div className='space-y-3'>
                {mentorOfferingSummaries.map((offering) => (
                  <article className='rounded-2xl border border-slate-200 p-4' key={offering.id}>
                    <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
                      <div className='space-y-2'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='text-ink font-semibold'>{offering.label}</p>
                          <span className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700'>
                            {proficiencyLabelMap[offering.proficiency]}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              offering.active
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {offering.active ? 'Đang nhận lịch' : 'Tạm ẩn'}
                          </span>
                        </div>
                        <p className='text-muted text-sm'>{offering.teachingNote}</p>
                      </div>
                      <p className='text-ink text-lg font-semibold'>
                        {formatPrice(offering.pricePerHour)}/giờ
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className='flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-muted text-sm'>
                Milestone 4 chỉ lưu nháp cục bộ để chốt bố cục profile. Kết nối chỉnh sửa thật sẽ
                làm sau khi API mentor profile ổn định.
              </p>
              <button
                className='bg-primary rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'
                type='submit'
              >
                Lưu nháp hồ sơ
              </button>
            </div>
          </form>
        </div>

        <aside className='space-y-6'>
          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Mức độ sẵn sàng'
              description='Checklist này giữ profile tập trung vào đúng phần ảnh hưởng đến việc đặt lịch.'
            />
            <div className='mt-5 space-y-3'>
              <p className='text-ink text-3xl font-semibold'>
                {completedCount}/{mentorProfileChecklist.length}
              </p>
              {mentorProfileChecklist.map((item) => (
                <div
                  className='flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <div className='space-y-1'>
                    <p className='text-sm font-medium text-slate-800'>{item.label}</p>
                    <p className='text-muted text-xs'>{item.helper}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.done ? 'Đã có' : 'Cần bổ sung'}
                  </span>
                </div>
              ))}
            </div>
            {isDraftSaved ? (
              <p className='mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800'>
                Đã lưu nháp cục bộ cho bố cục hiện tại. Dữ liệu chưa được đồng bộ lên backend.
              </p>
            ) : null}
          </section>

          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Teaching content'
              description='Giữ kỳ vọng học viên rõ ràng về cách buổi học diễn ra trước, trong và sau mỗi session.'
            />
            <div className='mt-5 space-y-3'>
              {mentorTeachingContent.map((item, index) => {
                const icons = [BookOpenText, Clock3, BadgeCheck] as const
                const Icon = icons[index] ?? BookOpenText

                return (
                  <article
                    className='rounded-2xl border border-slate-200 bg-slate-50 p-4'
                    key={item.title}
                  >
                    <div className='flex items-start gap-3'>
                      <div className='bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl'>
                        <Icon aria-hidden='true' size={18} />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-ink font-semibold'>{item.title}</p>
                        <p className='text-muted text-sm'>{item.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Trust và đánh giá'
              description='Giữ tín hiệu tin cậy luôn gần khu vực chỉnh sửa hồ sơ để tránh bỏ quên.'
            />
            <div className='mt-5 space-y-4'>
              <div className='flex flex-wrap items-center gap-2'>
                <div className='inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700'>
                  <Star aria-hidden='true' size={14} />
                  {mentorWorkspaceProfile.rating}/5
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700'>
                  <ShieldCheck aria-hidden='true' size={14} />
                  {mentorWorkspaceProfile.activeStudentsCount} học viên đã từng học
                </div>
              </div>
              <ul className='space-y-2 text-sm text-slate-700'>
                {mentorProfileHighlights.map((item) => (
                  <li
                    className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </DashboardPage>
  )
}
