"use client"

import ScalableImage from '@/components/ScalableImage'
import ArticleElementRenderer from '@/components/ArticleElementRenderer'
import { projects } from '@/constants/data'
import SectionWrapper from '@/hoc/SectionWrapper'
import { getProjectsByIds } from '@/services/projectService'
import { ProjectType } from '@/types/project'
import { formatDate } from '@/utils/dateUtil'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Calendar, ChevronsLeft, Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'
import Image from "next/image";

interface ProjectDetailProps {
  projectDetail: ProjectType,
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
    relatedProjectIds,
    date,
  } = projectDetail;

  const relatedProjects = getProjectsByIds(relatedProjectIds || []);

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
              {elements && <ArticleElementRenderer elements={elements} />}

            </div>

          </div>
        </div>

        {/* Right Column */}
        <div className="w-full px-4 lg:w-4/12">
          <div className="bg-gray-dark mb-10 rounded-sm  shadow-none px-8 py-4 ">
            <div className='grid grid-cols-[calc(100%-56px),40px] gap-4'>
              <div>
                {liveSiteLink && (
                  <Link
                    href={liveSiteLink}
                    target='_blank'
                    className='w-full h-full group relative inline-flex items-center overflow-hidden rounded bg-on-primary py-2 text-primary'
                  >
                    <span className="text-sm font-medium transition-all mx-auto">
                      Live Preview
                    </span>
                  </Link>
                )}
              </div>

              <div>
                {sourceCodeLink && (
                  <Link
                    href={sourceCodeLink}
                    target='_blank'
                    className='w-full group relative inline-flex items-center overflow-hidden rounded bg-gray-dark hover:bg-primary py-2 text-on-body hover:text-white'
                  >
                    <span className="text-sm font-medium transition-all mx-auto">
                      <Github />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          

          {relatedProjects && relatedProjects.length !== 0 && 
            <div className="bg-gray-dark mb-10 rounded-sm  shadow-none">
              <h3 className="border-b px-8 py-4 text-lg font-semibold border-white border-opacity-10 text-white">
                Related Projects
              </h3>

              <ul className="">
                {relatedProjects?.map((app, index) => {
                  const {
                    _id,
                    name,
                    liveSiteLink,
                    sourceCodeLink,
                    platforms,
                    images,
                    date
                  } = app;

                  return (
                    <li
                      key={index} 
                      className="py-6 px-8 border-b border-white border-opacity-10 cursor-pointer"
                      onClick={() => router.push(`/projects/${_id}`)}
                    >
                      <div className="flex items-center lg:block xl:flex">
                        <div className="mr-5 lg:mb-3 xl:mb-0">
                          <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
                            {(images && images.length > 0) ? 
                              <Image 
                                src={images[0]} 
                                alt={name}
                                fill 
                                sizes="100%"
                                className="h-full w-full object-cover object-center"
                              /> 
                              :
                              <div className="w-full h-full object-cover rounded-md flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                              </div>
                            }
                            
                          </div>
                        </div>
                        <div className="w-full">
                          <h5>
                            <span
                              className="mb-[6px] block text-base font-medium leading-snug text-white"
                            >
                              {name}
                            </span>
                          </h5>
                          <p className="text-xs font-medium text-body-color">{formatDate(date)}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          }
        </div>


      </div>
    </SectionWrapper>
  )
}

export default ProjectDetail