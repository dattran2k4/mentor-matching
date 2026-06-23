import type { ChangeEvent } from 'react'

export type BecomeMentorProfileField =
  | 'avatarUrl'
  | 'fullName'
  | 'gender'
  | 'hometown'
  | 'currentLocation'

export type BecomeMentorTeachingField =
  | 'headline'
  | 'introduction'
  | 'teachingStyle'
  | 'experienceYears'
  | 'currentPosition'
  | 'workplace'

export type BecomeMentorOfferingDraftField =
  | 'primarySubject'
  | 'gradeLevel'
  | 'pricePerHour'
  | 'teachingNote'

export type BecomeMentorVerificationField = 'verificationFullName' | 'idCardNumber'

export type BecomeMentorPageField =
  | BecomeMentorProfileField
  | BecomeMentorTeachingField
  | BecomeMentorOfferingDraftField
  | BecomeMentorVerificationField

export type BecomeMentorFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export type BecomeMentorFieldChangeHandler<TField extends string> = (
  field: TField
) => (event: BecomeMentorFieldChangeEvent) => void

export type BecomeMentorFieldValueChangeHandler<TField extends string> = (
  field: TField
) => (value: string) => void
