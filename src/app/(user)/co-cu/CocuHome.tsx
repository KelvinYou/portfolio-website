"use client";

import { SectionWrapper } from '@/hoc'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React from 'react'
import PageTitle from '@/components/PageTitle'

const CocuHome = () => {
  return (
    <SectionWrapper
      idName='project'
    >
      <PageTitle 
        title='Co-curricular.'
        subtitle='My soft skills'
        description=''
      />

        <div className="">
          <div className="relative pl-8 sm:pl-32 py-6 group">
            {/* <div className="font-caveat font-medium text-2xl text-white mb-1 sm:mb-0">
              The origin
            </div> */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-on-primary after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-primary bg-on-primary rounded-full">
                May, 2020
              </time>
              <div className="text-xl font-bold text-on-body">
                Acme was founded in Milan, Italy
              </div>
            </div>
            <div className="text-white">
              Pretium lectus quam id leo. Urna et pharetra pharetra massa massa. Adipiscing enim eu neque aliquam vestibulum morbi blandit cursus risus.
            </div>
          </div>

          
        </div>
                    

    </SectionWrapper>
  )
}

export default CocuHome