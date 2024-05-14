import { object, string } from 'zod'
import type { TypeOf } from 'zod'

export const createFormSchema = object({
  url: string({
    required_error: 'URL is required',
    invalid_type_error: 'URL must be a string'
  })
    .trim()
    .url({ message: 'Invalid URL' }),
  slug: string({
    required_error: 'Slug is required',
    invalid_type_error: 'Slug must be a string'
  })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, 'Invalid slug')
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .max(20, 'Slug must be at most 20 characters')
    .transform(slug => slug.toLowerCase())
})

export type createFormInput = TypeOf<typeof createFormSchema>
