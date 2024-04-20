"use client";

import React, { FC } from 'react';
import Image from 'next/image';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from '@/hoc';
import { educations } from "@/constants/data";
import Link from 'next/link';

import { ChevronsRight } from 'lucide-react';
import HighlightText from '@/components/common/HighlightedText';
import VerticalTimelineRenderer, { VerticalTimelineElementType } from '@/components/VerticalTimelineRenderer';
import { formatDate } from '@/utils/dateUtil';

const EducationCard: FC<any> = ({ education }) => {

  return (
    <VerticalTimelineElement
      contentStyle={{ 
        background: "#102230", 
        color: "#fff", 
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={education.date}
      iconStyle={{ background: education.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {education.universityUrl
          ? <Link 
            href={education.universityUrl}
            target='_blank'
            className="flex justify-center items-center w-full h-full"
          >
            <Image
              src={education.icon}
              alt={education.universityName}
              className="w-[80%] h-[80%] object-contain"
            />
          </Link>
          : <Image
            src={education.icon}
            alt={education.universityName}
            className="w-[80%] h-[80%] object-contain"
          />}
        </div>
      }
    >
      {/* Title */}
      <div>
        <h3 className="text-white text-[24px] font-bold">{education.title}</h3>

        {education.universityUrl ? <Link 
        href={education.universityUrl}
        target='_blank'
        >
          <p
            className="text-secondary text-[16px] font-semibold flex gap-2 hover:text-white"
            style={{ margin: 0 }}
          >
            {/* {education.companyName} <SvgIcon color={"white"} type={ICON_TYPE.OPEN_LINK} /> */}
            {education.universityName}
          </p>
        </Link> : <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {education.universityName}
        </p>}

        <div
          className="text-sm inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-0.5
           text-secondary mt-2"
        >
          {/* <p className="text-sm"> */}
            CGPA: {education.cgpa}
          {/* </p> */}
        </div>
      </div>

      {education.description && <div className="mt-5">
          {education.description}
        </div>
      }
      
      {/* Experience Points */}
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {education.points.map((point: { 
          value: string, 
          highlightedTexts: string[] 
        }, i: number) => (
          <li
            key={`experience-point-${i}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider font-light"
          >
            <HighlightText 
              text={point.value}
              highlightedTexts={point.highlightedTexts} 
            />
            {/* {point} */}
          </li>
        ))}
      </ul>

      {/* <div className="mt-5 flex flex-wrap">
        {education.techStacks.map((techStack: string, index: number) => (
          <div 
            key={index}
            className={`text-sm font-medium mr-2 rounded 
            ${index % 2 === 0 ? 'blue-text-gradient' : 'orange-text-gradient'}`}
          >
            #{techStack}
          </div>
        ))}
      </div> */}

      <div className='mt-6'>
        <Link
          className=" group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-black focus:outline-none focus:ring"
          href={`/experience/${education.id}`}
        >
          
          <span className="absolute -end-full transition-all group-hover:end-4">
            <ChevronsRight />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            Find Out More
          </span>
        </Link>
      </div>

      {/* <CustomButton>More</CustomButton> */}
    </VerticalTimelineElement>
  )
};

const Educations = () => {
  const sortedEducations = educations.slice().sort((a, b) => {
    const startDateA = a.startDate;
    const startDateB = b.startDate;

    return startDateB.localeCompare(startDateA);
  });

  const formattedEducations: VerticalTimelineElementType[] = sortedEducations.map((education, index) => {
    const title = education.title;
    const icon = education.icon;
    const iconBackgroundColor = education.iconBg;
    const subtitle = education.universityName;
    const subtitleLink = education.universityUrl;
    const points = education.points;
    const date = `${formatDate(education.startDate)} - ${education.endDate ? formatDate(education.endDate) : "Present"}`;
    const subContainer = (
      <div
        className="text-sm inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-0.5
        text-secondary mt-2"
      >
        CGPA: {education.cgpa}
      </div>
    );
    const link = `/experience/${education.id}`;

    return {
      title,
      icon,
      iconBackgroundColor,
      subtitle,
      subtitleLink,
      subContainer,
      points,
      date,
      link,
    }
  });

  return (
    <>
      <SectionWrapper
        idName='educations'
        title="Educations."
        subtitle='My study journey'
      >
      </SectionWrapper>

      <SectionWrapper
        idName='render-educations'
      > 
        <div className="empty-20 flex flex-col mt-10">
          {/* <VerticalTimeline>
            {
              sortedEducations.map((experience, i) => {
                return (
                  <EducationCard key={i} education={experience} />
                )
              })
            }
          </VerticalTimeline> */}

          <VerticalTimelineRenderer
            elements={formattedEducations}
          />
        </div>
      </SectionWrapper>
    </>
  )
}

export default Educations