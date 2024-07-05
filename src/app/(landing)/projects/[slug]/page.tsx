import moment from 'moment'
import { Metadata, ResolvingMetadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { ProjectType, getProject } from '@/lib/sanity/project.query'
import { urlForImage } from '@/sanity/lib/image'

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = (await getProject(params.slug)) as ProjectType

  return {
    title: article.title + ' - Etherwave Labs',
    description: article.description,
    openGraph: {
      title: article.title + ' - Etherwave Labs',
      description: article.description,
      url: `${process.env.APP_URL}/blog/${params.slug}`,
      siteName: 'Etherwave Labs',
      images: [
        {
          url: urlForImage(article.image),
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title + ' - Etherwave Labs',
      description: article.description,
      images: [urlForImage(article.image)],
    },
  }
}

export default async function Project({ params }: { params: { slug: string } }) {
  // let allCaseStudies = await loadCaseStudies()
  // let moreCaseStudies = allCaseStudies.filter(({ metadata }) => metadata !== caseStudy).slice(0, 2)

  const project = (await getProject(params.slug)) as ProjectType

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Case Study" title={project.title} centered>
            <p>{project.description}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{project.title}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Year</dt>
                      <dd>
                        <time dateTime={moment(project.endAt).format('YYYY')}>
                          {moment(project.endAt).format('YYYY')}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Service</dt>
                      <dd>{project.services}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                <GrayscaleTransitionImage
                  width={1400}
                  height={1400}
                  src={urlForImage(project.image)}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </header>
      </article>

      {/* {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )} */}

      <ContactSection />
    </>
  )
}
