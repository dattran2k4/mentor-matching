import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { CheckCircle2, ClipboardList } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { learnerProfileDraft } from '@/mocks/learner-workspace'

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
      <form className='grid gap-6 xl:grid-cols-[1.6fr_1fr]' onSubmit={handleSubmit}>
        <div className='space-y-6'>
          <WorkspacePanel
            title='Tài khoản'
            description='Thông tin cơ bản để mentor và hệ thống liên hệ khi có thay đổi về buổi học.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='learner-full-name'>Họ và tên</Label>
                <Input
                  id='learner-full-name'
                  onChange={handleFieldChange('fullName')}
                  value={formValues.fullName}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-email'>Email</Label>
                <Input
                  id='learner-email'
                  onChange={handleFieldChange('email')}
                  type='email'
                  value={formValues.email}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-phone'>Số điện thoại</Label>
                <Input
                  id='learner-phone'
                  onChange={handleFieldChange('phone')}
                  type='tel'
                  value={formValues.phone}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-gender'>Giới tính</Label>
                <Select
                  id='learner-gender'
                  onChange={handleFieldChange('gender')}
                  value={formValues.gender}
                >
                  <option value='Nam'>Nam</option>
                  <option value='Nữ'>Nữ</option>
                  <option value='Khác'>Khác</option>
                </Select>
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Hồ sơ học viên'
            description='Bối cảnh trường lớp giúp mentor chuẩn bị nội dung đúng trình độ và mục tiêu.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='learner-birth-year'>Năm sinh</Label>
                <Input
                  id='learner-birth-year'
                  onChange={handleFieldChange('birthYear')}
                  value={formValues.birthYear}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='learner-grade'>Lớp hiện tại</Label>
                <Input
                  id='learner-grade'
                  onChange={handleFieldChange('grade')}
                  value={formValues.grade}
                />
              </div>
              <div className='space-y-2 md:col-span-2'>
                <Label htmlFor='learner-school'>Trường / trung tâm</Label>
                <Input
                  id='learner-school'
                  onChange={handleFieldChange('schoolName')}
                  value={formValues.schoolName}
                />
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Mục tiêu học tập'
            description='Mô tả ngắn mục tiêu hiện tại để mentor hiểu rõ vì sao bạn đặt buổi học.'
          >
            <div className='space-y-2'>
              <Label htmlFor='learner-goal'>Mục tiêu</Label>
              <Textarea
                className='min-h-36'
                id='learner-goal'
                onChange={handleFieldChange('learningGoal')}
                value={formValues.learningGoal}
              />
            </div>
            <div className='flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-muted text-sm'>
                Milestone 3 lưu nháp cục bộ để chốt trải nghiệm biểu mẫu. Kết nối API sẽ được thêm ở
                milestone tích hợp dữ liệu.
              </p>
              <Button type='submit'>Lưu thông tin</Button>
            </div>
          </WorkspacePanel>
        </div>

        <aside className='space-y-6'>
          <WorkspacePanel
            title='Mức độ hoàn thiện'
            description='Hồ sơ càng rõ thì mentor càng dễ chuẩn bị nội dung và lịch phù hợp.'
          >
            <p className='text-ink text-3xl font-semibold'>
              {completedCount}/{completionItems.length}
            </p>
            <div className='space-y-3'>
              {completionItems.map((item) => (
                <div
                  className='flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <span className='text-sm font-medium text-slate-700'>{item.label}</span>
                  <Badge variant={item.done ? 'success' : 'warning'}>
                    {item.done ? 'Đã có' : 'Cần bổ sung'}
                  </Badge>
                </div>
              ))}
            </div>
            {isDraftSaved ? (
              <WorkspaceNotice
                className='rounded-2xl'
                description='Đã lưu nháp cục bộ cho bố cục hiện tại. Dữ liệu chưa được đồng bộ lên backend.'
                icon={CheckCircle2}
                title='Đã lưu nháp'
              />
            ) : null}
          </WorkspacePanel>

          <WorkspacePanel
            title='Ghi chú triển khai'
            description='Giữ trải nghiệm trung thực trong giai đoạn giao diện tĩnh.'
          >
            <div className='space-y-3 text-sm text-slate-700'>
              {[
                'Biểu mẫu này đã sẵn sàng để nối dữ liệu hồ sơ thực ở milestone tiếp theo.',
                'Trường lớp và mục tiêu học tập nên giữ gọn, cụ thể và dễ hiểu với mentor.',
                'Không nên thêm khả năng lưu thật trước khi chốt API current user/profile.'
              ].map((item) => (
                <div
                  className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </WorkspacePanel>

          <WorkspaceNotice
            description='Các trường hiện tại ưu tiên đúng ngữ cảnh booking, học tập và ghép mentor trước khi đi sâu vào workflow tài khoản đầy đủ.'
            icon={ClipboardList}
            title='Static UI first'
            tone='neutral'
          />
        </aside>
      </form>
    </DashboardPage>
  )
}
