"use client";

import { ChevronsLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface BackButtonProps {
  path: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ path, text }) => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push(path)}
      className='group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-primary focus:outline-none focus:ring'
    >
      <span className="absolute -start-full transition-all group-hover:start-4">
        <ChevronsLeft />
      </span>

      <span className="text-sm font-medium transition-all group-hover:ms-4">
        {text}
      </span>
                
    </button>
  )
}

export default BackButton