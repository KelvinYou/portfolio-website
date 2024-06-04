"use client";

import { SectionWrapper } from '@/hoc'
import useBrowserAndOSInfo from '@/hooks/useBrowserAndOsInfo';
import { Download, Link as LinkIcon } from 'lucide-react';
import React from 'react'
import { PdfDownloader, PdfViewer } from '@/components/PdfRenderer';
import ResumePdfNew from './_components/ResumePdfNew';
import { MOBILE_OS_KEY } from '@/hooks/useBrowserAndOsInfo/constants';
import Link from 'next/link';
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const ResumeHome = () => {
  const browserInfo = useBrowserAndOSInfo();
  const isMobile = MOBILE_OS_KEY.includes(browserInfo.os.key);

  // const ResumeElement = ResumePdf;
  const ResumeElement = ResumePdfNew;

  return (
    <SectionWrapper
      idName='project'
      title='Resume'
      subtitle='My public resume'
    >

      {isMobile && 
        <div role="alert" className="rounded border-s-4 border-[#e6a700] bg-[#4d3800] p-4 mt-4">
          <div className="flex items-center gap-2 text-[#e6a700]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium"> Warning: Invalid PDF viewer </strong>
          </div>

          <p className="mt-2 text-sm text-[#ffeebd]">
            Your browser may not have a built-in PDF viewer. Please try clicking the "Download Resume" button above to download it.
          </p>
        </div>
      }
      <motion.div 
        className='flex w-full justify-center gap-x-2'
        variants={fadeIn("", "", 0.1, 1)}
      >
        {!isMobile && 
          <Link 
            className='mt-4 w-fit rounded-md px-6 py-3 text-md bg-[rgb(53,53,53)] text-white 
            shadow-sm flex gap-2 items-center'
            href={'full-resume'}
            target='_blank'
          >
            Open it on Full Screen
            <LinkIcon size={16}/>  
          </Link>
        }

        <PdfDownloader
          document={
            <ResumeElement />
          }
          fileName={`Kelvin You - Public Resume ${Date.now()}`}
          className='mt-4 w-fit rounded-md px-6 py-3 text-md bg-on-primary text-primary 
          shadow-sm flex gap-2 items-center'
        >
          Download Resume
          <Download size={16} />
        </PdfDownloader>
      </motion.div>


      <motion.div 
        className='mt-4 h-[calc(100vh)] min-h-[300px]'
        variants={fadeIn("", "", 0.1, 1)}
      >
        <PdfViewer>
          <ResumeElement />
        </PdfViewer>
      </motion.div>

    </SectionWrapper>
  )
}

export default ResumeHome