"use client";

import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import { getProjects } from '@/services/projectService';
import { ChevronsRight } from 'lucide-react';
import ProjectCard from '../../projects/_components/ProjectCard';
import BaseButton from '@/components/ui/BaseButton';
import { useRouter } from 'next/navigation';

const Project: FC = () => {
  const [projectCategory, setProjectCategory] = useState("all");
  const router = useRouter();

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
      title='Projects.'
      subtitle='My work'
      description='Following projects showcases my skills and experience through
      real-world examples of my work. It reflects my ability to solve complex problems, work with different technologies,
      and manage projects effectively. '
    >

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

      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className='mb-5'
      >
        <BaseButton
          className='group relative inline-flex items-center overflow-hidden rounded bg-on-primary px-8 py-3 text-black focus:outline-none focus:ring'
          onClick={() => router.push('/projects')}
        >      
          <span className="absolute -end-full transition-all group-hover:end-4">
            <ChevronsRight />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            Show All Projects
          </span>
        </BaseButton>
      </motion.div>

    </SectionWrapper>
  )
}

export default Project