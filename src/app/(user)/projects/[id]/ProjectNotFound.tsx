"use client"

import SectionWrapper from '@/hoc/SectionWrapper'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProjectNotFound = () => {
  const router = useRouter();

  return (
    <SectionWrapper
      idName='ProjectNotFound'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className=''
      >

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

        <p className="mt-10 sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Blog Not Found
        </p>

        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          No Such Blog Found.
        </h2>

      </motion.div>
    </SectionWrapper>
  )
}

export default ProjectNotFound