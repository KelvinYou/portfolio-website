"use client"

import ZoomableImage from '@/components/ZoomableImage'
import BlogElementRenderer from '@/components/blog/BlogElementRenderer'
import { projects } from '@/constants/data'
import SectionWrapper from '@/hoc/SectionWrapper'
import { Project } from '@/types/project'
import { formatDate } from '@/utils/dateUtil'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Calendar, ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface ProjectDetailProps {
  projectDetail: Project,
}

const ProjectDetail: FC<ProjectDetailProps> = ({ projectDetail }) => {
  const router = useRouter();
  
  const {
    name,
    description,
    tags,
    elements,
    images,
    liveSiteLink,
    sourceCodeLink,
    platforms,
    date,
  } = projectDetail;

  return (
    <SectionWrapper
      idName='project'
    >
      {/* Title */}
      {/* <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
      </motion.div> */}

      <div>
        <button
          onClick={() => router.push('/#project')}
          className='group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-primary focus:outline-none focus:ring'
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <ChevronsLeft />
          </span>

          <span className="text-sm font-medium transition-all group-hover:ms-4">
            Back to Projects
          </span>
                    
        </button>
        
      </div>

      <div className="-mx-4 flex flex-wrap mt-10">
        <div className="w-full px-4 lg:w-8/12">
          <div>

            <h1 className="mb-8 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight">
              {name}
            </h1>

            <div className="mb-10 flex flex-wrap items-center justify-between border-b pb-4 border-white border-opacity-10">
              <div className="flex flex-wrap items-center">
                <div className="mb-5 flex items-center">
                  <p className="mr-5 flex items-center text-base font-medium text-body-color">
                    <span className='ml-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1'>
                      <span className='flex items-center'>
                        <Calendar size={14} className='mb-1' />

                        <span className='ml-1'>{formatDate(date, 'long')}</span>
                      </span>

                    </span>

                  </p>
                </div>
              </div>
            </div>

            <div>
              {elements && <BlogElementRenderer elements={elements} />}

            </div>

          </div>
        </div>

        {/* Right Column */}
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

export default ProjectDetail