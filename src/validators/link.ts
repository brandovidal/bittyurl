import { object, string } from 'zod'
import type { z } from 'zod'

export const createFormSchema = object({
  url: string({ message: 'URL is required' })
    .trim()
    .url('Invalid URL'),
  slug: string({ message: 'Slug is required' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, 'Invalid slug')
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .max(20, 'Slug must be at most 20 characters')
    .transform(slug => slug.toLowerCase())
})

export type createFormInput = z.infer<typeof createFormSchema>
