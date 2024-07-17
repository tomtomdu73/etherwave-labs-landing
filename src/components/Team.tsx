import Image from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { urlForImage } from '@/sanity/lib/image'
import { AuthorType } from '@/lib/sanity/author.query'
import { GitHubIcon, LinkedinIcon } from './SocialMedia'

function TeamCard({ person }: { person: AuthorType }) {
  return (
    <li
      key={person.id}
      className="relative rounded-3xl p-6 ring-1 ring-neutral-950/5 transition ease-in-out hover:bg-brand-100/50 sm:p-4"
    >
      <FadeIn>
        <div className="flex flex-col items-center">
          <Image
            width={200}
            height={200}
            alt=""
            src={urlForImage(person.image)}
            className="mx-auto h-48 w-48 rounded-full object-cover md:h-56 md:w-56"
          />
          <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight text-brand-400">
            {person.name}
          </h3>
          <p className="text-base leading-6">{person.bio}</p>
          <ul role="list" className="mt-6 flex justify-center gap-x-6">
            <li key={`github-${person.id}`}>
              <a href={person.github} className="" target="_blank">
                <span className="sr-only">Github</span>
                <GitHubIcon
                  className="h-8 w-8 text-brand-500 hover:text-brand-400"
                  fill="currentColor"
                />
              </a>
            </li>
            <li key={`linkedin-${person.id}`}>
              <a
                href={person.linkedin}
                className="text-gray-400 hover:text-gray-300"
                target="_blank"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedinIcon
                  className="h-8 w-8 text-brand-500 hover:text-brand-400"
                  fill="currentColor"
                />
              </a>
            </li>
          </ul>
        </div>
      </FadeIn>
    </li>
  )
}

export default function Team({ members }: { members: AuthorType[] }) {
  return (
    <>
      <SectionIntro
        // eyebrow="Services"
        title="Meet our Team"
        className="mx-auto mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Our team at Etherwave Labs brings together over 10 years of experience in the software
          development field, having worked with international clients and on diverse projects across
          the globe.
        </p>
      </SectionIntro>
      <Container className="mt-8">
        <div className="space-y-24">
          <FadeInStagger>
            <div className="pt-12 sm:pt-16 xl:gap-8">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {members.map((person) => (
                  <TeamCard person={person} />
                ))}
              </ul>
            </div>
          </FadeInStagger>
        </div>
      </Container>
    </>
  )
}
