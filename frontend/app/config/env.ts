import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z
    .string()
    .trim()
    .url('VITE_API_BASE_URL must be a valid URL, for example: http://localhost:8080/api/')
    .optional(),
  VITE_USE_MOCK: z.preprocess(
    (value) => (value === undefined || value === '' ? 'true' : value),
    z.enum(['true', 'false', '1', '0']).transform((value) => value === 'true' || value === '1')
  )
})

const parsed = envSchema.parse(import.meta.env)

export const env = {
  VITE_USE_MOCK: parsed.VITE_USE_MOCK,
  VITE_API_BASE_URL: parsed.VITE_API_BASE_URL ?? 'http://localhost:8080/api/'
}
