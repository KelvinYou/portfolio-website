import React, { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs-extra'
import { ogMeta } from '@/constants/metadata'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import matter from 'gray-matter'
import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'
import { blogsPath } from '@/services/blogService'
import SectionWrapper from '@/hoc/SectionWrapper'
import BackButton from '@/components/BackButton'
import MdxRemoteRender from '@/components/MdxRemoteRender'
import ScalableImage from '@/components/ScalableImage'
import ScrollToTop from '@/components/ScrollToTop'
import RelatedPosts from '@/components/blog/RelatedPosts'
import CanvasLoader from '@/components/ui/CanvasLoader'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utils/dateUtils'

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

  const {
    title,
    description,
    images,
    createdDate,
    updatedDate,
  } = blogData;

  return (
    <SectionWrapper
      idName='blog'
    >
      <BackButton path='/blog' text='Back to Blog' />

      <div className="-mx-4 flex flex-wrap mt-10">
        <div className="w-full px-4 lg:w-8/12">
          <div>
            <h1 className="mb-8 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight">
              {title}
            </h1>
          </div>
          <div className="mb-10 flex flex-wrap items-center justify-between border-b pb-4 border-white border-opacity-10">
            <div className="flex flex-wrap items-center">
              <div className="mb-5 flex items-center">
                <p className="mr-5 flex items-center text-base font-medium text-body-color">
                  <span className='ml-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1'>
                    <span className='flex items-center'>
                      <Calendar size={14} />

                      <span className='ml-1'>{formatDate(createdDate, 'DD MMM YYYY')}</span>
                      <span className='ml-1 text-sm text-on-primary'>Published</span>
                    </span>

                    <span className='flex items-center'>
                      <Calendar size={14} />

                      <span className='ml-1'>{formatDate(updatedDate, 'DD MMM YYYY')}</span>
                      <span className='ml-1 text-sm text-on-primary'>Modified</span>
                    </span>
                  </span>

                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed text-justify">
              {description}
            </p>
            {images?.length > 0 && 
              <>
                <div className="mb-10 w-full h-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <ScalableImage
                      image={images[0]}
                    />
                  </div>
                </div>

                {/* <div className="flex gap-2">
                  {images.length > 1 && images.map((image: string, index: string) => (
                    <Image
                      key={index}
                      src={image}
                      alt={index + image}
                      // fill
                      width={128}
                      height={128}
                      // onClick={}
                    />
                  ))}
                </div> */}

              </>

            }
            <div className='prose'>
              <Suspense fallback={<CanvasLoader />}>
                <MdxRemoteRender mdxSource={blogContent} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:w-4/12">
          {/* <SearchBox /> */}
          
          <RelatedPosts relatedBlogIds={[]} />

          <div className="bg-gray-dark mb-10 rounded-sm  shadow-none">
            <h3 className="border-b px-8 py-4 text-lg font-semibold border-white border-opacity-10 text-white">
              Popular Category
            </h3>
            <p className='px-8 py-6 text-body-color'>
              Will release soon
            </p>
            {/* <ul className="px-8 py-6">
              <li>
                <a
                  href="#0"
                  className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                >
                  Tailwind Templates
                </a>
              </li>
              <li>
                <a
                  href="#0"
                  className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                >
                  Landing page
                </a>
              </li>
              <li>
                <a
                  href="#0"
                  className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                >
                  Startup
                </a>
              </li>
              <li>
                <a
                  href="#0"
                  className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="#0"
                  className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                >
                  Multipurpose
                </a>
              </li>
            </ul> */}
          </div>
          <div className="bg-gray-dark mb-10 rounded-sm shadow-none">
            <h3 className="border-b  px-8 py-4 text-lg font-semibold  border-white border-opacity-10 text-white">
              Popular Tags
            </h3>
            <div className="flex flex-wrap px-8 py-6">
              <p className='text-body-color'>Will release soon</p>
              {/* <TagButton text="Themes" />
              <TagButton text="UI Kit" />
              <TagButton text="Tailwind" />
              <TagButton text="Startup" />
              <TagButton text="Business" /> */}
            </div>
          </div>

          {/* <NewsLatterBox /> */}
        </div>
      </div>

      <ScrollToTop />
    </SectionWrapper>
  )
}

export default BlogPage