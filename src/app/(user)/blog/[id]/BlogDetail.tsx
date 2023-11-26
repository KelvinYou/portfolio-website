"use client"

import SectionWrapper from '@/hoc/SectionWrapper'
import { BlogPage, Header, Paragraph } from '@/types/blog'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC } from 'react'
import Image from 'next/image'
import { Calendar, ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TagButton from '@/components/tag/TagButton'
import BlogElementRenderer from '@/components/blog/BlogElementRenderer'
import { formatDate } from '@/utils/dateUtil'
import SharePost from '@/components/blog/SharePost'
import RelatedPosts from '@/components/blog/RelatedPosts'
import NewsLatterBox from '@/components/blog/NewsLatterBox'
import ScrollToTop from '@/components/ScrollToTop'
import SearchBox from '@/components/blog/SearchBox'
import ZoomableImage from '@/components/ZoomableImage'

interface BlogDetailProps {
  blogDetail: BlogPage;
}

const ProjectDetail: FC<BlogDetailProps> = (props) => {
  const { blogDetail } = props;
  const router = useRouter();

  const {
    author,
    title,
    image,
    paragraph,
    elements,
    relatedBlogIds,
    tags,
    createDate,
    modifyDate,
  } = blogDetail;

  return (
    <SectionWrapper
      idName='project'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
      </motion.div>
      <div>
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
        
      </div>
      <div className="-mx-4 flex flex-wrap mt-10">
        <div className="w-full px-4 lg:w-8/12">
          <div>
            <h1 className="mb-8 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight">
              {title}
            </h1>
            <div className="mb-10 flex flex-wrap items-center justify-between border-b pb-4 border-white border-opacity-10">
              <div className="flex flex-wrap items-center">
                <div className="mb-5 mr-10 flex items-center">
                  <div className="mr-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      {author[0].image && <Image
                        src={author[0].image}
                        alt="author"
                        fill
                        sizes='100%'
                        style={{objectFit:"cover"}}
                      />}
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="mb-1 text-base font-medium text-body-color">
                      By <span> {author[0].name}</span>
                    </span>
                  </div>
                </div>
                <div className="mb-5 flex items-center">
                  <p className="mr-5 flex items-center text-base font-medium text-body-color">
                    <span className='ml-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1'>
                      <span className='flex items-center'>
                        <Calendar size={14} />

                        <span className='ml-1'>{formatDate(createDate, 'long')}</span>
                        <span className='ml-1 text-sm text-on-primary'>created</span>
                      </span>

                      <span className='flex items-center'>
                        <Calendar size={14} />

                        <span className='ml-1'>{formatDate(modifyDate, 'long')}</span>
                        <span className='ml-1 text-sm text-on-primary'>last modify</span>
                      </span>
                    </span>

                  </p>
                  {/* <p className="mr-5 flex items-center text-base font-medium text-body-color">
                    <span className="mr-3">
                      <svg
                        width="18"
                        height="13"
                        viewBox="0 0 18 13"
                        className="fill-current"
                      >
                        <path d="M15.6375 0H1.6875C0.759375 0 0 0.759375 0 1.6875V10.6875C0 11.3062 0.309375 11.8406 0.84375 12.15C1.09687 12.2906 1.40625 12.375 1.6875 12.375C1.96875 12.375 2.25 12.2906 2.53125 12.15L5.00625 10.7156C5.11875 10.6594 5.23125 10.6312 5.34375 10.6312H15.6094C16.5375 10.6312 17.2969 9.87187 17.2969 8.94375V1.6875C17.325 0.759375 16.5656 0 15.6375 0ZM16.3406 8.94375C16.3406 9.3375 16.0312 9.64687 15.6375 9.64687H5.37187C5.09062 9.64687 4.78125 9.73125 4.52812 9.87187L2.05313 11.3063C1.82812 11.4187 1.575 11.4187 1.35 11.3063C1.125 11.1938 1.0125 10.9688 1.0125 10.7156V1.6875C1.0125 1.29375 1.32188 0.984375 1.71563 0.984375H15.6656C16.0594 0.984375 16.3687 1.29375 16.3687 1.6875V8.94375H16.3406Z" />
                        <path d="M12.2342 3.375H4.69668C4.41543 3.375 4.19043 3.6 4.19043 3.88125C4.19043 4.1625 4.41543 4.3875 4.69668 4.3875H12.2623C12.5435 4.3875 12.7685 4.1625 12.7685 3.88125C12.7685 3.6 12.5154 3.375 12.2342 3.375Z" />
                        <path d="M11.0529 6.55322H4.69668C4.41543 6.55322 4.19043 6.77822 4.19043 7.05947C4.19043 7.34072 4.41543 7.56572 4.69668 7.56572H11.0811C11.3623 7.56572 11.5873 7.34072 11.5873 7.05947C11.5873 6.77822 11.3342 6.55322 11.0529 6.55322Z" />
                      </svg>
                    </span>
                    50
                  </p>
                  <p className="flex items-center text-base font-medium text-body-color">
                    <span className="mr-3">
                      <svg
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                        className="fill-current"
                      >
                        <path d="M10.2559 3.8125C9.03711 3.8125 8.06836 4.8125 8.06836 6C8.06836 7.1875 9.06836 8.1875 10.2559 8.1875C11.4434 8.1875 12.4434 7.1875 12.4434 6C12.4434 4.8125 11.4746 3.8125 10.2559 3.8125ZM10.2559 7.09375C9.66211 7.09375 9.16211 6.59375 9.16211 6C9.16211 5.40625 9.66211 4.90625 10.2559 4.90625C10.8496 4.90625 11.3496 5.40625 11.3496 6C11.3496 6.59375 10.8496 7.09375 10.2559 7.09375Z" />
                        <path d="M19.7559 5.625C17.6934 2.375 14.1309 0.4375 10.2559 0.4375C6.38086 0.4375 2.81836 2.375 0.755859 5.625C0.630859 5.84375 0.630859 6.125 0.755859 6.34375C2.81836 9.59375 6.38086 11.5312 10.2559 11.5312C14.1309 11.5312 17.6934 9.59375 19.7559 6.34375C19.9121 6.125 19.9121 5.84375 19.7559 5.625ZM10.2559 10.4375C6.84961 10.4375 3.69336 8.78125 1.81836 5.96875C3.69336 3.1875 6.84961 1.53125 10.2559 1.53125C13.6621 1.53125 16.8184 3.1875 18.6934 5.96875C16.8184 8.78125 13.6621 10.4375 10.2559 10.4375Z" />
                      </svg>
                    </span>
                    35
                  </p> */}
                </div>
              </div>
              {/* <div className="mb-5">
                <a
                  href="#0"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  Design
                </a>
              </div> */}
            </div>
            <div>
              <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed text-justify">
                {paragraph}
              </p>
              {image && 
                <div className="mb-10 w-full h-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <ZoomableImage
                      image={image}
                    />
                  </div>
                </div>
              }
              
              <BlogElementRenderer elements={elements} />

              <div className="items-center justify-between sm:flex">
                <div className="mb-5">
                  <h4 className="mb-3 text-sm font-medium text-body-color">
                    Tags :
                  </h4>
                  <div className="flex items-center">
                    {tags.map((tag, index) => (
                      <TagButton 
                        key={index}
                        text={tag}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                    Share this post :
                  </h5>
                  <div className="flex items-center gap-2">
                    <SharePost />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-4/12">
          {/* <SearchBox /> */}
          
          <RelatedPosts relatedBlogIds={relatedBlogIds} />

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

          <NewsLatterBox />
        </div>
      </div>

      <ScrollToTop />
    </SectionWrapper>
  )
}

export default ProjectDetail