import { groq } from 'next-sanity'
import { Image } from 'sanity'

import { sanityFetch } from '@/sanity/lib/client'

export interface ProjectType {
  id: string
  title: string
  description: string
  services: string
  image: Image
  logo: Image
  projectUrl: string
  stacks: string[]
  tags: string[]
  slug: string
  startAt: string
  endAt?: string
}

export interface ProjectSlugType {
  slug: string
  updatedAt: string
}

export async function getProject(slug: string): Promise<ProjectType> {
  return sanityFetch<ProjectType>({
    query: groq`*[_type == "project" && slug.current == "${slug}"][0]{
        "id": _id,
        title,
        "slug": slug.current,
        description,
        services,
        image,
        logo,
        projectUrl,
        "stacks": stacks[]->title,
        "tags": tags[]->title,
        startAt,
        endAt,
      }`,
    tags: ['project'],
    qParams: { slug },
  })
}

export async function getProjects(): Promise<ProjectType[]> {
  return sanityFetch<ProjectType[]>({
    query: groq`*[_type == "project"] | order(endDate desc){
        "id": _id,
        title,
        "slug": slug.current,
        description,
        services,
        image,
        logo,
        projectUrl,
        "stacks": stacks[]->title,
        "tags": tags[]->title,
        startAt,
        endAt,
      }`,
    tags: ['project'],
  })
}

export async function getAllProjectsSlug(): Promise<ProjectSlugType[]> {
  return sanityFetch<ProjectSlugType[]>({
    query: groq`
          *[_type == "project"] {
              "slug": slug.current,
              "updatedAt": _updatedAt
      }`,
    tags: ['project'],
  })
}
