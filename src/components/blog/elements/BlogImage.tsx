import ZoomableImage from '@/components/ZoomableImage'
import { Image } from '@/types/blog'
import React from 'react'

const BlogImage = ({ content }: { content: Image }) => {
  const { alt, url } = content;
  return (
    <div className="mb-10 w-full h-full overflow-hidden rounded">
      <div className="relative w-full ">
        <ZoomableImage
          image={url}
        />
      </div>
    </div>
  )
}

export default BlogImage