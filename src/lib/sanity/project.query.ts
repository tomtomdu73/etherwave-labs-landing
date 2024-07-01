import { groq } from 'next-sanity'
import { Image, PortableTextBlock } from 'sanity'

import { client } from '../../../sanity/lib/client'

export interface ProjectType {
  id: string
  title: string
  description: string
  image: Image
  logo: Image
  projectUrl: string
  stacks: string[]
  slug: string
  startAt: string
  endAt: string
}

export interface ProjectSlugType {
  slug: string
  updatedAt: string
}

export async function getProject(slug: string): Promise<ProjectType> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == "${slug}"][0]{
        "id": _id,
        title,
        "slug": slug.current,
        description,
        image,
        logo,
        projectUrl,
        "stacks": stacks[]->title,
        startAt,
        endAt,
      }`,
  )
}

export async function getProjects(): Promise<ProjectType[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(endDate desc){
        "id": _id,
        title,
        "slug": slug.current,
        description,
        image,
        logo,
        projectUrl,
        "stacks": stacks[]->title,
        startAt,
        endAt,
      }`,
  )
}

export async function getAllProjectsSlug(): Promise<ProjectSlugType[]> {
  return client.fetch(
    groq`
          *[_type == "project"] {
              "slug": slug.current,
              "updatedAt": _updatedAt
      }`,
  )
}
