
import { EXPERIENCES_PATH } from '@/constants/routes';
import { SectionWrapper } from '@/hoc'
import { Calendar, ChevronsLeft, Download } from 'lucide-react';
import React from 'react'
import Image from 'next/image';
import { formatDate } from '@/utils/dateUtil';
import BlogElementRenderer from '@/components/blog/BlogElementRenderer';
import { getDurationString } from '@/utils/common';
import SideCard from '@/components/SideCard';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

const EducationDetail = ({ educationDetail }: { educationDetail: any }) => {
  const {
    universityName,
    title,
    icon,
    startDate,
    endDate,
    elements,
    documents = [],
    points,
    cgpa,
    techStacks
  } = educationDetail;

  const duration = getDurationString(startDate, endDate);

  const formattedPoints = {
    type: "unordered_list",
    content: points.map((item: any) => item.value)
  };

  const articleElement = [formattedPoints, ...elements || []];

  return (
    <SectionWrapper
      idName='educationDetail'
    >
      
      <BackButton
        text='Back To Experiences'
        path={EXPERIENCES_PATH}
      />
        

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

                        <span className='flex items-center justify-center'>
                          <span className='ml-2'>{duration}</span>
                        </span>
                      </span>
                    </p>
                  </div>

                  <div className="mb-5 flex items-center">
                    <p className="mr-5 flex items-center text-base font-medium text-body-color">
                      <span className='ml-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1'>
                        <span className='flex items-center justify-center'>
                          <span className='ml-2'>CGPA: {cgpa}</span>
                        </span>
                      </span>

                    </p>
                  </div>
                </div>
              </div>

              <BlogElementRenderer elements={articleElement} />
            </div>
          </div>

          <div className='w-full px-4 lg:w-4/12'>
            {documents.length > 0 && 
              <SideCard
                header={'Documents'}
                body={
                  <div className=''>
                    {documents.map((document: any, index: number) => {
                      return (
                        <Link 
                          key={index}
                          href={document.href} 
                          className='text-body-color hover:text-white'
                          target='_blank'
                        >
                          <span className='flex gap-2 mb-4'>
                            {document.name} <Download size={20}/>
                          </span>
                          
                        </Link>
                      )

                    })}

                  </div>
                }
              />
            }


            <SideCard
              header={'Tech Stacks'}
              body={
                <ul className='list-inside list-disc text-body-color'>
                  {techStacks.map((techStack: string, index: number) => {
                    return (
                      <li
                        key={index}
                        className="text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg"
                      >
                        {techStack}
                      </li>
                    )
                  })}
                </ul>
              }
            />
          </div>


        </div>
    </SectionWrapper>
  )
}

export default EducationDetail