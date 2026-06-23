import type { ChangeEvent } from 'react'
import { useState } from 'react'

import type { MentorAvailabilityDraftValue } from '@/components/MentorAvailabilityForm/MentorAvailabilityForm'
import { initialBecomeMentorFormState } from '@/features/become-mentor/become-mentor.constants'
import {
  BecomeMentorAvailabilitySection,
  BecomeMentorHero,
  BecomeMentorOfferingsSection,
  BecomeMentorPersonalSection,
  BecomeMentorProgressRail,
  BecomeMentorStickyBar,
  BecomeMentorTeachingSection,
  BecomeMentorVerificationSection
} from '@/features/become-mentor/components'
import type {
  BecomeMentorFieldChangeHandler,
  BecomeMentorFieldValueChangeHandler,
  BecomeMentorPageField
} from '@/features/become-mentor/types'
import type {
  BecomeMentorAvailabilityWindow,
  BecomeMentorDocumentKey,
  BecomeMentorFormState,
  BecomeMentorOffering,
  BecomeMentorReadinessItem,
  BecomeMentorStep
} from '@/features/become-mentor/become-mentor.types'

export function meta() {
  return [{ title: 'Trở thành mentor | Mentor Matching' }]
}

function getReadinessItems(formState: BecomeMentorFormState): BecomeMentorReadinessItem[] {
  return [
    {
      id: 'profile',
      label: 'Hồ sơ cá nhân và chuyên môn',
      helper:
        formState.fullName &&
        formState.currentLocation &&
        formState.headline &&
        formState.introduction
          ? 'Đã có cả thông tin cơ bản lẫn định vị chuyên môn'
          : 'Cần hoàn thiện thông tin cá nhân và phần giới thiệu chuyên môn',
      done: Boolean(
        formState.avatarUrl &&
        formState.fullName &&
        formState.currentLocation &&
        formState.headline &&
        formState.introduction &&
        formState.teachingStyle &&
        formState.experienceYears
      )
    },
    {
      id: 'offerings',
      label: 'Môn dạy và học phí',
      helper:
        formState.offerings.length > 0
          ? `Đã có ${formState.offerings.length} môn học sẵn sàng hiển thị`
          : 'Cần thêm ít nhất một môn học cùng học phí',
      done: formState.offerings.length > 0
    },
    {
      id: 'availability',
      label: 'Lịch rảnh',
      helper:
        formState.availabilities.length > 0
          ? `Đã có ${formState.availabilities.length} khung giờ sẵn sàng nhận học viên`
          : 'Cần tạo ít nhất một khung giờ khởi tạo',
      done: formState.availabilities.length > 0
    },
    {
      id: 'verification',
      label: 'Xác minh',
      helper:
        formState.documents.idFront && formState.documents.idBack
          ? 'Đã chuẩn bị bộ giấy tờ cơ bản'
          : 'Còn thiếu giấy tờ để đội ngũ đối chiếu',
      done: Boolean(
        formState.verificationFullName &&
        formState.idCardNumber &&
        formState.documents.idFront &&
        formState.documents.idBack
      )
    }
  ]
}

function getSteps(
  readinessItems: BecomeMentorReadinessItem[],
  currentStepIndex: number
): BecomeMentorStep[] {
  return readinessItems.map((item, index) => ({
    id: item.id,
    href: `#${item.id}`,
    label: item.label,
    description: item.helper,
    status:
      index < currentStepIndex || item.done
        ? 'done'
        : index === currentStepIndex
          ? 'current'
          : 'upcoming'
  }))
}

