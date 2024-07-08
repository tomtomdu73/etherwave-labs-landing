import Image from 'next/image'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { urlForImage } from '@/sanity/lib/image'

export default function Team({ members }: { members: AuthorType[] }) {
  return (
    <>
      <SectionIntro
        // eyebrow="Services"
        title="Meet our Team"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        {/* <p>
          We are committed to driving innovation and excellence in the blockchain space. Our mission
          is to provide top-tier development services that empower businesses to harness the full
          potential of decentralized technologies.
        </p> */}
      </SectionIntro>
      <Container className="mt-24">
        <div className="space-y-24">
          <FadeInStagger>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">Developers</h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {members.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            width={200}
                            height={200}
                            alt=""
                            src={urlForImage(person.image)}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">{person.bio}</p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        </div>
      </Container>
    </>
  )
}
