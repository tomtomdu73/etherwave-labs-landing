import Image from 'next/image'
import clsx from 'clsx'

import { GridPattern } from '@/components/GridPattern'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import nextjsLogo from '@/assets/stacks/nextjs.svg'
import nodejsLogo from '@/assets/stacks/nodejs.svg'
import ethereumLogo from '@/assets/stacks/ethereum.png'
import tailwindLogo from '@/assets/stacks/tailwindcss.svg'
import framerLogo from '@/assets/stacks/framer.svg'
import wagmiLogo from '@/assets/stacks/wagmi.svg'
import thegraphLogo from '@/assets/stacks/thegraph.svg'
import biconomyLogo from '@/assets/stacks/biconomy.png'
import alchemyLogo from '@/assets/stacks/alchemy.svg'
import lensLogo from '@/assets/stacks/lens.svg'
import stripeLogo from '@/assets/stacks/stripe.svg'
import openzeppelinLogo from '@/assets/stacks/openzeppelin.svg'

const stacks = [
  ['Next.js', nextjsLogo],
  ['Wagmi', wagmiLogo],
  ['Tailwindcss', tailwindLogo],
  ['Framer Motion', framerLogo],
  ['Node.js', nodejsLogo],
  ['The Graph', thegraphLogo],
  ['Biconomy', biconomyLogo],
  ['Lens', lensLogo],
  ['Stripe', stripeLogo],
  ['Ethereum', ethereumLogo],
  ['Alchemy', alchemyLogo],
  ['Openzeppelin', openzeppelinLogo],
]

export default function Stacks() {
  return (
    <div
      className={clsx(
        'relative isolate mt-24 bg-brand-100/50 py-16 sm:mt-32 sm:py-28 md:py-24 lg:mt-40',
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-brand-100 stroke-brand-100 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />

      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-neutral-950 sm:text-left">
            Some amazing technologies we love working with
          </h2>
          <div className="h-px flex-auto bg-neutral-400" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {stacks.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image className="w-36" src={logo} alt={client} width={250} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
