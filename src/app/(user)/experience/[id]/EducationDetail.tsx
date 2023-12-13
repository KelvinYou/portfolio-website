"use client";

import { EXPERIENCES_PATH } from '@/constants/routes';
import { SectionWrapper } from '@/hoc'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Calendar, ChevronsLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { formatDate } from '@/utils/dateUtil';

const EducationDetail = ({ educationDetail }: { educationDetail: any }) => {
  const router = useRouter();

  const {
    universityName,
    title,
    icon,
    startDate,
    endDate,
  } = educationDetail;

  return (
    <SectionWrapper
      idName='educationDetail'
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

        <div className="-mx-4 flex flex-wrap mt-10">

          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight">
                {title}
              </h1>

              <div className="mb-10 flex flex-wrap items-center justify-between border-b pb-4 border-white border-opacity-10">
                <div className="flex flex-wrap items-center">
                  <div className="mb-5 mr-10 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        {icon && <Image
                          src={icon}
                          alt="author"
                          fill
                          sizes='100%'
                          style={{objectFit: "contain"}}
                        />}
                      </div>
                    </div>
                    <div className="w-full">
                      <span className="mb-1 text-base font-medium text-body-color">
                        <span> {universityName}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex items-center">
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      <span className='ml-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1'>
                        <span className='flex items-center justify-center'>
                          <Calendar size={14} className='mb-0.5'/>

                          <span className='ml-2'>{formatDate(startDate, 'long') + " - " + formatDate(endDate, 'long')}</span>
                        </span>
                      </span>

                    </p>
                  </div>
                </div>
              </div>

              <div>
                
              </div>
            </div>
          </div>

          <div className="w-full px-4 lg:w-4/12">
            <div className="bg-gray-dark mb-10 rounded-sm  shadow-none">
              <h3 className="border-b px-8 py-4 text-lg font-semibold border-white border-opacity-10 text-white">
                Err.. No Idea
              </h3>
              <p className='px-8 py-6 text-body-color'>
                If I only showed a few paragraphs, it would feel too spacey here.
                Please give me some suggestions what should I put here.
              </p>
            </div>
          </div>
        </div>


      
    </SectionWrapper>
  )
}

export default EducationDetail