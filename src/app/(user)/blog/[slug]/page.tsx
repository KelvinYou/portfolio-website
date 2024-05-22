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

interface BlogPageType {
  params: {
    slug: string;
  }
}


// export async function generateMetadata({ params }: BlogPageType) {
//   const { blogData } = await getPost(params)

//   return {
//     title: `${blogData.title} | HyperUI`,
//     description: blogData.description,
//     openGraph: {
//       title: `${blogData.title} | HyperUI`,
//       description: blogData.description,
//       ...ogMeta,
//     },
//     twitter: {
//       title: `${blogData.title} | HyperUI`,
//       description: blogData.description,
//       // ...twitterMeta,
//     },
//   }
// }

// export async function generateStaticParams() {
//   return await fs.readdir(postsPath)
// }

const postsPath = join(process.cwd(), '/src/data/blogs')

async function getBlog(blogId: string) {
  try {
    const postPath = join(postsPath, `${blogId}.mdx`)
    const postItem = await fs.readFile(postPath, 'utf-8')

    const { content, data: frontmatter } = matter(postItem)

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
      },
      scope: frontmatter,
    })

    return {
      blogData: frontmatter,
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