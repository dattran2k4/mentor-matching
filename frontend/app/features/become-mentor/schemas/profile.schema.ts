import { z } from 'zod'

import { createRequiredStringSchema } from '@/schemas/common.schema'

export const becomeMentorProfileSchema = z.object({
  avatarUrl: createRequiredStringSchema('Vui lòng chọn ảnh đại diện'),
  fullName: createRequiredStringSchema('Vui lòng nhập họ và tên'),
  gender: z.string().trim().optional(),
  hometown: z.string().trim().optional(),
  currentLocation: createRequiredStringSchema('Vui lòng nhập khu vực hiện tại'),
  headline: createRequiredStringSchema('Vui lòng nhập tiêu đề ngắn'),
  introduction: createRequiredStringSchema('Vui lòng nhập giới thiệu bản thân'),
  teachingStyle: createRequiredStringSchema('Vui lòng nhập phong cách giảng dạy'),
  experienceYears: createRequiredStringSchema('Vui lòng nhập số năm kinh nghiệm'),
  currentPosition: z.string().trim().optional(),
  workplace: z.string().trim().optional()
})

export type BecomeMentorProfileFormValues = z.infer<typeof becomeMentorProfileSchema>
