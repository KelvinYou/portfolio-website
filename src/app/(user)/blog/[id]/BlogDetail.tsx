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
            <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
              {title}
            </h1>
            <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
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
                    <Calendar size={14} />

                    <span className='ml-1'>
                      {formatDate(createDate, 'long')}
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
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={image}
                      alt="image"
                      fill
                      sizes="100%"
                      className="h-full w-full object-cover object-center"
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
                  <div className="flex items-center sm:justify-end">
                    <SharePost />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <div className="shadow-three dark:bg-gray-dark mb-10 mt-12 rounded-sm bg-white p-6 dark:shadow-none lg:mt-0">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search here..."
                className="border-stroke dark:text-body-color-dark dark:shadow-two mr-4 w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
              />
              <button
                aria-label="search button"
                className="flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-sm bg-primary text-white"
              >
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4062 16.8125L13.9375 12.375C14.9375 11.0625 15.5 9.46875 15.5 7.78125C15.5 5.75 14.7188 3.875 13.2812 2.4375C10.3438 -0.5 5.5625 -0.5 2.59375 2.4375C1.1875 3.84375 0.40625 5.75 0.40625 7.75C0.40625 9.78125 1.1875 11.6562 2.625 13.0937C4.09375 14.5625 6.03125 15.3125 7.96875 15.3125C9.875 15.3125 11.75 14.5938 13.2188 13.1875L18.75 17.6562C18.8438 17.75 18.9688 17.7812 19.0938 17.7812C19.25 17.7812 19.4062 17.7188 19.5312 17.5938C19.6875 17.3438 19.6562 17 19.4062 16.8125ZM3.375 12.3438C2.15625 11.125 1.5 9.5 1.5 7.75C1.5 6 2.15625 4.40625 3.40625 3.1875C4.65625 1.9375 6.3125 1.3125 7.96875 1.3125C9.625 1.3125 11.2812 1.9375 12.5312 3.1875C13.75 4.40625 14.4375 6.03125 14.4375 7.75C14.4375 9.46875 13.7188 11.125 12.5 12.3438C10 14.8438 5.90625 14.8438 3.375 12.3438Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <RelatedPosts relatedBlogIds={relatedBlogIds} />

          <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
            <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
              Popular Category
            </h3>
            <ul className="px-8 py-6">
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
            </ul>
          </div>
          <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
            <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
              Popular Tags
            </h3>
            <div className="flex flex-wrap px-8 py-6">
              <TagButton text="Themes" />
              <TagButton text="UI Kit" />
              <TagButton text="Tailwind" />
              <TagButton text="Startup" />
              <TagButton text="Business" />
            </div>
          </div>

          <NewsLatterBox />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ProjectDetail