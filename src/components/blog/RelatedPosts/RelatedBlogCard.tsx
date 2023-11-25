import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react'
import { BlogPage } from '@/types/blog';
import { formatDate } from '@/utils/dateUtil';

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
          {image && <Image 
            src={image} 
            alt={title}
            fill 
            sizes="100%"
            className="h-full w-full object-cover object-center"
          />}
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