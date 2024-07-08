import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import Stacks from '@/components/Stacks'
import Team from '@/components/Team'

import imageLaptop from '@/assets/images/laptop.jpg'

import { ProjectType, getProjects } from '@/lib/sanity/project.query'
import { AuthorType, getAuthors } from '@/lib/sanity/author.query'
import { urlForImage } from '@/sanity/lib/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <>
      <SectionIntro title="Diverse Projects, Proven Success" className="mt-24 sm:mt-32 lg:mt-80">
        <p>
          Explore some of the groundbreaking projects we've developed and see how Etherwave Labs has
          helped businesses achieve their goals in the blochchain space.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project) => {
            const date = project.endAt ?? project.startAt

            return (
              <FadeIn key={project.slug} className="flex">
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition ease-in-out hover:bg-brand-100/50 sm:p-8">
                  <h3>
                    <Link href={'projects/' + project.slug}>
                      <span className="absolute inset-0 rounded-3xl" />
                      <Image
                        src={urlForImage(project.logo)}
                        width={400}
                        height={400}
                        alt={project.logo.alt}
                        className="h-16 w-16"
                        unoptimized
                      />
                    </Link>
                  </h3>
                  <p className="mt-6 flex items-center gap-x-2 text-sm text-neutral-950">
                    <time dateTime={moment(date).format('YYYY')}>
                      {moment(date).format('YYYY')}
                    </time>
                    <span className="text-neutral-300" aria-hidden="true">
                      /
                    </span>
                    {project.tags.map((tag, index) => {
                      return (
                        <span key={`tag-${index}`} className="text-lg font-medium text-brand-400">
                          #{project.tags}
                        </span>
                      )
                    })}
                  </p>
                  <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    {project.title}
                  </p>
                  <p className="mt-4 text-lg text-neutral-600">{project.description}</p>
                </article>
              </FadeIn>
            )
          })}
          <FadeIn key="viewAll" className="lg:col-span-3">
            <Link
              href="/projects"
              className="group flex w-full items-center justify-end gap-2 font-display font-medium duration-200 ease-in-out hover:text-brand-400"
            >
              View all projects
              <ArrowLongRightIcon className="h-6 w-6 transition-all duration-200 ease-in-out group-hover:translate-x-2" />
            </Link>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        // eyebrow="Services"
        title="Our Services"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We are committed to driving innovation and excellence in the blockchain space. Our mission
          is to provide top-tier development services that empower businesses to harness the full
          potential of decentralized technologies.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="dApp Development">
              Transform your ideas into reality with modern front-end applications using Next.js and
              TailwindCSS, seamlessly integrated with web3 features. Our dApps offer a user-friendly
              interface and robust performance for an engaging user experience.
            </ListItem>
            <ListItem title="Smart Contract Development">
              We craft highly secure smart contracts using Hardhat and Foundry, deployable on any
              EVM-compatible blockchain. Trust Etherwave Labs to build and audit your smart
              contracts, ensuring maximum security and reliability.
            </ListItem>
            <ListItem title="Backend Development">
              Our backend development services cover databases, scripts, bots, and CI/CD pipelines.
              We create scalable and resilient infrastructures tailored to your needs, ensuring
              smooth and efficient operations.
            </ListItem>
            <ListItem title="Web3/Blockchain Consulting">
              Navigate the complexities of web3 and blockchain technology with our expert consulting
              services. We provide insightful guidance and practical solutions to help you achieve
              your goals and maximize your potential in the decentralized world.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are an blockchain development agency focused on helping clients transitionning to web3 smoothly.',
}

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3) as ProjectType[]
  const authors = (await getAuthors()) as AuthorType[]

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Your Gateway to Next-Generation Blockchain Solutions
          </h1>
          <p className="mt-6 text-2xl text-neutral-600">
            At Etherwave Labs, we build <u>cutting-edge dApps</u>, secure <u>smart contracts</u>,
            and robust <u>backend solutions</u>. Harness the power of blockchain and web3 with our
            expert development and consulting services.
          </p>
        </FadeIn>
      </Container>

      <Projects projects={projects} />

      <Stacks />

      <Services />

      <Team members={authors} />

      <ContactSection />
    </>
  )
}
