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
import ProjectCard from './_components/ProjectCard';
import BackButton from '@/components/BackButton';

const AllProject: FC = () => {
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
    setCurrentPage(1);
  };
  
  const options = [
    { id: 'all', label: 'All' },
    { id: 'side_project', label: 'Side Projects' },
    { id: 'industrial_project', label: 'Industrial Projects' },
    { id: 'school_project', label: 'School Projects' },
  ];

  const allProjects = getProjects()
    .filter((project) => {
      if (projectCategory === 'all') return true;
      return project.projectCategory === projectCategory;
    })

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
      <ul className="flex space-x-2 my-10">
        {pageNumbers.map((number) => (
          <li key={number} className={`${
            currentPage === number ? 'bg-on-primary text-primary' : 'bg-gray-dark text-on-body'
          } px-4 py-2 rounded cursor-pointer`} onClick={() => setCurrentPage(number)}>
            {number}
          </li>
        ))}
      </ul>
    );
  };



  return (
    <SectionWrapper
      idName='project'

    >
      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className=''
      >
        <BackButton
          text='Back To Home'
        />
      </motion.div>

      <PageTitle
        title='Projects.'
        subtitle='My work'
        description='Following projects showcases my skills and experience through
        real-world examples of my work. It reflects my ability to solve complex problems, work with different technologies,
        and manage projects effectively. '
        className="mt-10"
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
      </motion.div>

      {/* <motion.div  
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className='mx-auto w-fit'>
        {renderPaginationLinks()}
      </motion.div > */}

      {/* Project Card */}
      <div className='mt-10 min-h-[1000px]'>
        <div className="flex flex-wrap gap-7 ">
          {allProjects.map((project, index: number) => (
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

export default AllProject