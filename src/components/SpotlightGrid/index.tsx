"use client";

import { BlogPage } from '@/types/blog'
import { fadeIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import router from 'next/router'
import React from 'react'
import { Tilt } from 'react-tilt'
import { Clock } from 'lucide-react';
import Spotlight, { SpotlightCard } from '../Spotlight'
import Image from 'next/image';
import { formatDate } from '@/utils/dateUtil';

const SpotlightGrid = ({ blogs }: { blogs: BlogPage[] }) => {
  
  return (
    <Spotlight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group w-full px-4 md:px-6 py-12">
    {/* Card #1 */}
    {blogs.map((blog: BlogPage, index) => (
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
                  {blog.image
                    ? <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="100%"
                      priority={true}
                      className="w-full h-full object-cover rounded-md" />
                    : <div className="w-full h-full object-cover rounded-md flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                      <svg className="w-10 h-10 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>}
                </div>
                {/* Text */}
                <div className="grow my-5 w-full">
                  <h2 className="text-xl text-slate-200 font-bold mb-1 text-start line-clamp-1">{blog.title}</h2>
                  <p className="text-sm text-slate-400 text-start line-clamp-3">
                    {blog.paragraph}
                  </p>
                </div>
              </div>

              <time className="flex items-center gap-1 justify-end absolute bottom-4 right-4 opacity-80">
                <Clock size={14} color='rgb(254 240 138)' />
                <p className="text-yellow-200 text-[12px]">{formatDate(blog.createDate)}</p>
              </time>
            </div>
          </SpotlightCard>
        </Tilt>
      </motion.div>
    ))}
  </Spotlight>
  )
}

export default SpotlightGrid