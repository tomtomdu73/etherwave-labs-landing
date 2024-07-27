'use server'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { isbot } from 'isbot'

import { ContactFormSchema } from '@/schemas/ContactForm'
import EmailTemplate from '@/components/emails/MessageSubmission'

const { RESEND_API_KEY } = process.env

interface State {
  error: string | null
  success: boolean
}

export const sendEmail = async (prevState: State, formData: FormData): Promise<State> => {
  //bot protection
  const userAgent = headers().get('user-agent')

  if (isbot(userAgent)) {
    return {
      error: '🤖',
      success: false,
    }
  }

  // Validate the form data
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message'),
    budget: Number(formData.get('budget')),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    const { name, email, message, company, budget } = validatedFields.data
    const resend = new Resend(RESEND_API_KEY)

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Etherwave Labs <mo-reply@etherwavelabs.com>`,
      to: ['etherwavelabs@gmail.com', 'thomas.cosialls@gmail.com'],
      subject: `🚀 New message from ${name}`,
      react: EmailTemplate({ name, email, message, company, budget }),
    })
    if (error) {
      return {
        error: (error as Error).message,
        success: false,
      }
    }
    return {
      error: null,
      success: true,
    }
  } catch (error) {
    return {
      error: (error as Error).message,
      success: false,
    }
  }
}
