export type BecomeMentorStepId = 'profile' | 'offerings' | 'availability' | 'verification'

export type BecomeMentorStepStatus = 'done' | 'current' | 'upcoming'

export type BecomeMentorAvailabilityMode = 'RECURRING' | 'SPECIFIC_DATE'

export type BecomeMentorDocumentKey = 'idFront' | 'idBack' | 'selfieWithId'

export type BecomeMentorOffering = {
  id: string
  subject: string
  gradeLevel: string
  pricePerHour: string
  teachingNote: string
}

export type BecomeMentorAvailabilityWindow = {
  id: string
  mode: BecomeMentorAvailabilityMode
  selectedDays: string[]
  specificDate: string
  startTime: string
  endTime: string
}

export type BecomeMentorFormState = {
  avatarUrl: string
  fullName: string
  gender: string
  hometown: string
  currentLocation: string
  headline: string
  introduction: string
  teachingStyle: string
  experienceYears: string
  currentPosition: string
  workplace: string
  offerings: BecomeMentorOffering[]
  availabilities: BecomeMentorAvailabilityWindow[]
  verificationFullName: string
  idCardNumber: string
  documents: Record<BecomeMentorDocumentKey, string>
}

export type BecomeMentorStep = {
  id: BecomeMentorStepId
  href: string
  label: string
  description: string
  status: BecomeMentorStepStatus
}

export type BecomeMentorReadinessItem = {
  id: BecomeMentorStepId
  label: string
  helper: string
  done: boolean
}
