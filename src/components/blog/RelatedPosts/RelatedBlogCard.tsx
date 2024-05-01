import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react'
import { BlogPage } from '@/types/blog';
import { formatDate } from '@/utils/dateUtils';

interface RelatedBlogCardProps {
  blog: BlogPage;
}

const RelatedBlogCard: FC<RelatedBlogCardProps> = ({ blog }) => {
  const { 
    _id,
    image,
    title,
    createDate
  } = blog;


  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
          {image ? 
            <Image 
              src={image} 
              alt={title}
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
            {title}
          </span>
        </h5>
        <p className="text-xs font-medium text-body-color">{formatDate(createDate)}</p>
      </div>
    </div>
  );
};

export default RelatedBlogCard