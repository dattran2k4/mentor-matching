import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import type { BecomeMentorOffering } from '../become-mentor.types'
import {
  becomeMentorOfferingSchema,
  type BecomeMentorOfferingFormValues
} from '../schemas/offering.schema'

type UseBecomeMentorOfferingsFormParams = {
  editingOffering: BecomeMentorOffering | null
  onResetDraft: () => void
  onSaveOffering: (values: BecomeMentorOfferingFormValues) => void
}

export function useBecomeMentorOfferingsForm({
  editingOffering,
  onResetDraft,
  onSaveOffering
}: UseBecomeMentorOfferingsFormParams) {
  const form = useForm<BecomeMentorOfferingFormValues>({
    resolver: zodResolver(becomeMentorOfferingSchema),
    defaultValues: getOfferingFormDefaults()
  })
  const draft = useWatch({ control: form.control }) ?? getOfferingFormDefaults()

  const canSaveOffering = Boolean(
    (draft.primarySubject ?? '').trim() &&
    (draft.gradeLevel ?? '').trim() &&
    (draft.pricePerHour ?? '').trim() &&
    (draft.teachingNote ?? '').trim()
  )

  useEffect(() => {
    form.reset(
      editingOffering ? getOfferingFormDefaults(editingOffering) : getOfferingFormDefaults()
    )
  }, [editingOffering, form])

  const saveOffering = form.handleSubmit((values) => {
    onSaveOffering(values)
    form.reset(getOfferingFormDefaults())
  })

  const cancelEditing = () => {
    onResetDraft()
    form.reset(getOfferingFormDefaults())
  }

  return {
    canSaveOffering,
    cancelEditing,
    control: form.control,
    errors: form.formState.errors,
    register: form.register,
    saveOffering
  }
}

function getOfferingFormDefaults(
  offering?: BecomeMentorOffering | null
): BecomeMentorOfferingFormValues {
  return {
    gradeLevel: offering?.gradeLevel ?? '',
    pricePerHour: offering?.pricePerHour ?? '',
    primarySubject: offering?.subject ?? '',
    teachingNote: offering?.teachingNote ?? ''
  }
}
