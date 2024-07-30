import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import moment from 'moment'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Post, getPosts } from '@/lib/sanity/post.query'
import { urlForImage } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Blog() {
  const articles = (await getPosts()) as Post[]

  return (
    <>
      <PageIntro eyebrow="Blog" title="The latest articles and news">
        <p>
          Welcome to the Etherwave Labs Blog, your source for the latest news, insights, and
          tutorials in the blockchain industry. Whether you're a seasoned professional or a curious
          newcomer, find valuable information to expand your understanding and capabilities in
          blockchain technology.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {articles.map((article) => (
            <FadeIn key={article.id}>
              <article>
                <Border className="px-4 py-16 transition ease-in-out hover:bg-brand-100/50">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={'blog/' + article.slug}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <Link
                          href={'blog/' + article.slug}
                          className="transition-all hover:opacity-80"
                        >
                          <Image
                            width={1000}
                            height={1000}
                            src={urlForImage(article.image)}
                            alt=""
                            unoptimized
                          />
                        </Link>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between pr-10">
                        <div className="flex items-center gap-x-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                            <time dateTime={article.publishedAt}>
                              Published on{' '}
                              <strong>{moment(article.publishedAt).format('MMMM D, YYYY')}</strong>{' '}
                              by{' '}
                            </time>
                          </dd>
                          <dt className="sr-only">Author</dt>
                          <dd className="flex gap-x-4">
                            <div className="inline-flex items-center gap-2">
                              <Image
                                alt=""
                                width={100}
                                height={100}
                                src={urlForImage(article.author.image)}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                              <span className="font-semibold">{article.author.name}</span>
                            </div>
                          </dd>
                        </div>
                        <Button
                          href={'blog/' + article.slug}
                          aria-label={`Read more: ${article.title}`}
                        >
                          Read more
                        </Button>
                      </div>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
