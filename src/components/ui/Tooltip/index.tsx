"use client";

import React, { useState, ReactNode, HTMLAttributes } from 'react';

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode | string;
  children: ReactNode;
  width?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start' | 'left-end' | 'left-start' | 'right-end' | 'right-start';
}

export default function Tooltip({ 
  content, 
  children,
  width = "150px",
  position = 'top',
  ...restProps
}: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-3';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-3';
      case 'top-end':
        return 'bottom-full right-0 mb-3';
      case 'top-start':
        return 'bottom-full left-0 mb-3';
      case 'bottom-end':
        return 'top-full right-0 mt-3';
      case 'bottom-start':
        return 'top-full left-0 mt-3';
      case 'left-end':
        return 'right-full bottom-0 mb-3';
      case 'left-start':
        return 'right-full top-0 mt-3';
      case 'right-end':
        return 'left-full bottom-0 mb-3';
      case 'right-start':
        return 'left-full top-0 mt-3';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
    }
  };

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleToggleTooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      >
        {children}
      </div>
      {showTooltip && (
        <div 
          style={{ width }}
          className={`absolute ${getPositionStyles()} bg-gray-900 text-white rounded-md pointer-events-none transition-all border-[1px] border-gray-700 duration-300 z-50 inline-block px-3 py-2 text-xs font-normal`}>
          {content}
        </div>
      )}
    </div>
  );
}
