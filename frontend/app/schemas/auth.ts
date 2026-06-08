import { z } from 'zod'

import { createPasswordSchema, emailSchema } from '@/schemas/common'

export const loginSchema = z.object({
  email: emailSchema,
  password: createPasswordSchema()
})

export type LoginFormValues = z.infer<typeof loginSchema>
