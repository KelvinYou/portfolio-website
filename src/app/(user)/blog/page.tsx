import React from 'react'
import BlogHome from './BlogHome'

import { ogMeta } from '@/constants/metadata';
import { join } from 'path';
import { promises as fs } from 'fs-extra'
import matter from 'gray-matter';

export const metadata = {
  title: 'Blog | Kelvin You',
  description: '.',
  openGraph: {
    title: 'Blog | Kelvin You',
    description: '.',
    ...ogMeta,
  },
  twitter: {
    title: 'Blog | Kelvin You',
    description: '.',
    // ...twitterMeta,
  },
}

const blogsPath = join(process.cwd(), '/src/data/blogs');

async function getBlogs() {
  const blogSlugs = await fs.readdir(blogsPath)

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath = join(blogsPath, blogSlug)
      const blogItem = await fs.readFile(postPath, 'utf-8')

      const { data: blogData } = matter(blogItem)

      return {
        title: blogData.title,
        content: blogData.description,
        date: blogData.updatedDate,
        link: `blog/${blogSlug.replace('.mdx', '')}`,
        image: blogData.image,
        slug: blogSlug.replace('.mdx', ''),
      }
    })
  )

  return blogPosts.sort((blogA, blogB) => {
    return blogB.date - blogA.date
  })
}

const BlogsPage = async () => {
  const blogItems = await getBlogs();

  return (
    <BlogHome blogItems={blogItems} />
  )
}

export default BlogsPage