export default function BecomeMentorPage() {
  const [formState, setFormState] = useState(initialBecomeMentorFormState)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [editingOfferingId, setEditingOfferingId] = useState<string | null>(null)
  const [availabilityDraft, setAvailabilityDraft] = useState<MentorAvailabilityDraftValue>({
    mode: 'RECURRING',
    selectedDays: ['2', '4'],
    specificDate: '',
    startTime: '18:00',
    endTime: '20:00'
  })
  const [editingAvailabilityId, setEditingAvailabilityId] = useState<string | null>(null)

  const readinessItems = getReadinessItems(formState)
  const steps = getSteps(readinessItems, currentStepIndex)
  const completedCount = readinessItems.filter((item) => item.done).length
  const currentStep = steps[currentStepIndex]

  const handleFieldChange: BecomeMentorFieldChangeHandler<BecomeMentorPageField> =
    (field) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setFormState((current) => ({ ...current, [field]: value }))
    }

  const handleFieldValueChange: BecomeMentorFieldValueChangeHandler<BecomeMentorPageField> =
    (field) => (value) => {
      setFormState((current) => ({ ...current, [field]: value }))
    }

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileName = event.target.files?.[0]?.name ?? ''
    setFormState((current) => ({ ...current, avatarUrl: fileName }))
  }

  const handleDocumentFileChange =
    (key: BecomeMentorDocumentKey) => (event: ChangeEvent<HTMLInputElement>) => {
      const fileName = event.target.files?.[0]?.name ?? ''

      setFormState((current) => ({
        ...current,
        documents: {
          ...current.documents,
          [key]: fileName
        }
      }))
    }

  const clearDocument = (key: BecomeMentorDocumentKey) => {
    setFormState((current) => ({
      ...current,
      documents: {
        ...current.documents,
        [key]: ''
      }
    }))
  }

  const goToStep = (index: number) => {
    setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)))
  }

  const resetOfferingDraft = () => {
    setFormState((current) => ({
      ...current,
      primarySubject: '',
      gradeLevel: '',
      pricePerHour: '',
      teachingNote: ''
    }))
    setEditingOfferingId(null)
  }

  const saveOffering = () => {
    const draft = {
      gradeLevel: formState.gradeLevel.trim(),
      id: editingOfferingId ?? `offering-${Date.now()}`,
      pricePerHour: formState.pricePerHour.trim(),
      subject: formState.primarySubject.trim(),
      teachingNote: formState.teachingNote.trim()
    } satisfies BecomeMentorOffering

    if (!draft.subject || !draft.gradeLevel || !draft.pricePerHour || !draft.teachingNote) {
      return
    }

    setFormState((current) => ({
      ...current,
      offerings: editingOfferingId
        ? current.offerings.map((item) => (item.id === editingOfferingId ? draft : item))
        : [...current.offerings, draft],
      primarySubject: '',
      gradeLevel: '',
      pricePerHour: '',
      teachingNote: ''
    }))
    setEditingOfferingId(null)
  }

  const editOffering = (offering: BecomeMentorOffering) => {
    setEditingOfferingId(offering.id)
    setFormState((current) => ({
      ...current,
      primarySubject: offering.subject,
      gradeLevel: offering.gradeLevel,
      pricePerHour: offering.pricePerHour,
      teachingNote: offering.teachingNote
    }))
  }

  const removeOffering = (offeringId: string) => {
    setFormState((current) => ({
      ...current,
      offerings: current.offerings.filter((item) => item.id !== offeringId)
    }))

    if (editingOfferingId === offeringId) {
      resetOfferingDraft()
    }
  }

  const resetAvailabilityDraft = () => {
    setAvailabilityDraft({
      mode: 'RECURRING',
      selectedDays: ['2', '4'],
      specificDate: '',
      startTime: '18:00',
      endTime: '20:00'
    })
    setEditingAvailabilityId(null)
  }

  const saveAvailability = () => {
    const draft = {
      endTime: availabilityDraft.endTime,
      id: editingAvailabilityId ?? `availability-${Date.now()}`,
      mode: availabilityDraft.mode,
      selectedDays:
        availabilityDraft.mode === 'RECURRING' ? availabilityDraft.selectedDays.slice() : [],
      specificDate:
        availabilityDraft.mode === 'SPECIFIC_DATE' ? availabilityDraft.specificDate : '',
      startTime: availabilityDraft.startTime
    } satisfies BecomeMentorAvailabilityWindow

    if (!draft.startTime || !draft.endTime) return
    if (draft.mode === 'RECURRING' && draft.selectedDays.length === 0) return
    if (draft.mode === 'SPECIFIC_DATE' && !draft.specificDate) return

    setFormState((current) => ({
      ...current,
      availabilities: editingAvailabilityId
        ? current.availabilities.map((item) => (item.id === editingAvailabilityId ? draft : item))
        : [...current.availabilities, draft]
    }))
    resetAvailabilityDraft()
  }

  const editAvailability = (availability: BecomeMentorAvailabilityWindow) => {
    setEditingAvailabilityId(availability.id)
    setAvailabilityDraft({
      mode: availability.mode,
      selectedDays: availability.selectedDays,
      specificDate: availability.specificDate,
      startTime: availability.startTime,
      endTime: availability.endTime
    })
  }

  const removeAvailability = (availabilityId: string) => {
    setFormState((current) => ({
      ...current,
      availabilities: current.availabilities.filter((item) => item.id !== availabilityId)
    }))

    if (editingAvailabilityId === availabilityId) {
      resetAvailabilityDraft()
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep.id) {
      case 'profile':
        return (
          <div className='space-y-6'>
            <BecomeMentorPersonalSection
              avatarUrl={formState.avatarUrl}
              currentLocation={formState.currentLocation}
              eyebrow='Phần 1'
              fullName={formState.fullName}
              gender={formState.gender}
              hometown={formState.hometown}
              onAvatarChange={handleAvatarFileChange}
              onChange={handleFieldChange}
            />
            <BecomeMentorTeachingSection
              currentPosition={formState.currentPosition}
              eyebrow='Phần 2'
              experienceYears={formState.experienceYears}
              headline={formState.headline}
              introduction={formState.introduction}
              onChange={handleFieldChange}
              onValueChange={handleFieldValueChange}
              teachingStyle={formState.teachingStyle}
              workplace={formState.workplace}
            />
          </div>
        )
      case 'offerings':
        return (
          <BecomeMentorOfferingsSection
            gradeLevel={formState.gradeLevel}
            isEditing={Boolean(editingOfferingId)}
            onChange={handleFieldChange}
            onValueChange={handleFieldValueChange}
            onEditOffering={editOffering}
            onRemoveOffering={removeOffering}
            onResetDraft={resetOfferingDraft}
            onSaveOffering={saveOffering}
            offerings={formState.offerings}
            pricePerHour={formState.pricePerHour}
            primarySubject={formState.primarySubject}
            teachingNote={formState.teachingNote}
          />
        )
      case 'availability':
        return (
          <BecomeMentorAvailabilitySection
            availabilities={formState.availabilities}
            availabilityDraft={availabilityDraft}
            isEditing={Boolean(editingAvailabilityId)}
            onDraftChange={setAvailabilityDraft}
            onEditAvailability={editAvailability}
            onRemoveAvailability={removeAvailability}
            onResetDraft={resetAvailabilityDraft}
            onSaveAvailability={saveAvailability}
          />
        )
      case 'verification':
        return (
          <BecomeMentorVerificationSection
            documents={formState.documents}
            idCardNumber={formState.idCardNumber}
            onChange={handleFieldChange}
            onValueChange={handleFieldValueChange}
            onClearDocument={clearDocument}
            onDocumentChange={handleDocumentFileChange}
            verificationFullName={formState.verificationFullName}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='relative py-8 md:py-10'>
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f8fafc_0%,#f3f8ff_40%,#f8fafc_100%)]' />
      <div className='page-container space-y-8'>
        <BecomeMentorHero completedCount={completedCount} totalCount={readinessItems.length} />

        <div className='grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)] xl:items-start'>
          <div className='xl:sticky xl:top-24'>
            <BecomeMentorProgressRail onSelectStep={goToStep} steps={steps} />
          </div>

          <div className='space-y-6'>
            <section className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-7'>
              <div className='flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between'>
                <div className='space-y-1'>
                  <p className='text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase'>
                    Bước {currentStepIndex + 1}
                  </p>
                  <h2 className='text-2xl font-semibold text-slate-900'>{currentStep.label}</h2>
                </div>
                <div className='rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600'>
                  {currentStep.description}
                </div>
              </div>
            </section>

            {renderCurrentStep()}
          </div>
        </div>

        <BecomeMentorStickyBar
          completedCount={completedCount}
          currentStepIndex={currentStepIndex}
          currentStepLabel={currentStep.label}
          isFirstStep={currentStepIndex === 0}
          isLastStep={currentStepIndex === steps.length - 1}
          onBack={() => goToStep(currentStepIndex - 1)}
          onNext={() => goToStep(currentStepIndex + 1)}
          totalCount={readinessItems.length}
        />
      </div>
    </div>
  )
}
