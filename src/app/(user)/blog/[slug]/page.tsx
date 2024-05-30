import React from 'react'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs-extra'
import { ogMeta, twitterMeta } from '@/constants/metadata'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'
import BlogDetail from './BlogDetail'
import { blogsPath } from '@/services/blogService'

interface BlogPageType {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: BlogPageType) {
  const { blogData } = await getBlog(params.slug)

  return {
    title: `${blogData.title} | Kelvin You`,
    description: blogData.description,
    keywords: `blog, ${blogData?.tags?.join(",")}`,
    openGraph: {
      title: `${blogData.title} | Kelvin You`,
      description: blogData.description,
      ...ogMeta,
    },
    twitter: {
      title: `${blogData.title} | Kelvin You`,
      description: blogData.description,
      // ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(blogsPath)
}

async function getBlog(blogId: string) {
  try {
    const postPath = join(blogsPath, `${blogId}.mdx`)
    const postItem = await fs.readFile(postPath, 'utf-8')

    const { content, data: frontMatter } = matter(postItem)

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
      scope: frontMatter,
    })

    return {
      blogData: frontMatter,
      blogContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

const BlogPage = async ({ params }: BlogPageType) => {
  const { blogData, blogContent } = await getBlog(params.slug);

  return (
    <BlogDetail blogData={blogData} blogContent={blogContent} />
  )
}

export default BlogPage