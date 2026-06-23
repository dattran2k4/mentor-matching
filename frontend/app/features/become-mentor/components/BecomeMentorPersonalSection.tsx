import { ImagePlus } from 'lucide-react'
import type { ChangeEvent, ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import type {
  BecomeMentorFieldChangeHandler,
  BecomeMentorProfileField
} from '@/features/become-mentor/types'

import { BecomeMentorSectionCard } from './BecomeMentorSectionCard'

type BecomeMentorPersonalSectionProps = {
  avatarUrl: string
  currentLocation: string
  eyebrow?: string
  fullName: string
  gender: string
  hometown: string
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void
  onChange: BecomeMentorFieldChangeHandler<BecomeMentorProfileField>
}

export function BecomeMentorPersonalSection({
  avatarUrl,
  currentLocation,
  eyebrow = 'Bước 1',
  fullName,
  gender,
  hometown,
  onAvatarChange,
  onChange
}: BecomeMentorPersonalSectionProps) {
  return (
    <BecomeMentorSectionCard
      description='Đặt nền thông tin cơ bản thật rõ ràng để đội ngũ admin và học viên hiểu bạn là ai, đang dạy ở đâu.'
      eyebrow={eyebrow}
      id='identity'
      title='Thông tin cá nhân'
    >
      <div className='grid gap-6'>
        <div className='grid gap-5 lg:grid-cols-[13rem_minmax(0,1fr)]'>
          <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4'>
            <div className='flex h-full flex-col items-center justify-center rounded-[20px] border border-white bg-white px-4 py-6 text-center shadow-sm'>
              <div className='bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-[28px]'>
                <ImagePlus size={28} />
              </div>
              <p className='mt-4 text-sm font-semibold text-slate-900'>Ảnh đại diện mentor</p>
              <Input
                accept='image/png,image/jpeg,image/jpg'
                className='sr-only'
                id='mentor-avatar-file'
                onChange={onAvatarChange}
                type='file'
              />
              <label
                className={buttonVariants({
                  className: 'mt-5 w-full max-w-48 cursor-pointer rounded-2xl',
                  variant: 'outline'
                })}
                htmlFor='mentor-avatar-file'
              >
                Chọn ảnh đại diện
              </label>
              <p className='mt-3 min-h-6 text-sm leading-6 text-slate-500'>
                {avatarUrl ? `Đã chọn: ${avatarUrl}` : 'Chưa có tệp nào được chọn.'}
              </p>
            </div>
          </div>

          <div className='grid gap-4'>
            <Field>
              <Label htmlFor='mentor-full-name'>Họ và tên</Label>
              <Input
                id='mentor-full-name'
                onChange={onChange('fullName')}
                placeholder='Ví dụ: Nguyễn Văn A'
                value={fullName}
              />
            </Field>

            <div className='grid gap-4 md:grid-cols-2'>
              <Field>
                <Label htmlFor='mentor-gender'>Giới tính</Label>
                <Select id='mentor-gender' onChange={onChange('gender')} value={gender}>
                  <option value=''>Chọn giới tính</option>
                  <option value='MALE'>Nam</option>
                  <option value='FEMALE'>Nữ</option>
                  <option value='OTHER'>Khác</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor='mentor-hometown'>Quê quán</Label>
                <Input
                  id='mentor-hometown'
                  onChange={onChange('hometown')}
                  placeholder='Tỉnh / thành phố'
                  value={hometown}
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor='mentor-current-location'>Khu vực hiện tại</Label>
              <Input
                id='mentor-current-location'
                onChange={onChange('currentLocation')}
                placeholder='Quận / huyện, tỉnh / thành phố nơi bạn có thể gặp trực tiếp'
                value={currentLocation}
              />
            </Field>
          </div>
        </div>
      </div>
    </BecomeMentorSectionCard>
  )
}

function Field({ children }: { children: ReactNode }) {
  return <div className='space-y-2'>{children}</div>
}
