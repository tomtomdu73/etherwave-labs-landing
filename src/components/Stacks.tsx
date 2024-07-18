import Image from 'next/image'
import clsx from 'clsx'

import { GridPattern } from '@/components/GridPattern'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import nextjsLogo from '@/assets/stacks/nextjs.svg'
import nodejsLogo from '@/assets/stacks/nodejs.svg'
import pwaLogo from '@/assets/stacks/pwa.svg'
import tailwindLogo from '@/assets/stacks/tailwindcss.svg'
import framerLogo from '@/assets/stacks/framer.svg'
import wagmiLogo from '@/assets/stacks/wagmi.svg'
import thegraphLogo from '@/assets/stacks/thegraph.svg'
import biconomyLogo from '@/assets/stacks/biconomy.png'
import alchemyLogo from '@/assets/stacks/alchemy.svg'
import lensLogo from '@/assets/stacks/lens.svg'
import stripeLogo from '@/assets/stacks/stripe.svg'
import openzeppelinLogo from '@/assets/stacks/openzeppelin.svg'
import firebaseLogo from '@/assets/stacks/firebase.svg'
import strapiLogo from '@/assets/stacks/strapi.svg'
import nestLoog from '@/assets/stacks/nest.svg'

const stacks = [
  ['Next.js', nextjsLogo, 'https://nextjs.org'],
  ['Wagmi', wagmiLogo, 'https://wagmi.io'],
  ['Tailwindcss', tailwindLogo, 'https://tailwindcss.com'],
  ['Framer Motion', framerLogo, 'https://www.framer.com/motion'],
  ['Node.js', nodejsLogo, 'https://nodejs.org/en'],
  ['PWA', pwaLogo, 'https://web.dev/progressive-web-apps'],
  ['Biconomy', biconomyLogo, 'https://biconomy.io'],
  ['Lens', lensLogo, 'https://lens.xyz'],
  ['Stripe', stripeLogo, 'https://stripe.com'],
  ['The Graph', thegraphLogo, 'https://thegraph.com'],
  ['Alchemy', alchemyLogo, 'https://www.alchemy.com/'],
  ['Openzeppelin', openzeppelinLogo, 'https://openzeppelin.com'],
  ['Firebase', firebaseLogo, 'https://firebase.google.com'],
  ['Strapi', strapiLogo, 'https://strapi.io'],
  ['Nest', nestLoog, 'https://nestjs.com'],
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
          <h2 className="text-md text-center font-display font-semibold tracking-wider text-neutral-950 sm:text-left">
            Some amazing technologies we love working with
          </h2>
          <div className="h-px flex-auto bg-neutral-400" />
        </FadeIn>
        <FadeInStagger faster>
          <ul role="list" className="group mt-10 grid grid-cols-3 items-center lg:grid-cols-5">
            {stacks.map(([client, logo, url]) => (
              <li
                key={client}
                className="px-8 py-4 transition-opacity duration-200 ease-in-out hover:!opacity-100 group-hover:opacity-20"
              >
                <FadeIn>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Image className="w-36" src={logo} alt={client} width={250} />
                  </a>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
