"use client";
import { github, preview } from '@/assets';
import SvgIcon, { ICON_TYPE } from '@/assets/SvgIcon';
import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import Tooltip from '@/components/ui/Tooltip';
import { projects } from '@/constants/data';
import { SectionWrapper } from '@/hoc'
import { formatDate } from '@/utils/dateUtil';
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react'
import { Tilt } from "react-tilt";
import ProjectCard from './ProjectCard';


const Project: FC = () => {
  const handleOptionChange = (selectedOption: string) => {
    // Do something with the selected option, such as updating state
    console.log('Selected Option:', selectedOption);
  };
  
  const options = [
    { id: 'all', label: 'All' },
    { id: 'side_projects', label: 'Side Projects' },
    { id: 'industrial_projects', label: 'Industrial Projects' },
    { id: 'school_projects', label: 'School Projects' },
  ];

  return (
    <SectionWrapper
      idName='project'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          My work
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Projects.
        </h2>
      </motion.div>

      {/* About */}
      <div className="w-full flex">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. {" "}
          {/* Each project is briefly described with
          links to code repositories and live demos in it. */}
           It reflects my ability to solve complex problems, work with different technologies,
          and manage projects effectively. 
        </motion.p>
      </div>

      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className='flex items-center justify-center mt-20'
      >
        <SelectableButtonGroup
          options={options}
          onOptionChange={handleOptionChange}
        />
      </motion.div>


      {/* Project Card */}
        <div className="mt-10 flex flex-wrap gap-7">
        {projects.map((project, index: number) => (
          <ProjectCard 
            key={`project-${index}`} 
            project={project}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Project