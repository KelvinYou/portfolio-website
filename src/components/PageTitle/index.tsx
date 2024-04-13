"use client";

import { fadeIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import React, { FC } from 'react'
import HighlightText from '../common/HighlightedText';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  description?: string | string[];
  highLightedTexts?: string[];
  className?: string;
}

const PageTitle: FC<PageTitleProps> = ({ title, subtitle, description, highLightedTexts, className }) => {
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
        <div className="w-full">
          {typeof description === 'string' &&           
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              <HighlightText
                text={description}
                highlightedTexts={highLightedTexts}
              />
            </motion.p>
          }

          {(Array.isArray(description) && typeof description[0] === 'string') &&
            description.map((desc, index) => {
              return (
                <motion.p
                  key={index}
                  initial="hidden"
                  animate="show"
                  variants={fadeIn("", "", 0.1, 1)}
                  className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
                >
                  <HighlightText
                    text={desc}
                    highlightedTexts={highLightedTexts}
                  />
                </motion.p>
              )
            })
          }
        </div>
      }

    </>

  )
}

export default PageTitle