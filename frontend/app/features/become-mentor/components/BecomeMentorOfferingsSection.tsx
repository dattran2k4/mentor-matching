import type { ComponentProps, ReactNode } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'

import { AppSelect } from '@/components/ui/app-select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NumericInput } from '@/components/ui/numeric-input'
import { Textarea } from '@/components/ui/textarea'
import { useCatalogGradesQuery, useCatalogSubjectsQuery } from '@/hooks/queries/catalog/useCatalogOptionsQuery'
import type {
  BecomeMentorFieldChangeHandler,
  BecomeMentorFieldValueChangeHandler,
  BecomeMentorOfferingDraftField
} from '@/features/become-mentor/types'

import type { BecomeMentorOffering } from '../become-mentor.types'

import { BecomeMentorSectionCard } from './BecomeMentorSectionCard'

type BecomeMentorOfferingsSectionProps = {
  gradeLevel: string
  isEditing: boolean
  offerings: BecomeMentorOffering[]
  pricePerHour: string
  primarySubject: string
  teachingNote: string
  onChange: BecomeMentorFieldChangeHandler<BecomeMentorOfferingDraftField>
  onValueChange: BecomeMentorFieldValueChangeHandler<BecomeMentorOfferingDraftField>
  onEditOffering: (offering: BecomeMentorOffering) => void
  onRemoveOffering: (offeringId: string) => void
  onResetDraft: () => void
  onSaveOffering: () => void
}

