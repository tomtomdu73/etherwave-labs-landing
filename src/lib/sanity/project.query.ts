import { groq } from 'next-sanity'
import { Image, PortableTextBlock } from 'sanity'

import { client } from '../../../sanity/lib/client'

export interface Project {
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

export async function getProject(slug: string): Promise<Project> {
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

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(title desc){
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
