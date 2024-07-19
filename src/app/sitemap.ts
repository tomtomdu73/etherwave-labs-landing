import { MetadataRoute } from 'next'

import { ProjectSlugType, getAllProjectsSlug } from '@/lib/sanity/project.query'
import { getAllPostsSlug } from '@/lib/sanity/post.query'
import { Project } from 'next/dist/build/swc'

type SitemapItem = {
  url: string
  lastModified?: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: SitemapItem[] = []

  //add static pages
  sitemap.push({
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  })

  sitemap.push({
    url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  })

  //add post slugs
  const posts = (await getAllPostsSlug()) as ProjectSlugType[]
  console.log(posts)
  posts.map((post) => {
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  //add experience slugs
  const projects = (await getAllProjectsSlug()) as ProjectSlugType[]
  projects.map((project) => {
    sitemap.push({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  return sitemap
}
