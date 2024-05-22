"use client"

import ArticlePreview from '@/components/ArticlePreview';
import MdxRemoteRender from '@/components/MdxRemoteRender';
// import MdxRemoteRender from '@/components/MdxRemoteRender';
import ScalableImage from '@/components/ScalableImage';
import ScrollToTop from '@/components/ScrollToTop';
import RelatedPosts from '@/components/blog/RelatedPosts';
import CanvasLoader from '@/components/ui/CanvasLoader';
import { SectionWrapper } from '@/hoc';
import { formatDate } from '@/utils/dateUtils';
import { Calendar, ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react'

interface BlogDetailProps {
  blogData: any;
  blogContent: any;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blogData, blogContent }) => {
  const router = useRouter();
  
  const {
    title,
    description,
    image,
    createdDate,
    updatedDate,
  } = blogData;

  return (
    <SectionWrapper
      idName='blog'
    >
      <button
        onClick={() => router.push('/blog')}
        className='group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-primary focus:outline-none focus:ring'
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <ChevronsLeft />
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Back to Blogs
        </span>
                  
      </button>

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
            {image && 
              <div className="mb-10 w-full h-full overflow-hidden rounded">
                <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                  <ScalableImage
                    image={image}
                  />
                </div>
              </div>
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

export default BlogDetail