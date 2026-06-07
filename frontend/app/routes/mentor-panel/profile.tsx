import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { BadgeCheck, BookOpenText, Clock3, ShieldCheck, Star } from 'lucide-react'

import { DashboardPage } from '@/components/DashboardPage'
import { StatusBadge } from '@/components/StatusBadge'
import { WorkspaceNotice } from '@/components/WorkspaceNotice'
import { WorkspacePanel } from '@/components/WorkspacePanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
          <WorkspacePanel
            title='Trạng thái công khai'
            description='Hiển thị riêng approval và verification để học viên hiểu hồ sơ đã sẵn sàng ở mức nào.'
          >
            <div className='flex flex-wrap items-center gap-3'>
              <StatusBadge kind='approval' status={mentorWorkspaceProfile.approvalStatus} />
              <StatusBadge kind='verification' status={mentorWorkspaceProfile.verificationStatus} />
              <span className='text-muted text-sm'>
                {mentorWorkspaceProfile.rating}/5 từ {mentorWorkspaceProfile.reviewsCount} đánh giá
              </span>
            </div>
            <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'>
              <CardContent className='p-4'>
                <p className='text-ink text-lg font-semibold'>{mentorWorkspaceProfile.name}</p>
                <p className='text-muted mt-1 text-sm'>{mentorWorkspaceProfile.expertise}</p>
                <p className='text-muted mt-3 text-sm'>{mentorWorkspaceProfile.responseTime}</p>
              </CardContent>
            </Card>
          </WorkspacePanel>

          <form className='space-y-6' onSubmit={handleSubmit}>
            <WorkspacePanel
              title='Giới thiệu công khai'
              description='Giữ headline ngắn, intro rõ đối tượng học viên và teaching style đủ cụ thể để phụ huynh hiểu cách bạn dạy.'
            >
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-headline'>Headline</Label>
                  <Input
                    id='mentor-headline'
                    onChange={handleFieldChange('headline')}
                    value={formValues.headline}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-introduction'>Giới thiệu</Label>
                  <Textarea
                    className='min-h-32'
                    id='mentor-introduction'
                    onChange={handleFieldChange('introduction')}
                    value={formValues.introduction}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='mentor-teaching-style'>Phong cách dạy</Label>
                  <Textarea
                    className='min-h-32'
                    id='mentor-teaching-style'
                    onChange={handleFieldChange('teachingStyle')}
                    value={formValues.teachingStyle}
                  />
                </div>
              </div>
            </WorkspacePanel>

            <WorkspacePanel
              title='Offerings đang mở'
              description='Pricing, subject và grade là phần học viên dùng để so sánh nhanh trước khi đặt lịch.'
            >
              <div className='space-y-3'>
                {mentorOfferingSummaries.map((offering) => (
                  <Card className='rounded-2xl shadow-none' key={offering.id}>
                    <CardContent className='flex flex-col gap-3 p-4 lg:flex-row lg:items-start lg:justify-between'>
                      <div className='space-y-2'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <p className='text-ink font-semibold'>{offering.label}</p>
                          <Badge variant='info'>{proficiencyLabelMap[offering.proficiency]}</Badge>
                          <Badge variant={offering.active ? 'success' : 'muted'}>
                            {offering.active ? 'Đang nhận lịch' : 'Tạm ẩn'}
                          </Badge>
                        </div>
                        <p className='text-muted text-sm'>{offering.teachingNote}</p>
                      </div>
                      <p className='text-ink text-lg font-semibold'>
                        {formatPrice(offering.pricePerHour)}/giờ
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className='flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-muted text-sm'>
                  Milestone 4 chỉ lưu nháp cục bộ để chốt bố cục profile. Kết nối chỉnh sửa thật sẽ
                  làm sau khi API mentor profile ổn định.
                </p>
                <Button type='submit'>Lưu nháp hồ sơ</Button>
              </div>
            </WorkspacePanel>
          </form>
        </div>

        <aside className='space-y-6'>
          <WorkspacePanel
            title='Mức độ sẵn sàng'
            description='Checklist này giữ profile tập trung vào đúng phần ảnh hưởng đến việc đặt lịch.'
          >
            <p className='text-ink text-3xl font-semibold'>
              {completedCount}/{mentorProfileChecklist.length}
            </p>
            <div className='space-y-3'>
              {mentorProfileChecklist.map((item) => (
                <div
                  className='flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'
                  key={item.label}
                >
                  <div className='space-y-1'>
                    <p className='text-sm font-medium text-slate-800'>{item.label}</p>
                    <p className='text-muted text-xs'>{item.helper}</p>
                  </div>
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
                icon={BadgeCheck}
                title='Đã lưu nháp'
              />
            ) : null}
          </WorkspacePanel>

          <WorkspacePanel
            title='Teaching content'
            description='Giữ kỳ vọng học viên rõ ràng về cách buổi học diễn ra trước, trong và sau mỗi session.'
          >
            <div className='space-y-3'>
              {mentorTeachingContent.map((item, index) => {
                const icons = [BookOpenText, Clock3, BadgeCheck] as const
                const Icon = icons[index] ?? BookOpenText

                return (
                  <Card
                    className='rounded-2xl border-slate-200 bg-slate-50 shadow-none'
                    key={item.title}
                  >
                    <CardContent className='flex items-start gap-3 p-4'>
                      <div className='bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl'>
                        <Icon aria-hidden='true' size={18} />
                      </div>
                      <div className='space-y-1'>
                        <p className='text-ink font-semibold'>{item.title}</p>
                        <p className='text-muted text-sm'>{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </WorkspacePanel>

          <WorkspacePanel
            title='Trust và đánh giá'
            description='Giữ tín hiệu tin cậy luôn gần khu vực chỉnh sửa hồ sơ để tránh bỏ quên.'
          >
            <div className='flex flex-wrap items-center gap-2'>
              <Badge variant='warning'>
                <Star aria-hidden='true' size={14} />
                {mentorWorkspaceProfile.rating}/5
              </Badge>
              <Badge variant='success'>
                <ShieldCheck aria-hidden='true' size={14} />
                {mentorWorkspaceProfile.activeStudentsCount} học viên đã từng học
              </Badge>
            </div>
            <div className='space-y-2'>
              {mentorProfileHighlights.map((item) => (
                <Card className='rounded-2xl border-slate-200 bg-slate-50 shadow-none' key={item}>
                  <CardContent className='p-4 text-sm text-slate-700'>{item}</CardContent>
                </Card>
              ))}
            </div>
          </WorkspacePanel>
        </aside>
      </div>
    </DashboardPage>
  )
}
