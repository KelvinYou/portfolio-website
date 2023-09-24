"use client";
import React, { FC } from 'react';
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

// Experience Card
const ExperienceCard: FC<any> = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{ background: "#1d1836", color: "#fff" }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    date={experience.date}
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    {/* Title */}
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <p
        className="text-secondary text-[16px] font-semibold"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
    </div>

    {/* Experience Points */}
    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point: string, i: number) => (
        <li
          key={`experience-point-${i}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>

    <div className="mt-5 flex flex-wrap gap-y-2">
      {experience.tools.map((language: string, index: number) => (
        <div 
          key={index}
          className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-700 text-gray-300"
        >
          {language}
        </div>
      ))}
    </div>
  </VerticalTimelineElement>
);

const Education: FC = () => {
  return (
    <SectionWrapper
      idName='experience'
    >
      {/* Title */}
      <motion.div variants={textVariant()}>
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Where I have done my education
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Education.
        </h2>
      </motion.div>

      {/* Experience Card */}
      <div className="empty-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, i) => (
            <ExperienceCard key={i} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </SectionWrapper>
  );
}

export default Education;
