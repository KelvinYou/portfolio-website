"use client"

import { StaticImageData } from 'next/image'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { ChevronsRight } from 'lucide-react'
import HighlightText from '../common/HighlightedText'

export type VerticalTimelineElementType = {
  title: string,
  subtitle: string,
  subtitleLink?: string,
  subContainer?: React.JSX.Element,
  icon?: string | StaticImageData,
  iconBackgroundColor?: string;
  date: string,
  points: {
    value: string;
    highlightedTexts?: string[];
  }[];
  tags?: string[];
  link?: string;
}

interface VerticalTimelineRendererProps {
  elements: VerticalTimelineElementType[];
}

const VerticalTimelineRenderer: React.FC<VerticalTimelineRendererProps> = ({ elements }) => {
  return (
    <VerticalTimeline>
      {
        elements.map((element, index) => {
          return (
            <VerticalTimelineElement
              key={index + element.title}
              contentStyle={{ 
                background: "#102230", 
                color: "#fff", 
              }}
              date={element.date}
              dateClassName=''
              contentArrowStyle={{ borderRight: "7px solid #232631" }}
              icon={
                element.icon && <div className="flex justify-center items-center w-full h-full">
                  {element.subtitleLink
                  ? <Link 
                    href={element.subtitleLink}
                    target='_blank'
                    className="flex justify-center items-center w-full h-full"
                  >
                    <Image
                      src={element.icon}
                      alt={element.subtitle}
                      className="w-[80%] h-[80%] object-contain"
                    />
                  </Link>
                  : <Image
                    src={element.icon}
                    alt={element.subtitle}
                    className="w-[80%] h-[80%] object-contain"
                  />}
                </div>
              }
              iconStyle={{ background: element.iconBackgroundColor || '#fff' }}
            >
              <h3 className="text-white text-[24px] font-bold">{element.title}</h3>

              {
                element.subtitleLink ? 
                  <Link 
                    href={element.subtitleLink}
                    target='_blank'
                    >
                    <p
                      className="text-secondary text-[16px] font-semibold flex gap-2 hover:text-white"
                      style={{ margin: 0 }}
                    >
                      {/* {education.companyName} <SvgIcon color={"white"} type={ICON_TYPE.OPEN_LINK} /> */}
                      {element.subtitle}
                    </p>
                  </Link> 
                  : 
                  <p
                    className="text-secondary text-[16px] font-semibold"
                    style={{ margin: 0 }}
                  >
                    {element.subtitle}
                  </p>
              }

              {element.subContainer}



              <ul className="mt-5 list-disc ml-5 space-y-2">
                {
                  element.points.map((point: { 
                    value: string, 
                    highlightedTexts?: string[] 
                  }, i: number) => (
                    <li
                      key={`experience-point-${i}`}
                      className="text-white-100 text-[14px] pl-1 tracking-wider font-light"
                    >
                      <HighlightText 
                        text={point.value}
                        highlightedTexts={point?.highlightedTexts || []} 
                      />
                      {/* {point} */}
                    </li>
                  ))
                }
              </ul>

              {
                element.tags && <div className="mt-5 flex flex-wrap gap-2">
                {element.tags && element.tags.map((tag: string, index: number) => (
                  <div 
                    key={index}
                    className={`text-sm font-medium rounded bg-gray-700 px-2 py-1`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              }

              <div>
                {element.link &&
                  <Link
                    className="mt-6 group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-black focus:outline-none focus:ring"
                    href={element.link}
                  >
                    
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <ChevronsRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                      Find Out More
                    </span>
                  </Link>
                }
              </div>
            </VerticalTimelineElement>
          )
        })
      }

    </VerticalTimeline>
  )
}

export default VerticalTimelineRenderer