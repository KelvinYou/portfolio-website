"use client";

import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from '@/hoc';
import { fadeIn, textVariant } from "@/utils/motion";
import { combinedExperiences, educations, workExperiences } from "@/constants/data";
// import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import "./Experience.scss";
import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import { ChevronsRight } from 'lucide-react';
import HighlightText from '@/components/common/HighlightedText';
import { formatDate } from '@/utils/dateUtil';

// Experience Card
const ExperienceCard: FC<any> = ({ experience }) => {

  const formattedStartDate = formatDate(experience.startDate);
  const formattedEndDate = experience.endDate ? formatDate(experience.endDate) : "Today";

  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#102230", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={`${formattedStartDate} - ${formattedEndDate}`}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {experience.companyUrl 
          ? <Link 
            href={experience.companyUrl}
            target='_blank'
            className="flex justify-center items-center w-full h-full"
          >
            <Image
              src={experience.icon}
              alt={experience.companyName}
              className="w-[80%] h-[80%] object-contain"
            />
          </Link>
          : <Image
            src={experience.icon}
            alt={experience.companyName}
            className="w-[80%] h-[80%] object-contain"
          />}
        </div>
      }
    >
      {/* Title */}
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        {experience.companyUrl ? <Link 
        href={experience.companyUrl}
        target='_blank'
        >
          <p
            className="text-secondary text-[16px] font-semibold flex gap-2 hover:text-white"
            style={{ margin: 0 }}
          >
            {/* {experience.companyName} <SvgIcon color={"white"} type={ICON_TYPE.OPEN_LINK} /> */}
            {experience.companyName}
          </p>
        </Link> : <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.companyName}
        </p>}
      </div>

      {/* {experience.description && <div className="mt-5 text-justify">
          {experience.description}
        </div>
      } */}
      
      {/* Experience Points */}
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point: { 
          value: string, 
          highlightedTexts: string[] 
        }, i: number) => (
          <li
            key={`experience-point-${i}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            <HighlightText 
              text={point.value}
              highlightedTexts={point.highlightedTexts} 
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap">
        {experience.techStacks.map((techStack: string, index: number) => (
          <div 
            key={index}
            className={`text-sm font-medium mr-2 rounded 
            ${index % 2 === 0 ? 'blue-text-gradient' : 'orange-text-gradient'}`}
          >
            #{techStack}
          </div>
        ))}
      </div>

      {/* <div className='mt-6'>
        <Link
          className=" group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-black focus:outline-none focus:ring"
          href={`/experience/${experience.id}`}
        >
          
          <span className="absolute -end-full transition-all group-hover:end-4">
            <ChevronsRight />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            Find Out More
          </span>
        </Link>
      </div> */}

      {/* <CustomButton>More</CustomButton> */}
    </VerticalTimelineElement>
  )
};

// Education Card
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

const Experience: FC = () => {
  // const searchParams = useSearchParams()
  // const [experienceCategory, setExperienceCategory] = useState(searchParams.get('category') ?? "all");
  const [experienceCategory, setExperienceCategory] = useState("all");

  useEffect(() => {
    setExperienceCategory("all")
  },[]);
  
  const handleOptionChange = (selectedOption: string) => {
    // Do something with the selected option, such as updating state
    setExperienceCategory(selectedOption);
  };
  
  const sortedExperiences = combinedExperiences.slice().sort((a, b) => {
    const startDateA = a.startDate;
    const startDateB = b.startDate;

    return startDateB.localeCompare(startDateA);
  });


  const options = [
    { id: 'all', label: 'All' },
    { id: 'work', label: 'Works' },
    { id: 'education', label: 'Educations' },
  ];

  return (
    <>
      <SectionWrapper
        idName='experience'
        title="Work Experience and Education."
        subtitle='What I have done so far'
      >
      </SectionWrapper>

      <SectionWrapper
        idName='render-experiences'
      > 
        <motion.div 
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className='flex items-center justify-center -mt-20'
        >
          <SelectableButtonGroup
            options={options}
            onOptionChange={handleOptionChange}
          />
        </motion.div>

        {/* Experience Card */}
        <div className="empty-20 flex flex-col mt-10">
          <VerticalTimeline>
            {sortedExperiences
              .filter((experience) => {
                if (experienceCategory === 'all') return true;
                return experience.experienceCategory === experienceCategory;
              })
              .map((experience, i) => {
                if (experience.experienceCategory === "education") {
                  return (
                    <EducationCard key={i} education={experience} />
                  )
                } else {
                  return (
                    <ExperienceCard key={i} experience={experience} />
                  )
                }
              }

              )}
          </VerticalTimeline>
        </div>
      </SectionWrapper>
    </>
  );
}

export default Experience;
