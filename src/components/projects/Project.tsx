"use client";

import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard';
import { getProjects } from '@/services/projectService';
import PageTitle from '@/components/PageTitle'

const Project: FC = () => {
  const [projectCategory, setProjectCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  const currentProjects = getProjects()
    .filter((project) => {
      if (projectCategory === 'all') return true;
      return project.projectCategory === projectCategory;
    })
    .slice(indexOfFirstProject, indexOfLastProject);

  const handleOptionChange = (selectedOption: string) => {
    setProjectCategory(selectedOption);
  };
  
  const options = [
    { id: 'all', label: 'All' },
    { id: 'side_project', label: 'Side Projects' },
    { id: 'industrial_project', label: 'Industrial Projects' },
    { id: 'school_project', label: 'School Projects' },
  ];

  const renderPaginationLinks = () => {
    const pageNumbers = [];
    const totalProjects = getProjects()
      .filter((project) => {
        if (projectCategory === 'all') return true;
        return project.projectCategory === projectCategory;
      })
      .length;
  
    for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'
              } px-4 py-2 rounded`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  
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
      {/* About */}
      <div className="w-full flex">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >

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
          {currentProjects.map((project, index: number) => (
              <ProjectCard 
                key={`project-${index}`} 
                project={project}
                index={index}
              />
            ))}
        </div>
      </div>
      {renderPaginationLinks()}
    </SectionWrapper>
  )
}

export default Project