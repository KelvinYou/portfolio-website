"use client";

import { EXPERIENCES_PATH } from '@/constants/routes';
import { SectionWrapper } from '@/hoc'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { ChevronsLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const ExpDetail = ({ expDetail }: { expDetail: any }) => {
  const router = useRouter();
  
  return (
    <SectionWrapper
      idName='expDetail'
    >
      
      <div>
        <button
          onClick={() => router.push(EXPERIENCES_PATH)}
          className='group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-primary focus:outline-none focus:ring'
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <ChevronsLeft />
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Back to Experiences
          </span>
                    
        </button>
        
      </div>



      
    </SectionWrapper>
  )
}

export default ExpDetail