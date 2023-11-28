"use client";

import { SectionWrapper } from '@/hoc'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'

const GrowthJourneyHome = () => {
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
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          My soft skills
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Growth Journey.
        </h2>
      </motion.div>

      
    </SectionWrapper>
  )
}

export default GrowthJourneyHome