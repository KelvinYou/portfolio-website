"use client"

import React from 'react'
import ResumePdf from '../(user)/resume/_components/ResumePdf';
import ResumePdfNew from '../(user)/resume/_components/ResumePdfNew';
import { PdfViewer } from '@/components/PdfRenderer';

const FullResumePage = () => {
  // const ResumeElement = ResumePdf;
  const ResumeElement = ResumePdfNew;

  return (
    <div className='w-[100vw] h-[100vh]'>
      <PdfViewer>
        <ResumeElement />
      </PdfViewer>
    </div>
  )
}

export default FullResumePage