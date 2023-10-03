"use client";
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { SectionWrapper } from '@/hoc';
import { textVariant } from "@/utils/motion";
import { experiences } from "@/constants/data";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SvgIcon, { ICON_TYPE } from '@/assets/SvgIcon';
import Tooltip from '@/components/ui/Tooltip';
import CustomButton from '@/components/ui/CustomButton';

// Experience Card
const ExperienceCard: FC<any> = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{ background: "#1d1836", color: "#fff" }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        {experience.company_url 
        ? <Link 
          href={experience.company_url}
          target='_blank'
          className="flex justify-center items-center w-full h-full"
        >
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className="w-[80%] h-[80%] object-contain"
          />
        </Link>
        : <Image
          src={experience.icon}
          alt={experience.company_name}
          className="w-[80%] h-[80%] object-contain"
        />}
      </div>
    }
  >
    {/* Title */}
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      {experience.company_url ? <Link 
      href={experience.company_url}
      target='_blank'
      >
        <p
          className="text-secondary text-[16px] font-semibold flex gap-2 hover:text-white"
          style={{ margin: 0 }}
        >
          {/* {experience.company_name} <SvgIcon color={"white"} type={ICON_TYPE.OPEN_LINK} /> */}
          {experience.company_name}
        </p>
      </Link> : <p
        className="text-secondary text-[16px] font-semibold"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>}
      
      
    </div>

    {experience.description && <div className="mt-5 text-justify">
        {experience.description}
      </div>
    }
    
    {/* Experience Points */}
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point: string, i: number) => (
        <li
          key={`experience-point-${i}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider text-justify"
        >
          {point}
        </li>
      ))}
    </ul>

    <div className="mt-5 flex flex-wrap gap-y-2">
      {experience.techStacks.map((language: string, index: number) => (
        <div 
          key={index}
          className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300"
        >
          {language}
        </div>
      ))}
    </div>
    
    <button className="mt-10">
      Explore More {"->"}
    </button>
  </VerticalTimelineElement>
);

const Experience: FC = () => {
  const searchParams = useSearchParams()
  const experienceCategory = searchParams.get('category') ?? "all";
  
  return (
    <SectionWrapper
      idName='experience'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
      {/* <motion.div> */}
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          What I have done so far
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          {experienceCategory === "all" && "Work Experience and Education."}
          {experienceCategory === "work" && "Work Experience."}
          {experienceCategory === "education" && "Education."}
        </h2>
      </motion.div>

      {/* Experience Card */}
      <div className="empty-20 flex flex-col">
        <VerticalTimeline>
          {experienceCategory === "all" 
            ? experiences.map((experience, i) => {
                return (
                  <ExperienceCard key={i} experience={experience} />
                )
              })
            : experiences.map((experience, i) => {
              if (experience.experienceCategory === experienceCategory) {
                return (
                  <ExperienceCard key={i} experience={experience} />
                )
              }})
          }
        </VerticalTimeline>
      </div>
    </SectionWrapper>
  );
}

export default Experience;
