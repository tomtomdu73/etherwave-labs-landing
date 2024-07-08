import { groq } from 'next-sanity'
import { Image } from 'sanity'

import { sanityFetch } from '@/sanity/lib/client'

export interface AuthorType {
  id: string
  name: string
  image: Image
  bio: string
  linkedin: string
  github: string
}

export async function getAuthors(): Promise<AuthorType[]> {
  return sanityFetch<AuthorType[]>({
    query: groq`*[_type == "author"] {
        "id": _id,
        name,
        image,
        bio,
        "linkedin": linkedinUrl,
        "github": githubUrl,
      }`,
    tags: ['author'],
  })
}
