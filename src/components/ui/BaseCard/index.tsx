import { Info } from 'lucide-react';
import React from 'react'
import Tooltip from '../Tooltip';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tooltip?: string;
  children: React.ReactNode;
}

const BaseCard = ({ title, tooltip, children, className, ...rest }: Props) => {
  return (
    <div className={`text-gray-300 bg-tertiary p-5 rounded-xl mt-5 ${className}`} {...rest}>
      <div className='flex justify-between'>
        <h2 className="text-xl text-slate-200 font-bold mb-4 text-start line-clamp-1">{title}</h2>
        
        {tooltip && <Tooltip
          content={tooltip}
          position='top-end'
        >
          <Info />
        </Tooltip>}
      </div>
      {children}
    </div>
  )
}

export default BaseCard