import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-brand-500 px-6 py-20 sm:mx-0 sm:py-20 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-20">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              Tell us about your project
            </h2>
            <div className="flex">
              <Button href="/contact" invert>
                Contact us
              </Button>
            </div>
            {/* <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">Our offices</h3>
              <Offices invert className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
            </div> */}
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
