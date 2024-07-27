import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Get in touch',
  description: 'We can help you Design, Build & Ship your Blockchain Projects.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="" title="Get in touch">
        <p className="mt-6 text-2xl text-neutral-600">
          We can help you <u>Design</u>, <u>Build</u> & <u>Ship</u> your blockchain ideas. <br />
          Let's discuss your project and see how we can help you make it a reality.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
        </div>
      </Container>
    </>
  )
}
