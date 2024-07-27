import {
  CodeBracketIcon,
  ServerStackIcon,
  CursorArrowRaysIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import backendPhoto from '@/assets/images/backend.jpg'
import codingPhoto from '@/assets/images/coding.jpg'
import consultingPhoto from '@/assets/images/consulting.jpg'
import userInterfacePhoto from '@/assets/images/user-interface.jpg'

const items = [
  {
    title: 'User Interfaces and Onboarding for Web3',
    description:
      'Transform your ideas into reality with modern front-end applications using the best stacks for your case, seamlessly integrated with web3 features.',
    header: userInterfacePhoto,
    headerClassName: 'object-top',
    className: 'md:col-span-2',
    icon: <CursorArrowRaysIcon className="h-8 w-8 text-brand-400/60" />,
  },
  {
    title: 'Smart Contracts',
    description:
      'We craft highly tested and secure smart contracts, deployable on any EVM-compatible blockchain.',
    header: codingPhoto,
    headerClassName: 'object-top',
    className: 'md:col-span-1',
    icon: <CodeBracketIcon className="h-8 w-8 text-brand-400/60" />,
  },
  {
    title: 'Consulting',
    description:
      'Navigate the complexities of web3 and blockchain technology with our expert consulting services.',
    header: consultingPhoto,
    headerClassName: 'object-top',
    className: 'md:col-span-1',
    icon: <InformationCircleIcon className="h-8 w-8 text-brand-400/60" />,
  },
  {
    title: 'Backend Development',
    description:
      'Our backend development services cover databases, scripts, bots, and CI/CD pipelines. We create scalable and resilient infrastructures tailored to your needs, ensuring smooth and efficient operations.',
    header: backendPhoto,
    headerClassName: 'object-center',
    className: 'md:col-span-2',

    icon: <ServerStackIcon className="h-8 w-8 text-brand-400/60" />,
  },
]

export function Services() {
  return (
    <>
      <SectionIntro
        // eyebrow="Services"
        title="What we do"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We help startups and enterprises design, build and ship innovative blockchain solutions,
          fast.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <BentoGrid className="md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              headerClassName={item.headerClassName}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </Container>
    </>
  )
}
