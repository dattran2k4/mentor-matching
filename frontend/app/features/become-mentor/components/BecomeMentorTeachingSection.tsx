import type { ReactNode } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NumericInput } from '@/components/ui/numeric-input'
import { Textarea } from '@/components/ui/textarea'
import type {
  BecomeMentorFieldChangeHandler,
  BecomeMentorFieldValueChangeHandler,
  BecomeMentorTeachingField
} from '@/features/become-mentor/types'

import { BecomeMentorSectionCard } from './BecomeMentorSectionCard'

type BecomeMentorTeachingSectionProps = {
  eyebrow?: string
  experienceYears: string
  headline: string
  introduction: string
  currentPosition: string
  teachingStyle: string
  workplace: string
  onChange: BecomeMentorFieldChangeHandler<BecomeMentorTeachingField>
  onValueChange: BecomeMentorFieldValueChangeHandler<BecomeMentorTeachingField>
}

export function BecomeMentorTeachingSection({
  currentPosition,
  eyebrow = 'Bước 2',
  experienceYears,
  headline,
  introduction,
  onChange,
  onValueChange,
  teachingStyle,
  workplace
}: BecomeMentorTeachingSectionProps) {
  return (
    <BecomeMentorSectionCard
      description='Phần này giúp học viên hiểu bạn dạy cho ai, theo phong cách nào và vì sao nên đặt lịch với bạn.'
      eyebrow={eyebrow}
      id='teaching'
      title='Định vị chuyên môn'
    >
      <div className='grid gap-4'>
        <Field>
          <Label htmlFor='mentor-headline'>Tiêu đề ngắn</Label>
          <Input
            id='mentor-headline'
            onChange={onChange('headline')}
            placeholder='Ví dụ: Giáo viên Toán THPT chuyên luyện thi và xây nền tảng tư duy'
            value={headline}
          />
        </Field>

        <Field>
          <Label htmlFor='mentor-introduction'>Giới thiệu bản thân</Label>
          <Textarea
            className='min-h-32'
            id='mentor-introduction'
            onChange={onChange('introduction')}
            placeholder='Chia sẻ về kinh nghiệm, đối tượng học viên phù hợp và lý do bạn muốn làm mentor.'
            value={introduction}
          />
        </Field>

        <Field>
          <Label htmlFor='mentor-teaching-style'>Phong cách giảng dạy</Label>
          <Textarea
            className='min-h-28'
            id='mentor-teaching-style'
            onChange={onChange('teachingStyle')}
            placeholder='Mô tả cách bạn giao bài, sửa bài, ôn tập và giữ động lực cho học viên.'
            value={teachingStyle}
          />
        </Field>

        <div className='grid gap-4 md:grid-cols-2'>
          <Field>
            <Label htmlFor='mentor-experience-years'>Số năm kinh nghiệm</Label>
            <NumericInput
              id='mentor-experience-years'
              onValueChange={onValueChange('experienceYears')}
              placeholder='Ví dụ: 3'
              value={experienceYears}
            />
          </Field>

          <Field>
            <Label htmlFor='mentor-current-position'>Vị trí hiện tại</Label>
            <Input
              id='mentor-current-position'
              onChange={onChange('currentPosition')}
              placeholder='Ví dụ: Giáo viên, Software Engineer, IELTS Tutor'
              value={currentPosition}
            />
          </Field>
        </div>

        <Field>
          <Label htmlFor='mentor-workplace'>Nơi công tác / học tập</Label>
          <Input
            id='mentor-workplace'
            onChange={onChange('workplace')}
            placeholder='Tên công ty, trung tâm, trường đại học hoặc tổ chức liên quan'
            value={workplace}
          />
        </Field>
      </div>
    </BecomeMentorSectionCard>
  )
}

function Field({ children }: { children: ReactNode }) {
  return <div className='space-y-2'>{children}</div>
}
