import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import type { BecomeMentorFormState, BecomeMentorOffering } from '../become-mentor.types'
import type { BecomeMentorOfferingFormValues } from '../schemas/offering.schema'

type UseBecomeMentorOfferingsStepParams = {
  offerings: BecomeMentorOffering[]
  setFormState: Dispatch<SetStateAction<BecomeMentorFormState>>
}

export function useBecomeMentorOfferingsStep({
  offerings,
  setFormState
}: UseBecomeMentorOfferingsStepParams) {
  const [editingOfferingId, setEditingOfferingId] = useState<string | null>(null)
  const editingOffering = offerings.find((offering) => offering.id === editingOfferingId) ?? null

  const resetOfferingDraft = () => {
    setEditingOfferingId(null)
  }

  const saveOffering = (values: BecomeMentorOfferingFormValues) => {
    const draft = {
      gradeLevel: values.gradeLevel.trim(),
      id: editingOfferingId ?? `offering-${Date.now()}`,
      pricePerHour: values.pricePerHour.trim(),
      subject: values.primarySubject.trim(),
      teachingNote: values.teachingNote.trim()
    } satisfies BecomeMentorOffering

    if (!draft.subject || !draft.gradeLevel || !draft.pricePerHour || !draft.teachingNote) {
      return
    }

    setFormState((current) => ({
      ...current,
      offerings: editingOfferingId
        ? current.offerings.map((item) => (item.id === editingOfferingId ? draft : item))
        : [...current.offerings, draft]
    }))
    setEditingOfferingId(null)
  }

  const editOffering = (offering: BecomeMentorOffering) => {
    setEditingOfferingId(offering.id)
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

  return {
    editingOffering,
    isEditing: Boolean(editingOfferingId),
    onEditOffering: editOffering,
    onRemoveOffering: removeOffering,
    onResetDraft: resetOfferingDraft,
    onSaveOffering: saveOffering
  }
}
