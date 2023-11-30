"use client";

import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import projects from '@/data/projects.json';
import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard';


const Project: FC = () => {
  const [projectCategory, setProjectCategory] = useState("all");

  const handleOptionChange = (selectedOption: string) => {
    // Do something with the selected option, such as updating state
    setProjectCategory(selectedOption);
  };
  
  const options = [
    { id: 'all', label: 'All' },
    { id: 'side_project', label: 'Side Projects' },
    { id: 'industrial_project', label: 'Industrial Projects' },
    { id: 'school_project', label: 'School Projects' },
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
      <div className='mt-10 min-h-[1000px]'>
        <div className="flex flex-wrap gap-7 ">
          {projects
            .filter((project) => {
              if (projectCategory === 'all') return true;
              return project.projectCategory === projectCategory;
            })
            .map((project, index: number) => (
              <ProjectCard 
                key={`project-${index}`} 
                project={project}
                index={index}
              />
            ))}
        </div>
      </div>

    </SectionWrapper>
  )
}

export default Project