import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import CalendlyEmbedded from '@/components/CalendlyEmbedded'

export const metadata: Metadata = {
  title: 'Schedule a call',
  description:
    'We can help you Design, Build & Ship your Blockchain Projects. Schedule a call with us now.',
}

export default function ScheduleCall() {
  return (
    <>
      <PageIntro eyebrow="" title="Schedule a call">
        <p className="mt-6 text-2xl text-neutral-600">
          We can help you <u>Design</u>, <u>Build</u> & <u>Ship</u> your blockchain ideas. <br />
          Schedule a call with us now to discuss your project and see how we can help you make it a
          reality.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-20">
        <div className="mx-auto max-w-5xl">
          <CalendlyEmbedded url="https://calendly.com/etherwave-labs/30min" />
        </div>
      </Container>
    </>
  )
}
