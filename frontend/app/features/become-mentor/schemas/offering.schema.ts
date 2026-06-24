import { z } from 'zod'

import { createRequiredStringSchema } from '@/schemas/common.schema'

export const becomeMentorOfferingSchema = z.object({
  primarySubject: createRequiredStringSchema('Vui lòng chọn môn học'),
  gradeLevel: createRequiredStringSchema('Vui lòng chọn cấp lớp'),
  teachingNote: createRequiredStringSchema('Vui lòng nhập mô tả ngắn về môn học'),
  pricePerHour: createRequiredStringSchema('Vui lòng nhập học phí mỗi giờ')
})

export type BecomeMentorOfferingFormValues = z.infer<typeof becomeMentorOfferingSchema>
