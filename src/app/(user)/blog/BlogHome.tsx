"use client";

import { SectionWrapper } from '@/hoc'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'

const BlogHome = () => {
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

      
    </SectionWrapper>
  )
}

export default BlogHome