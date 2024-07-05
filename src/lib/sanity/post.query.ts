import { groq } from 'next-sanity'
import { Image, PortableTextBlock } from 'sanity'

import { client } from '@/sanity/lib/client'

export interface Post {
  id: string
  title: string
  description: string
  keywords: string
  image: Image
  author: {
    name: string
    image: Image
    websiteUrl?: string
    linkedinUrl?: string
    githubUrl?: string
  }
  body: PortableTextBlock[]
  categories: string[]
  slug: string
  publishedAt: string
}

export interface PostSlugType {
  slug: string
  updatedAt: string
}

export async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == "${slug}"][0]{
        "id": _id,
        title,
        "slug": slug.current,
        description,
        keywords,
        "image": mainImage,
        author->{name, image, websiteUrl, linkedinUrl, githubUrl},
        "categories": categories[]->,
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
  )
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc){
        "id": _id,
        title,
        "slug": slug.current,
        description,
        "image": mainImage,
        author->{name, image, websiteUrl, linkedinUrl, githubUrl},
        "tags": tags[]->,
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
  )
}

export async function getPostsbyCategory(category: string): Promise<Post[]> {
  return client.fetch(
    groq`
        *[_type == "post" && "${category}" in categories[]->title && publishedAt < now()] | order(publishedAt desc){
            "id": _id,
            title,
            "slug": slug.current,
            description,
            keywords,
            "image": mainImage,
            author->{name, image},
            "categories": categories[]->,
            publishedAt
    }`,
  )
}

export async function getAllPostsSlug(): Promise<PostSlugType[]> {
  return client.fetch(
    groq`
          *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
              "slug": slug.current,
              title,
              description,
              "image": mainImage,
              "updatedAt": _updatedAt
      }`,
  )
}
