import { groq } from 'next-sanity'
import { Image, PortableTextBlock } from 'sanity'

import { sanityFetch } from '@/sanity/lib/client'

export interface Post {
  id: string
  title: string
  description: string
  keywords: string
  image: Image
  tags: string[]
  author: {
    name: string
    image: Image
    websiteUrl?: string
    linkedinUrl?: string
    githubUrl?: string
  }
  body: PortableTextBlock[]
  slug: string
  publishedAt: string
}

export interface PostSlugType {
  slug: string
  updatedAt: string
}

export async function getPost(slug: string): Promise<Post> {
  return sanityFetch<Post>({
    query: groq`*[_type == "post" && slug.current == "${slug}"][0]{
        "id": _id,
        title,
        "slug": slug.current,
        description,
        keywords,
        "image": mainImage,
        author->{name, image, websiteUrl, linkedinUrl, githubUrl},
        "tags": tags[]->title,
        body[]{
            ...,
            markDefs[]{
                ...,
                _type == "internalLink" => {
                    "slug": @.reference->slug
                }
            }
        },
        publishedAt
      }`,
    tags: ['post'],
    qParams: { slug },
  })
}

export async function getPosts(): Promise<Post[]> {
  return sanityFetch<Post[]>({
    query: groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc){
        "id": _id,
        title,
        "slug": slug.current,
        description,
        "image": mainImage,
        author->{name, image, websiteUrl, linkedinUrl, githubUrl},
        "tags": tags[]->title,
        body[]{
            ...,
            markDefs[]{
                ...,
                _type == "internalLink" => {
                    "slug": @.reference->slug
                }
            }
        },
        publishedAt
      }`,
    tags: ['post'],
  })
}

export async function getPostsbyCategory(category: string): Promise<Post[]> {
  return sanityFetch<Post[]>({
    query: groq`
        *[_type == "post" && "${category}" in tags[]->title && publishedAt < now()] | order(publishedAt desc){
            "id": _id,
            title,
            "slug": slug.current,
            description,
            keywords,
            "image": mainImage,
            author->{name, image},
            "tags": tags[]->title,
            publishedAt
    }`,
    tags: ['post'],
  })
}

export async function getAllPostsSlug(): Promise<PostSlugType[]> {
  return sanityFetch<PostSlugType[]>({
    query: groq`
          *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
              "slug": slug.current,
              title,
              description,
              "image": mainImage,
              "updatedAt": _updatedAt
      }`,
    tags: ['post'],
  })
}
