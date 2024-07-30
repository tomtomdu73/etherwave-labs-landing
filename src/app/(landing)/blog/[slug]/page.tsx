import moment from 'moment'
import { PortableText } from 'next-sanity'
import { Metadata, ResolvingMetadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Post, getPost } from '@/lib/sanity/post.query'
import { urlForImage } from '@/sanity/lib/image'
import { ptComponents } from './helper'
import Image from 'next/image'

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = (await getPost(params.slug)) as Post

  return {
    title: article.title + ' - Etherwave Labs',
    description: article.description,
    authors: [{ name: article.author.name }],
    keywords: article.keywords,
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
      creator: article.author.name,
      images: [urlForImage(article.image)],
    },
  }
}

export default async function Article({ params }: { params: { slug: string } }) {
  const article = (await getPost(params.slug)) as Post

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto mb-20 flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {article.title}
            </h1>
            <time dateTime={article.publishedAt} className="order-first text-sm text-neutral-950">
              {moment(article.publishedAt).format('MMMM D, YYYY')}
            </time>
            <div className="mt-6 text-sm font-semibold text-neutral-950">
              {' '}
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
            </div>
          </header>
        </FadeIn>

        <FadeIn className="mx-auto max-w-4xl">
          <PortableText value={article.body} components={ptComponents} />
        </FadeIn>
      </Container>
      {/* 
      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )} */}

      <ContactSection />
    </>
  )
}
