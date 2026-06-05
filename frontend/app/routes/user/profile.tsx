import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useState } from 'react'

import { DashboardPage } from '@/components/DashboardPage'
import { DashboardSectionHeader } from '@/components/DashboardSectionHeader'
import { learnerProfileDraft } from '@/constants/learner-workspace'

export function meta() {
  return [{ title: 'Hồ sơ | Học viên' }]
}

export default function UserProfilePage() {
  const [formValues, setFormValues] = useState(learnerProfileDraft)
  const [isDraftSaved, setIsDraftSaved] = useState(false)

  const completionItems = useMemo(
    () => [
      { label: 'Thông tin liên hệ', done: Boolean(formValues.fullName && formValues.phone) },
      { label: 'Bối cảnh học tập', done: Boolean(formValues.schoolName && formValues.grade) },
      { label: 'Mục tiêu học tập', done: formValues.learningGoal.trim().length > 0 }
    ],
    [formValues]
  )

  const completedCount = completionItems.filter((item) => item.done).length

  const handleFieldChange =
    (field: keyof typeof learnerProfileDraft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      description='Giữ hồ sơ học viên rõ ràng để việc ghép mentor, đặt lịch và theo dõi mục tiêu học tập dễ hơn.'
      title='Hồ sơ học viên'
    >
      <div className='grid gap-6 xl:grid-cols-[1.6fr_1fr]'>
        <form
          className='space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          onSubmit={handleSubmit}
        >
          <section className='space-y-4'>
            <DashboardSectionHeader
              title='Tài khoản'
              description='Thông tin cơ bản để mentor và hệ thống liên hệ khi có thay đổi về buổi học.'
            />
            <div className='grid gap-4 md:grid-cols-2'>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Họ và tên</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('fullName')}
                  type='text'
                  value={formValues.fullName}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Email</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('email')}
                  type='email'
                  value={formValues.email}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Số điện thoại</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('phone')}
                  type='tel'
                  value={formValues.phone}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Giới tính</span>
                <select
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('gender')}
                  value={formValues.gender}
                >
                  <option value='Nam'>Nam</option>
                  <option value='Nữ'>Nữ</option>
                  <option value='Khác'>Khác</option>
                </select>
              </label>
            </div>
          </section>

          <section className='space-y-4 border-t border-slate-100 pt-6'>
            <DashboardSectionHeader
              title='Hồ sơ học viên'
              description='Bối cảnh trường lớp giúp mentor chuẩn bị nội dung đúng trình độ và mục tiêu.'
            />
            <div className='grid gap-4 md:grid-cols-2'>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Năm sinh</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('birthYear')}
                  type='text'
                  value={formValues.birthYear}
                />
              </label>
              <label className='space-y-2'>
                <span className='text-ink text-sm font-medium'>Lớp hiện tại</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('grade')}
                  type='text'
                  value={formValues.grade}
                />
              </label>
              <label className='space-y-2 md:col-span-2'>
                <span className='text-ink text-sm font-medium'>Trường / trung tâm</span>
                <input
                  className='focus:ring-primary/20 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                  onChange={handleFieldChange('schoolName')}
                  type='text'
                  value={formValues.schoolName}
                />
              </label>
            </div>
          </section>

          <section className='space-y-4 border-t border-slate-100 pt-6'>
            <DashboardSectionHeader
              title='Mục tiêu học tập'
              description='Mô tả ngắn mục tiêu hiện tại để mentor hiểu rõ vì sao bạn đặt buổi học.'
            />
            <label className='space-y-2'>
              <span className='text-ink text-sm font-medium'>Mục tiêu</span>
              <textarea
                className='focus:ring-primary/20 min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:outline-none'
                onChange={handleFieldChange('learningGoal')}
                value={formValues.learningGoal}
              />
            </label>
          </section>

          <div className='flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-muted text-sm'>
              Milestone 3 lưu nháp cục bộ để chốt trải nghiệm biểu mẫu. Kết nối API sẽ được thêm ở
              milestone tích hợp dữ liệu.
            </p>
            <button
              className='bg-primary rounded-xl px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90'
              type='submit'
            >
              Lưu thông tin
            </button>
          </div>
        </form>

        <aside className='space-y-6'>
          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Mức độ hoàn thiện'
              description='Hồ sơ càng rõ thì mentor càng dễ chuẩn bị nội dung và lịch phù hợp.'
            />
            <div className='mt-5 space-y-3'>
              <p className='text-ink text-3xl font-semibold'>
                {completedCount}/{completionItems.length}
              </p>
              {completionItems.map((item) => (
                <div
                  className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <span className='text-sm font-medium text-slate-700'>{item.label}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.done ? 'Đã có' : 'Cần bổ sung'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
            <DashboardSectionHeader
              title='Ghi chú triển khai'
              description='Giữ trải nghiệm trung thực trong giai đoạn giao diện tĩnh.'
            />
            <ul className='text-muted mt-5 space-y-3 text-sm'>
              <li>Biểu mẫu này đã sẵn sàng để nối dữ liệu hồ sơ thực ở milestone tiếp theo.</li>
              <li>Trường lớp và mục tiêu học tập nên giữ gọn, cụ thể và dễ hiểu với mentor.</li>
              <li>Không nên thêm khả năng lưu thật trước khi chốt API current user/profile.</li>
            </ul>
            {isDraftSaved ? (
              <p className='mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800'>
                Đã lưu nháp cục bộ cho bố cục hiện tại. Dữ liệu chưa được đồng bộ lên backend.
              </p>
            ) : null}
          </section>
        </aside>
      </div>
    </DashboardPage>
  )
}
