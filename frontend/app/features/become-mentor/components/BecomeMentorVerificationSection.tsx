import type { ChangeEvent, ReactNode } from 'react'
import { CheckCircle2, Shield, UploadCloud } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NumericInput } from '@/components/ui/numeric-input'
import type {
  BecomeMentorFieldChangeHandler,
  BecomeMentorFieldValueChangeHandler,
  BecomeMentorVerificationField
} from '@/features/become-mentor/types'

import { verificationDocumentMeta } from '../become-mentor.constants'
import type { BecomeMentorDocumentKey, BecomeMentorFormState } from '../become-mentor.types'

import { BecomeMentorSectionCard } from './BecomeMentorSectionCard'

type BecomeMentorVerificationSectionProps = {
  documents: BecomeMentorFormState['documents']
  idCardNumber: string
  verificationFullName: string
  onChange: BecomeMentorFieldChangeHandler<BecomeMentorVerificationField>
  onValueChange: BecomeMentorFieldValueChangeHandler<BecomeMentorVerificationField>
  onClearDocument: (key: BecomeMentorDocumentKey) => void
  onDocumentChange: (
    key: BecomeMentorDocumentKey
  ) => (event: ChangeEvent<HTMLInputElement>) => void
}

export function BecomeMentorVerificationSection({
  documents,
  idCardNumber,
  onChange,
  onValueChange,
  onClearDocument,
  onDocumentChange,
  verificationFullName
}: BecomeMentorVerificationSectionProps) {
  return (
    <BecomeMentorSectionCard
      description='Chọn ảnh giấy tờ trực tiếp từ máy để hoàn thiện bước xác minh trước khi gửi duyệt.'
      eyebrow='Bước 5'
      id='verification'
      title='Xác minh danh tính'
    >
      <div className='space-y-5'>
        <div className='rounded-[24px] border border-blue-200 bg-blue-50/70 p-4'>
          <div className='flex items-start gap-3'>
            <div className='bg-white text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm'>
              <Shield size={18} />
            </div>
            <div>
              <p className='text-sm font-semibold text-slate-900'>
                Chỉ mentor đã được xác minh và phê duyệt mới hiển thị trên trang kết nối
              </p>
              <p className='mt-1 text-sm leading-6 text-slate-600'>
                Tạm thời UI này sẽ lấy tệp từ máy và hiển thị trạng thái đã chọn file để bạn dễ hoàn thiện hồ sơ.
              </p>
            </div>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Field>
            <Label htmlFor='mentor-verification-name'>Họ tên trên giấy tờ</Label>
            <Input
              id='mentor-verification-name'
              onChange={onChange('verificationFullName')}
              placeholder='Nhập giống với CCCD / ID'
              value={verificationFullName}
            />
          </Field>

          <Field>
            <Label htmlFor='mentor-id-card-number'>Số giấy tờ</Label>
            <NumericInput
              id='mentor-id-card-number'
              onValueChange={onValueChange('idCardNumber')}
              placeholder='012345678901'
              value={idCardNumber}
            />
          </Field>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          {verificationDocumentMeta.map((document) => {
            const fileName = documents[document.key]
            const done = Boolean(fileName)

            return (
              <div
                className='rounded-[24px] border border-slate-200 bg-slate-50/70 p-4'
                key={document.key}
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='bg-white text-primary flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm'>
                    {done ? <CheckCircle2 size={18} /> : <UploadCloud size={18} />}
                  </div>
                  <Badge variant={done ? 'success' : 'muted'}>
                    {done ? 'Đã sẵn sàng' : 'Chưa có'}
                  </Badge>
                </div>

                <div className='mt-4 space-y-2'>
                  <p className='text-sm font-semibold text-slate-900'>{document.label}</p>
                  <p className='text-sm leading-6 text-slate-500'>{document.description}</p>
                  <p className='min-h-6 text-sm leading-6 text-slate-500'>
                    {fileName ? `Đã chọn: ${fileName}` : 'Chưa có tệp nào được chọn.'}
                  </p>
                </div>

                <Input
                  accept='image/png,image/jpeg,image/jpg'
                  className='sr-only'
                  id={`mentor-document-${document.key}`}
                  onChange={onDocumentChange(document.key)}
                  type='file'
                />
                <div className='mt-5 flex flex-col gap-2'>
                  <label
                    className={buttonVariants({
                      className: 'w-full cursor-pointer rounded-2xl',
                      variant: done ? 'secondary' : 'outline'
                    })}
                    htmlFor={`mentor-document-${document.key}`}
                  >
                    {done ? 'Đổi ảnh giấy tờ' : 'Chọn ảnh giấy tờ'}
                  </label>
                  {done ? (
                    <button
                      className='text-sm font-medium text-slate-500 transition hover:text-slate-700'
                      onClick={() => onClearDocument(document.key)}
                      type='button'
                    >
                      Xóa tệp đã chọn
                    </button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </BecomeMentorSectionCard>
  )
}

function Field({ children }: { children: ReactNode }) {
  return <div className='space-y-2'>{children}</div>
}
