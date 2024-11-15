"use client";

import React, { useEffect, useRef, useState } from 'react'
// import ScalableImage from '@/src/components/ScalableImage';
import ScalableImage from '../ScalableImage';
import Image from 'next/image';

type ImageType = {
  id: string;
  url: string;
};

interface IProps {
  images: ImageType[];
}

const ImageVideoGallery: React.FC<IProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType>(images[0]);

  useEffect(() => {
    if (selectedImage && containerRef.current) {
      const selectedIndex = images.indexOf(selectedImage);
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = 72; // width of each image item
      const scrollPosition = Math.max(0, selectedIndex * itemWidth - containerWidth / 2 + itemWidth / 2);

      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [selectedImage, images]);

  return (
    <>
      <div className="mb-4 w-full h-full overflow-hidden rounded">
        <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
          <ScalableImage
            image={selectedImage?.url}
          />
        </div>
      </div>

      {/* image carousel */}
      <div ref={containerRef} className="flex gap-2 mb-10 overflow-x-auto">
        {images.length > 1 && images.map((image: ImageType, index: number) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={image?.url || ''}
              alt={`Image ${index + 1}`}
              width={72}
              height={72}
              className={`object-cover rounded cursor-pointer ${
                selectedImage === image ? '' : 'opacity-50 hover:opacity-70'
              }`}
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ImageVideoGallery