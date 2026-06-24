import { z } from 'zod'

import { createRequiredStringSchema } from '@/schemas/common.schema'

export const becomeMentorVerificationSchema = z.object({
  verificationFullName: createRequiredStringSchema('Vui lòng nhập họ tên trên giấy tờ'),
  idCardNumber: createRequiredStringSchema('Vui lòng nhập số giấy tờ'),
  documents: z.object({
    idFront: createRequiredStringSchema('Vui lòng chọn ảnh mặt trước giấy tờ'),
    idBack: createRequiredStringSchema('Vui lòng chọn ảnh mặt sau giấy tờ'),
    selfieWithId: z.string().trim()
  })
})

export type BecomeMentorVerificationFormValues = z.infer<typeof becomeMentorVerificationSchema>
