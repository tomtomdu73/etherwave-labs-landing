import Image from 'next/image'
import Link from 'next/link'
import { PortableTextComponents } from '@portabletext/react'

import { urlForImage } from '../../../../../sanity/lib/image'
import CodeHighlighter from '@/components/CodeHighlighter'
import { ImageZoom } from '@/components/ImageZoom'
import YoutubeVideo from '@/components/YoutubeVideo'

export const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <ImageZoom>
          <figure className="my-10 flex flex-col items-center">
            <Image
              className="w-1/2 rounded-sm bg-gray-50 object-cover ring-2 ring-lime-200"
              src={urlForImage(value).url()}
              alt={value.alt}
              width={800}
              height={400}
            />
            {/* <figcaption className="mt-4 text-sm leading-6 text-gray-500">
                        <i>Faucibus commodo massa rhoncus, volutpat.</i>
                    </figcaption> */}
          </figure>
        </ImageZoom>
      )
    },
    code: ({ value }: { value: any }) => {
      return (
        <CodeHighlighter
          code={value.code}
          language={value.language}
          filename={value.filename}
        />
      )
    },
    youtubeVideo: ({ value }: { value: any }) => {
      const { url } = value

      return <YoutubeVideo url={url} />
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mb-5 mt-8 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="my-5 text-xl font-semibold tracking-tight text-zinc-800 sm:text-xl dark:text-zinc-200">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h3 className="text-md sm:text-md mt-10 font-semibold tracking-tight text-zinc-800 dark:text-zinc-200">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p className="my-3">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mx-8">{children}</ul>,
    number: ({ children }) => <ol className="mx-8">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-2 list-disc">{children}</li>,
    number: ({ children }) => <li className="my-2 list-decimal">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <span className="font-semibold">{children}</span>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <a
          className="transition-color text-lime-600 duration-150 ease-in-out hover:text-lime-500 dark:text-lime-300 dark:hover:text-lime-200"
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : 'undefined'}
        >
          {children}
        </a>
      )
    },
    internalLink: ({ value, children }) => {
      const { slug = {} } = value
      const href = `/blog/${slug.current}`
      return (
        <Link
          className="transition-color text-lime-600 duration-150 ease-in-out hover:text-lime-500 dark:text-lime-300 dark:hover:text-lime-200"
          href={href}
        >
          {children}
        </Link>
      )
    },
  },
}
