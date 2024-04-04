"use client";

import { SectionWrapper } from '@/hoc'
import useBrowserAndOSInfo from '@/hooks/useBrowserAndOsInfo';
import { getBrowserAndOSInfo, BrowserInfo } from '@/utils/deviceInfoUtil';
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { PdfDownloader, PdfViewer } from '@/components/PdfRenderer';
import ResumePdf from './ResumePdf';

const ResumeHome = () => {
  const browserInfo = useBrowserAndOSInfo();

  return (
    <SectionWrapper
      idName='project'
      title='Resume.'
      subtitle='My public resume'
    >
      <div className='mt-4 mx-auto w-fit'>
        <PdfDownloader
          document={
            <ResumePdf />
          }
          fileName={`Kelvin You - Public Resume ${Date.now()}`}
        >
          <button 
            className='rounded-md px-6 py-3 text-md bg-on-primary text-primary 
            shadow-sm flex gap-2 items-center'
          >
            Download
            <Download size={16} />
          </button>
        </PdfDownloader>
      </div>
      
      <div className=' h-[calc(100vh-400px)]'>
        <PdfViewer>
          <ResumePdf />
        </PdfViewer>
      </div>

    </SectionWrapper>
  )
}

export default ResumeHome