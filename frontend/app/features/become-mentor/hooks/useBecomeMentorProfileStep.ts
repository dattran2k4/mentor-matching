import type { ChangeEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import type { BecomeMentorFormState } from '../become-mentor.types'
import {
  becomeMentorProfileSchema,
  type BecomeMentorProfileFormValues
} from '../schemas/profile.schema'

export type BecomeMentorProfileStepState = Omit<
  BecomeMentorFormState,
  'offerings' | 'availabilities' | 'verificationFullName' | 'idCardNumber' | 'documents'
>

type UseBecomeMentorProfileStepParams = {
  formId: string
  profileState: BecomeMentorProfileStepState
  onSubmit: (values: BecomeMentorProfileFormValues) => void
}

export function useBecomeMentorProfileStep({
  formId,
  onSubmit,
  profileState
}: UseBecomeMentorProfileStepParams) {
  const form = useForm<BecomeMentorProfileFormValues>({
    resolver: zodResolver(becomeMentorProfileSchema),
    defaultValues: profileState
  })
  const avatarUrl = useWatch({ control: form.control, name: 'avatarUrl' })

  /* File input không dùng register trực tiếp vì UI hiện tại chỉ lưu tên file để mô phỏng upload. */
  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileName = event.target.files?.[0]?.name ?? ''
    form.setValue('avatarUrl', fileName, { shouldDirty: true, shouldValidate: true })
  }

  return {
    formId,
    onSubmit: form.handleSubmit(onSubmit),
    personalSectionProps: {
      avatarUrl,
      errors: form.formState.errors,
      onAvatarChange: handleAvatarFileChange,
      register: form.register
    },
    teachingSectionProps: {
      control: form.control,
      errors: form.formState.errors,
      register: form.register
    }
  }
}
