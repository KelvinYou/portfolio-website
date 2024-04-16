"use client";

import SelectableButtonGroup from '@/components/SelectableButtonGroup';
import { SectionWrapper } from '@/hoc'
import { fadeIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { getProjects } from '@/services/projectService';
import PageTitle from '@/components/PageTitle'
import ProjectCard from './_components/ProjectCard';
import BackButton from '@/components/BackButton';
import SpotlightGrid, { SpotlightGridType } from '@/components/SpotlightGrid';
import { ProjectType } from '@/types/project';
import { github, preview } from '@/assets';
import { createProjectItem } from '@/utils/projectUtil';

const AllProject: React.FC = () => {
  const [projectCategory, setProjectCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const handleOptionChange = (selectedOption: string) => {
    setProjectCategory(selectedOption);
    setCurrentPage(1);
  };
  
  const totalProjects = getProjects()


  const projectTypeMap: {
    [key: string]: string;
  } = {
    all: 'All',
    side_project: 'Side Projects',
    school_project: 'School Projects'
  }
  
  const options = Object.keys(projectTypeMap).map(key => ({
    id: key,
    label: projectTypeMap[key]
  }));

  const countItem = Object.keys(projectTypeMap).map(key => {
    let count = 0;

    if (key === 'all') {
      count = totalProjects.length
    } else {
      count = totalProjects.filter(project => project.projectCategory === key).length;
    }

    return ({
      id: key,
      label: projectTypeMap[key],
      count
    })
  });

  const highlightedTexts: string[] = [];

  const totalCount = countItem.find(item => item.id === 'all')?.count || 0;
  highlightedTexts.push(totalCount.toString());
  const categoryCounts = countItem
    .filter(item => item.id !== 'all')
    .map(item => {
      highlightedTexts.push(item.count.toString())
      return( `${item.count} ${item.label}` )
    })
    .join(', ');
  
  const totalProjectsText = totalCount === 1 ? 'project' : 'projects';
  const sentence = `In total, there are ${totalCount} ${totalProjectsText}. Of these, ${categoryCounts}.`;
  
  const allProjects = getProjects()
    .filter((project) => {
      if (projectCategory === 'all') return true;
      return project.projectCategory === projectCategory;
    })

  const projectItems: SpotlightGridType[] = allProjects
    .map(createProjectItem);

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
        description={[
          `Following projects showcases my skills and experience through
          real-world examples of my work. It reflects my ability to solve complex problems, work with different technologies,
          and manage projects effectively.`, 
          `${sentence}`
        ]}
        highLightedTexts={highlightedTexts}
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
      {/* <div className='mt-10 min-h-[1000px]'>
        <div className="flex flex-wrap gap-7">
          {allProjects.map((project, index: number) => (
            <ProjectCard 
              key={`project-${index}`} 
              project={project}
              index={index}
            />
          ))}
        </div>
      </div> */}
      
      <SpotlightGrid items={projectItems} />
    </SectionWrapper>
  )
}

export default AllProject