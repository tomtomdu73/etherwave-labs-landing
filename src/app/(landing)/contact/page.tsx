import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import CalendlyEmbedded from '@/components/CalendlyEmbedded'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Get in touch',
  description: 'We can help you Design, Build & Ship your Blockchain Projects.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="" title="Get in touch">
        <p>
          We can help you Design, Build & Ship your Blockchain Projects. <br />
          Let's discuss your project and how we can help you make it a reality.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          {/* <ContactDetails /> */}
        </div>
        {/* <PageIntro eyebrow="" title="Book a call">
          <p>
            You already have a clear idea of what you need and want to discuss it with us? Book a
            call!
          </p>
        </PageIntro>
        <div className="mx-auto max-w-5xl">
          <CalendlyEmbedded url="https://calendly.com/etherwave-labs/30min" />
        </div> */}
      </Container>
    </>
  )
}
