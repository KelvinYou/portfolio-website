"use client";

import { fadeIn, slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react'
import BaseButton from '../ui/BaseButton';
import { ChevronDown } from 'lucide-react';

export type ProgressTimelineElementType = {
  title: string;
  description: string;
  date: string;
  link?: string;
  linkTarget?: '_blank' | '_self' | '_parent' | '_top';
}

interface ProgressTimeLineProps {
  elements: ProgressTimelineElementType[];
}

function isValidPDFLink(link: any) {
  // Extract the file extension from the link
  const extension = link.split('.').pop().toLowerCase();
  // Check if the extension is 'pdf'
  return extension === 'pdf';
}

const ProgressTimeline: React.FC<ProgressTimeLineProps> = ({ elements }) => {
  const [showAll, setShowAll] = useState(false);
  
  const visibleElements = showAll ? elements : elements.slice(0, 3);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    // <motion.div 
    <>

      <div 
        className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent"
        // variants={fadeIn("", "", 0.1, 1)}
      >
        {visibleElements.map((element, index) => {
          return (
            // <motion.div 
            <div 
              key={index}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              // variants={fadeIn('', "", 0.1 * index, 1)}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-on-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {/* <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
                  <path fill-rule="nonzero" d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z" />
                </svg> */}
              </div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-tertiary p-4 rounded border border-tertiary shadow">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-white">{element.title}</div>
                  <time className="font-caveat font-medium text-on-primary min-w-20">{element.date}</time>
                </div>
                <div className="text-slate-300">{element.description}</div>
                
                {
                  element.link && (
                    <Link 
                      href={element.link} 
                      target={element.linkTarget || '_self'}
                      className="mt-5 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"

                    >
                      Learn more
                    </Link>
                  )
                }
              </div>
            </div>
            // </motion.div>
          )

        })}


      </div>

      {elements.length > 3 && (
        <div className='flex justify-center'>
          <BaseButton className='mt-4 py-2 px-8 text-sm' onClick={handleShowMore}>
            <div className='flex'>
              <span>
                Show {showAll ? `Less` : `More`}
              </span>
              
              <ChevronDown style={{ transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
          </BaseButton>
        </div>
      )}

    </>

    // </motion.div>
  )
}

export default ProgressTimeline