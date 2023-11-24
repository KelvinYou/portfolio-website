import { Paragraph } from "@/types/blog"

const BlogParagraph = ({ content } : { content: Paragraph }) => {
  return (
    <p 
      className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg text-justify
      sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed"
    >
      {content.text}
    </p>
  )
}

export default BlogParagraph;