'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import ReCAPTCHA from 'react-google-recaptcha'

import { verifyCaptcha } from '@/actions/verify-captcha'
import { sendEmail } from '@/actions/form'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

function TextArea({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        minLength={100}
        id={id}
        rows={4}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-16 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-[30px] origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        {...props}
        id={id}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function SubmitButton({ isVerified = false }: { isVerified: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="mt-10" disabled={pending || !isVerified}>
      {pending ? 'Sending' : 'Send Message'}
    </Button>
  )
}

export default function ContactForm() {
  const contactForm = useRef<HTMLFormElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [sendEmailState, sendEmailAction] = useFormState(sendEmail, {
    error: null,
    success: false,
  })
  const [message, setMessage] = useState<string>('')
  const [errors, setErrors] = useState<string>('')
  const [isVerified, setIsverified] = useState<boolean>(false)

  useEffect(() => {
    if (sendEmailState.success && contactForm.current) {
      setErrors('')
      contactForm.current.reset()
      setMessage('Thank you for reaching out! We will get back to you shortly.')
    }
    if (sendEmailState.error) {
      setErrors(sendEmailState.error)
    }
    if (sendEmailState.errors) {
      setErrors(JSON.stringify(sendEmailState.errors))
    }
  }, [sendEmailState])

  const handleCaptchaSubmission = async (token: string | null) => {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }

  return (
    <FadeIn className="lg:order-last">
      <form action={sendEmailAction} ref={contactForm}>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name*" type="text" name="name" autoComplete="name" required />
          <TextInput label="Email*" type="email" name="email" autoComplete="email" required />
          <TextInput
            name={'company'}
            type="text"
            label="Company Website / LinkedIn Profile"
            autoComplete="organization"
          />
          <TextArea
            name="message"
            label="How can we help? Please share as much detail as possible about your project*"
            required
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">Your budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label="$5K – $10K" name="budget" value="5" />
                <RadioInput label="$10K – $50K" name="budget" value="10" />
                <RadioInput label="$50K – $150K" name="budget" value="50" />
                <RadioInput label="More than $150K" name="budget" value="150" />
              </div>
            </fieldset>
          </div>
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
          className="mt-10"
        />
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {errors && <p className="mt-4 text-red-500">{errors}</p>}
        <SubmitButton isVerified={isVerified} />
      </form>
    </FadeIn>
  )
}
