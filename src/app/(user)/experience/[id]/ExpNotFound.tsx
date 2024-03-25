"use client"

import BackButton from '@/components/BackButton'
import SectionWrapper from '@/hoc/SectionWrapper'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'

const ExpNotFound = () => {
  return (
    <SectionWrapper
      idName='expNotFound'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className=''
      >
        <BackButton
          text='Back To Experiences'
        />

        <p className="mt-10 sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Experience Not Found
        </p>

        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          No Such Experience Found.
        </h2>

      </motion.div>
    </SectionWrapper>
  )
}

export default ExpNotFound