export function BecomeMentorOfferingsSection({
  gradeLevel,
  isEditing,
  offerings,
  onChange,
  onValueChange,
  onEditOffering,
  onRemoveOffering,
  onResetDraft,
  onSaveOffering,
  pricePerHour,
  primarySubject,
  teachingNote
}: BecomeMentorOfferingsSectionProps) {
  const {
    data: subjects,
    isLoading: isSubjectsLoading,
    isError: isSubjectsError
  } = useCatalogSubjectsQuery()
  const {
    data: grades,
    isLoading: isGradesLoading,
    isError: isGradesError
  } = useCatalogGradesQuery()

  const canSaveOffering = Boolean(
    primarySubject.trim() && gradeLevel.trim() && pricePerHour.trim() && teachingNote.trim()
  )
  const subjectOptions = (subjects ?? []).map((subject) => ({
    label: subject.name,
    value: subject.name
  }))
  const gradeOptions = (grades ?? []).map((grade) => ({
    label: formatGradeLabel(grade.name),
    value: formatGradeLabel(grade.name)
  }))
  const subjectPlaceholder =
    isSubjectsLoading
      ? 'Đang tải môn học...'
      : isSubjectsError
        ? 'Không tải được môn học'
        : 'Chọn môn'
  const gradePlaceholder =
    isGradesLoading ? 'Đang tải cấp lớp...' : isGradesError ? 'Không tải được cấp lớp' : 'Chọn cấp lớp'

  return (
    <BecomeMentorSectionCard
      description='Mỗi môn học nên có cấp lớp, mô tả ngắn và học phí riêng để học viên dễ so sánh và chọn đúng nhu cầu.'
      eyebrow='Bước 2'
      id='offerings'
      title='Môn dạy và học phí'
    >
      <div className='space-y-6'>
        <section className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='border-b border-slate-100 pb-4'>
            <h3 className='text-xl font-semibold text-slate-900'>Danh sách môn học & học phí</h3>
          </div>

          <div className='mt-5 space-y-3'>
            {offerings.length > 0 ? (
              offerings.map((offering) => (
                <div
                  className='flex items-center justify-between gap-4 rounded-[22px] border border-slate-200 px-4 py-4 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)]'
                  key={offering.id}
                >
                  <div className='min-w-0'>
                    <p className='text-xl font-semibold text-slate-900'>
                      {offering.subject} - {offering.gradeLevel}
                    </p>
                    <p className='mt-1 text-lg font-medium text-slate-600'>
                      {formatPrice(offering.pricePerHour)}
                    </p>
                  </div>

                  <div className='flex shrink-0 items-center gap-2'>
                    <IconButton
                      aria-label={`Sửa ${offering.subject}`}
                      onClick={() => onEditOffering(offering)}
                      variant='outline'
                    >
                      <Pencil size={16} />
                    </IconButton>
                    <IconButton
                      aria-label={`Xóa ${offering.subject}`}
                      onClick={() => onRemoveOffering(offering.id)}
                      variant='destructive'
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </div>
                </div>
              ))
            ) : (
              <div className='rounded-[22px] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-6 text-sm leading-6 text-slate-500'>
                Chưa có môn học nào. Hãy thêm môn đầu tiên để bắt đầu xây dựng hồ sơ mentor.
              </div>
            )}
          </div>
        </section>

        <section className='rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm'>
          <div className='border-b border-slate-100 pb-4'>
            <h3 className='text-xl font-semibold text-slate-900'>
              {isEditing ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
            </h3>
          </div>

          <div className='mt-5 space-y-5'>
            <Field>
              <Label>Chọn môn học</Label>
              <AppSelect
                ariaLabel='Chọn môn học'
                className='[&_button]:h-11 [&_button]:rounded-xl [&_button]:text-sm [&_span]:text-slate-900'
                disabled={isSubjectsLoading || isSubjectsError || subjectOptions.length === 0}
                onValueChange={onValueChange('primarySubject')}
                options={subjectOptions}
                placeholder={subjectPlaceholder}
                value={primarySubject}
              />
            </Field>

            <Field>
              <Label>Cấp lớp</Label>
              <AppSelect
                ariaLabel='Chọn cấp lớp'
                className='[&_button]:h-11 [&_button]:rounded-xl [&_button]:text-sm [&_span]:text-slate-900'
                disabled={isGradesLoading || isGradesError || gradeOptions.length === 0}
                onValueChange={onValueChange('gradeLevel')}
                options={gradeOptions}
                placeholder={gradePlaceholder}
                value={gradeLevel}
              />
            </Field>

            <Field>
              <Label htmlFor='mentor-teaching-note'>Mô tả ngắn về môn học</Label>
              <Textarea
                className='min-h-28'
                id='mentor-teaching-note'
                onChange={onChange('teachingNote')}
                placeholder='Mô tả ngắn gọn nội dung và phương pháp giảng dạy...'
                value={teachingNote}
              />
            </Field>

            <Field>
              <Label htmlFor='mentor-price'>Học phí mỗi giờ</Label>
              <div className='grid grid-cols-[minmax(0,1fr)_5.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10'>
                <NumericInput
                  className='h-11 w-full border-0 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400'
                  id='mentor-price'
                  onValueChange={onValueChange('pricePerHour')}
                  placeholder='Ví dụ: 300000'
                  value={pricePerHour}
                />
                <div className='flex items-center justify-center border-l border-slate-200 bg-slate-50 text-sm font-medium text-slate-600'>
                  đ/giờ
                </div>
              </div>
            </Field>

            <div className='flex flex-col gap-3 sm:flex-row'>
              {isEditing ? (
                <Button className='rounded-2xl' onClick={onResetDraft} variant='outline'>
                  Hủy chỉnh sửa
                </Button>
              ) : null}
              <Button
                className='w-full rounded-2xl sm:flex-1'
                disabled={!canSaveOffering}
                onClick={onSaveOffering}
                size='lg'
              >
                <Plus size={18} />
                {isEditing ? 'Cập nhật môn học' : 'Thêm môn học mới'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </BecomeMentorSectionCard>
  )
}

function Field({ children }: { children: ReactNode }) {
  return <div className='space-y-2'>{children}</div>
}

function IconButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button className='h-10 w-10 rounded-xl p-0' size='icon' {...props}>
      {children}
    </Button>
  )
}

function formatPrice(value: string) {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 'Chưa đặt học phí'
  }

  return `${new Intl.NumberFormat('vi-VN').format(Number(digits))}đ/giờ`
}

function formatGradeLabel(value: string) {
  return value.replace(/^Lop\s+/i, 'Lớp ')
}
