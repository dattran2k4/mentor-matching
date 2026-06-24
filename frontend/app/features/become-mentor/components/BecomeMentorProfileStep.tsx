import type { ComponentProps } from 'react'

import { BecomeMentorPersonalSection } from './BecomeMentorPersonalSection'
import { BecomeMentorTeachingSection } from './BecomeMentorTeachingSection'

type BecomeMentorProfileStepProps = {
  formId: string
  onSubmit: () => void
  personalSectionProps: ComponentProps<typeof BecomeMentorPersonalSection>
  teachingSectionProps: ComponentProps<typeof BecomeMentorTeachingSection>
}

export function BecomeMentorProfileStep({
  formId,
  onSubmit,
  personalSectionProps,
  teachingSectionProps
}: BecomeMentorProfileStepProps) {
  return (
    <form className='space-y-6' id={formId} onSubmit={onSubmit}>
      <BecomeMentorPersonalSection eyebrow='Phần 1' {...personalSectionProps} />
      <BecomeMentorTeachingSection eyebrow='Phần 2' {...teachingSectionProps} />
    </form>
  )
}
