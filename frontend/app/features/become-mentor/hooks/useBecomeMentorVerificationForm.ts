import type { ChangeEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import type { BecomeMentorDocumentKey, BecomeMentorFormState } from '../become-mentor.types'
import {
  becomeMentorVerificationSchema,
  type BecomeMentorVerificationFormValues
} from '../schemas/verification.schema'

type UseBecomeMentorVerificationFormParams = {
  documents: BecomeMentorFormState['documents']
  idCardNumber: string
  onSubmit: (values: BecomeMentorVerificationFormValues) => void
  verificationFullName: string
}

export function useBecomeMentorVerificationForm({
  documents,
  idCardNumber,
  onSubmit,
  verificationFullName
}: UseBecomeMentorVerificationFormParams) {
  const form = useForm<BecomeMentorVerificationFormValues>({
    resolver: zodResolver(becomeMentorVerificationSchema),
    defaultValues: {
      documents,
      idCardNumber,
      verificationFullName
    }
  })
  const selectedDocuments = useWatch({ control: form.control, name: 'documents' })

  const handleDocumentFileChange =
    (key: BecomeMentorDocumentKey) => (event: ChangeEvent<HTMLInputElement>) => {
      const fileName = event.target.files?.[0]?.name ?? ''
      form.setValue(`documents.${key}`, fileName, { shouldDirty: true, shouldValidate: true })
    }

  const clearDocument = (key: BecomeMentorDocumentKey) => {
    form.setValue(`documents.${key}`, '', { shouldDirty: true, shouldValidate: true })
  }

  return {
    clearDocument,
    control: form.control,
    errors: form.formState.errors,
    handleDocumentFileChange,
    onSubmit: form.handleSubmit(onSubmit),
    register: form.register,
    selectedDocuments
  }
}
