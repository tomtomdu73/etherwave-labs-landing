import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string({ invalid_type_error: 'Invalid Name' }).min(2),
  email: z.string({ invalid_type_error: 'Invalid Email' }).min(3).email(),
  company: z.string({ invalid_type_error: 'Invalid Company Url' }),
  message: z.string({ invalid_type_error: 'Invalid Message' }).min(100),
  budget: z.number({ invalid_type_error: 'Invalid Budget' }).int().min(5).max(150),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>
