"use client"

import { fetchViewCount, incrementViewCount } from '@/services/blogService';
import { Eye as EyeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface IProps {
  slug: string
}

const ViewCount: React.FC<IProps> = ({ slug }) => {

  const [views, setViews] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const count = await fetchViewCount(slug);

      setViews(count);
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    incrementViewCount(slug);
  }, [slug]);

  return (
    <div className='flex text-gray-300 bg-tertiary justify-center px-2 py-1 items-center gap-1 w-fit'>

      {loading ? 
        <div className='animate-pulse w-16'>
          <div className="h-4 bg-slate-700 rounded"></div>
        </div> 
        : 
        <>
          <EyeIcon size={20}/>
          <span className='text-sm'>{views} viewed</span>
        </>
      }
    </div>
  )
}

export default ViewCount