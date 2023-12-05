"use client";

import SectionWrapper from '@/hoc/SectionWrapper'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC } from 'react'
import PageTitle from '../PageTitle'

import services from "@/data/servicePackages.json";
import ServicePackageCard from './ServicePackageCard'

const Services: FC = () => {
  return (
    <SectionWrapper
      idName='services'
    >
      <PageTitle 
        title='Services'
        subtitle='What I can provide'
        description='Web & Mobile App Development'
      />

      {/* Project Card */}
      <div className='mt-10'>
        <div className="flex flex-wrap gap-7 ">
          {services
            .map((service, index: number) => (
              <ServicePackageCard 
                key={`service-${index}`} 
                service={service}
                index={index}
              />
            ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Services