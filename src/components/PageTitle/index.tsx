"use client";

import { fadeIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import React, { FC } from 'react'

interface PageTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, subtitle, description, className }) => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className={className}
      >
        {subtitle && <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          {subtitle}
        </p>}

        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          {title}
        </h2>
        
      </motion.div>

      {description &&       
        <div className="w-full flex">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            {description}
          </motion.p>
        </div>
      }
    </>

  )
}

export default PageTitle