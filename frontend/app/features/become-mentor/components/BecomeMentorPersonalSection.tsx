import { ImagePlus } from 'lucide-react'
import type { ChangeEvent, ReactNode } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import type { BecomeMentorProfileFormValues } from '@/features/become-mentor/schemas'

import { BecomeMentorSectionCard } from './BecomeMentorSectionCard'

type BecomeMentorPersonalSectionProps = {
  avatarUrl: string
  eyebrow?: string
  errors: FieldErrors<BecomeMentorProfileFormValues>
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<BecomeMentorProfileFormValues>
}

export function BecomeMentorPersonalSection({
  avatarUrl,
  eyebrow = 'Bước 1',
  errors,
  onAvatarChange,
  register
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
                {...register('fullName')}
                id='mentor-full-name'
                placeholder='Ví dụ: Nguyễn Văn A'
              />
              <FieldError message={errors.fullName?.message} />
            </Field>

            <div className='grid gap-4 md:grid-cols-2'>
              <Field>
                <Label htmlFor='mentor-gender'>Giới tính</Label>
                <Select id='mentor-gender' {...register('gender')}>
                  <option value=''>Chọn giới tính</option>
                  <option value='MALE'>Nam</option>
                  <option value='FEMALE'>Nữ</option>
                  <option value='OTHER'>Khác</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor='mentor-hometown'>Quê quán</Label>
                <Input
                  {...register('hometown')}
                  id='mentor-hometown'
                  placeholder='Tỉnh / thành phố'
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor='mentor-current-location'>Khu vực hiện tại</Label>
              <Input
                {...register('currentLocation')}
                id='mentor-current-location'
                placeholder='Quận / huyện, tỉnh / thành phố nơi bạn có thể gặp trực tiếp'
              />
              <FieldError message={errors.currentLocation?.message} />
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

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className='text-sm font-medium text-red-500'>{message}</p>
}
