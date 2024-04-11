"use client";

import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'
import blogs from "@/data/blogs.json";
import BlogCard from './BlogCard';
import { BlogPage } from '@/types/blog';
import Spotlight, { SpotlightCard } from '@/components/Spotlight';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { formatDate } from '@/utils/dateUtil';
import Link from 'next/link';
import { Tilt } from 'react-tilt';
import { useRouter } from 'next/navigation';

const BlogHome = () => {
  const router = useRouter();
  
  return (
    <SectionWrapper
      idName='blog'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          My blog
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Blog.
        </h2>
      </motion.div>

      {/* About */}
      <div className="w-full flex">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A collection to share my thoughts, explorations and experiences on a variety of topics that interest me
        </motion.p>
      </div>
      
      {/* Blog Card */}
      {/* <div className="mt-10 flex flex-wrap gap-7">
        {blogs
          .map((blog: BlogPage, index: number) => (
            <BlogCard 
              key={`project-${index}`} 
              blog={blog}
              index={index}
            />
          ))}
      </div> */}

        <Spotlight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group w-full px-4 md:px-6 py-24">
          {/* Card #1 */}
          {blogs.map((blog: BlogPage, index) => {
            return (
              <motion.div 
                key={index}
                initial="hidden"
                animate="show" 
                variants={fadeIn("up", "spring", index * 0.1, 0.75)} 
                className='w-full cursor-pointer h-full'
                onClick={() => router.push(`/blog/${blog._id}`)}
              >
                <Tilt
                  options={{
                    max: 0,
                    scale: 1.03,
                    speed: 450,
                  }}
                  className="h-full"
                >
                <SpotlightCard>
                  <div className="relative h-full bg-tertiary p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                    {/* Radial gradient */}
                    <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square" aria-hidden="true">
                      <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                    </div>
                    <div className="flex flex-col h-full items-center text-center">
                      <div className="relative w-full h-[230px]">
                        {/* Work image */}
                        {blog.image
                          ? <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            sizes="100%"
                            priority={true}
                            className="w-full h-full object-cover rounded-md"
                          />
                          : <div className="w-full h-full object-cover rounded-md flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                            </svg>
                          </div>
                        }
                      </div>
                      {/* Text */}
                      <div className="grow my-5 w-full">
                        <h2 className="text-xl text-slate-200 font-bold mb-1 text-start">{blog.title}</h2>
                        <p className="text-sm text-slate-400 text-start">
                          {blog.paragraph.length > 150 ? blog.paragraph.slice(0, 150) + " ..." : blog.paragraph}
                        </p>
                      </div>
                      {/* <Link 
                        className="inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-slate-800 hover:bg-slate-900 border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" 
                        href={`/blog/${blog._id}`}
                      >
                        <svg className="fill-slate-500 mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="14">
                          <path d="M12.82 8.116A.5.5 0 0 0 12 8.5V10h-.185a3 3 0 0 1-2.258-1.025l-.4-.457-1.328 1.519.223.255A5 5 0 0 0 11.815 12H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM12.82.116A.5.5 0 0 0 12 .5V2h-.185a5 5 0 0 0-3.763 1.708L3.443 8.975A3 3 0 0 1 1.185 10H1a1 1 0 1 0 0 2h.185a5 5 0 0 0 3.763-1.708l4.609-5.267A3 3 0 0 1 11.815 4H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM1 4h.185a3 3 0 0 1 2.258 1.025l.4.457 1.328-1.52-.223-.254A5 5 0 0 0 1.185 2H1a1 1 0 0 0 0 2Z" />
                        </svg>
                        <span>Read</span>
                      </Link> */}
                    </div>

                    <div className="flex items-center gap-1 justify-end absolute bottom-4 right-4 opacity-80">
                      {/* <SvgIcon type={ICON_TYPE.CLOCK_OUTLINE} color="rgb(254 240 138)" size={18}/> */}
                      <Clock size={14} color='rgb(254 240 138)'/>
                      <p className="text-yellow-200 text-[12px]">{formatDate(blog.createDate)}</p>
                    </div>
                  </div>
                </SpotlightCard>
                </Tilt>
              </motion.div>
            ) 
          })}
        </Spotlight>
    </SectionWrapper>
  )
}

export default BlogHome