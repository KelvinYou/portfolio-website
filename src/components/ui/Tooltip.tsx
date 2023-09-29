"use client";

import React, { useState, ReactNode, MouseEvent } from 'react';

interface TooltipProps {
  content: ReactNode | string;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
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

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center"
        onClick={handleToggleTooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 
        text-white rounded-md pointer-events-none transition-all
        duration-300 z-50 min-w-[150px] inline-block px-3 py-2 text-sm font-normal tooltip">
          {content}
        </div>
      )}
    </div>
  );
}
