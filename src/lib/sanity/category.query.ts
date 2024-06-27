import { groq } from 'next-sanity'
import { client } from '../../../sanity/lib/client'

export interface Category {
  id: string
  title: string
  description: string
  slug: string
}

export async function getCategory(slug: string): Promise<Category> {
  return client.fetch(
    groq`*[_type == "category" && slug.current == "${slug}"][0]{
            "id": _id,
            title,
            "slug": slug.current,
            description
      }`,
  )
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
          "id": _id,
          title,
          "slug": slug.current,
          description
    }`,
  )
}
