"use client"

import { projects } from '@/constants/data'
import SectionWrapper from '@/hoc/SectionWrapper'
import { textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import React, { FC } from 'react'

interface ProjectDetailProps {
  id: string,
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  const { id } = props;
  const projectDetail = projects.find((project) => project.id === parseInt(id));

  if (!projectDetail) {
    return <div>Project not found</div>;
  }

  const {
    name,
    description,
    tags,
    images,
    liveSiteLink,
    sourceCodeLink,
    platforms,
    date,
  } = projectDetail;

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
          My project
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          {name}
        </h2>
      </motion.div>
    </SectionWrapper>
  )
}

export default ProjectDetail