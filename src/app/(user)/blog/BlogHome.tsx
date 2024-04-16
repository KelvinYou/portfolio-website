"use client";

import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'
import blogs from "@/data/blogs.json";
import SpotlightGrid from '@/components/SpotlightGrid';

const BlogHome = () => {
  const blogItems: any = [];

  blogs.forEach((blog) => {
    const title = blog.title;
    const content = blog.paragraph;
    const link = `/blog/${blog._id}`;
    const image = blog.image;
    const date = blog.createDate;

    blogItems.push({
      title,
      content,
      link,
      image,
      date
    })
  })
  
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

        <SpotlightGrid items={blogItems} />
    </SectionWrapper>
  )
}

export default BlogHome