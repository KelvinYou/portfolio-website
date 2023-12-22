"use client";

import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { getProjects } from '@/services/projectService';
import PageTitle from '@/components/PageTitle'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProjectCard from '../../projects/_components/ProjectCard';

const Project: FC = () => {
  const [projectCategory, setProjectCategory] = useState("all");

  const currentProjects = getProjects()
    .filter((project) => {
      if (projectCategory === 'all') return true;
      return project.projectCategory === projectCategory;
    });

  const handleOptionChange = (selectedOption: string) => {
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
      <PageTitle 
        title='Projects.'
        subtitle='My work'
        description='Following projects showcases my skills and experience through
        real-world examples of my work. It reflects my ability to solve complex problems, work with different technologies,
        and manage projects effectively. '
      />

      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className='flex justify-between mt-20'
      >
        <SelectableButtonGroup
          options={options}
          onOptionChange={handleOptionChange}
        />
        <Link
          href="/projects"
          className='text-white flex items-center '
        >
          <span>
            All
          </span>

          <ChevronRight />
        </Link>
      </motion.div>

      {/* Project Card */}
      <div className='mt-10 min-h-[500px]'>
        <div className="flex flex-wrap gap-7 ">
          {currentProjects.slice(0, 3).map((project, index: number) => (
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