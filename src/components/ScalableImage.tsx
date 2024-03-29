"use client";

import { Minimize2, MinusCircle, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const ScalableImage = ({ image }: { image: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(80);

  const imageRef = useRef<HTMLImageElement>(null);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const deltaY = event.deltaY;
      const currentZoomLevel = zoomLevel + deltaY / 10;
      setZoomLevel(Math.min(Math.max(currentZoomLevel, 10), 100));
    }
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isZoomed]);
  

  return (
    <>
      <img
        src={image}
        alt="image"
        onClick={toggleZoom}
        className="h-full w-full object-cover object-center cursor-zoom-in"
      />

      {isZoomed && (
        <div
          onClick={(e) => {
            const target = e.target as Element; // Cast to Element
            // Check if the click target is not within the zoomed-in content
            if (
              !target.closest('.zoom-buttons-container')
            ) {
              toggleZoom();
            }
          }}
          onWheel={handleWheel}
          className="fixed inset-0 flex items-center justify-center z-30 min-h-screen bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
        >
          <div className="absolute top-0 right-0 p-4 z-50">
            <button onClick={toggleZoom} className="text-white cursor-pointer">
              <Minimize2 />
            </button>
          </div>

          <div 
            className="zoom-buttons-container absolute top-5 left-1/2 transform -translate-x-1/2  z-50 bg-on-primary rounded-md"
          >
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 10, 10))}
              className="text-black cursor-pointer px-3 py-1"
            >
              -
            </button>
            
            <span className="text-black">{`${zoomLevel.toFixed(0)}%`}</span>

            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 10, 100))}
              className="text-black cursor-pointer px-3"
            >
              +
            </button>
          </div>

          <img
            ref={imageRef}
            src={image}
            alt="zoomed-in-image"
            style={{ width: `${zoomLevel}%`, height: 'auto' }}
          />

        </div>
      )}
    </>
  );
};

export default ScalableImage;
