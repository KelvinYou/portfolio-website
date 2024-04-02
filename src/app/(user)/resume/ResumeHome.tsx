"use client";

import { SectionWrapper } from '@/hoc'
import useBrowserAndOSInfo from '@/hooks/useBrowserAndOsInfo';
import { getBrowserAndOSInfo, BrowserInfo } from '@/utils/deviceInfoUtil';
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const ResumeHome = () => {
  const browserInfo = useBrowserAndOSInfo();

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
          My resume
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Resume.
        </h2>
      </motion.div>

      <div className='mt-4 mx-auto w-fit'>
        <button 
          className='rounded-md px-6 py-3 text-md bg-on-primary text-primary 
          shadow-sm flex gap-2 items-center'
        >
          Download
          <Download size={16} />
        </button>
      </div>
    </SectionWrapper>
  )
}

export default ResumeHome