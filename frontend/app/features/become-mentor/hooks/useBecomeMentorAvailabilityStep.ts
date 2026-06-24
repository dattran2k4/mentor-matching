import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import type { MentorAvailabilityDraftValue } from '@/components/MentorAvailabilityForm/MentorAvailabilityForm'

import type { BecomeMentorAvailabilityWindow, BecomeMentorFormState } from '../become-mentor.types'
import { becomeMentorAvailabilitySchema } from '../schemas/availability.schema'

const initialAvailabilityDraft: MentorAvailabilityDraftValue = {
  mode: 'RECURRING',
  selectedDays: ['2', '4'],
  specificDate: '',
  startTime: '18:00',
  endTime: '20:00'
}

type UseBecomeMentorAvailabilityStepParams = {
  availabilities: BecomeMentorAvailabilityWindow[]
  setFormState: Dispatch<SetStateAction<BecomeMentorFormState>>
  onSubmitStep: () => void
}

export function useBecomeMentorAvailabilityStep({
  availabilities,
  onSubmitStep,
  setFormState
}: UseBecomeMentorAvailabilityStepParams) {
  const [availabilityDraft, setAvailabilityDraft] =
    useState<MentorAvailabilityDraftValue>(initialAvailabilityDraft)
  const [editingAvailabilityId, setEditingAvailabilityId] = useState<string | null>(null)
  const stepValidation = becomeMentorAvailabilitySchema.safeParse({ availabilities })
  const stepError = stepValidation.success
    ? undefined
    : stepValidation.error.flatten().fieldErrors.availabilities?.[0]

  const resetAvailabilityDraft = () => {
    setAvailabilityDraft(initialAvailabilityDraft)
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

  const submitAvailabilityStep = () => {
    if (stepValidation.success) {
      onSubmitStep()
    }
  }

  return {
    availabilityDraft,
    isEditing: Boolean(editingAvailabilityId),
    onDraftChange: setAvailabilityDraft,
    onEditAvailability: editAvailability,
    onRemoveAvailability: removeAvailability,
    onResetDraft: resetAvailabilityDraft,
    onSaveAvailability: saveAvailability,
    onSubmitStep: submitAvailabilityStep,
    stepError
  }
}
