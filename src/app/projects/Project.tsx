"use client";
import { github, preview } from '@/assets';
import { projects } from '@/constants/data';
import { SectionWrapper } from '@/hoc'
import { fadeIn, textVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import Image from 'next/image';
import React from 'react'
import { Tilt } from "react-tilt";

// Project Card
const ProjectCard = (props: any) => {
  const { project } = props;

  return (
    <motion.div variants={fadeIn("up", "spring", project.index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          {/* Work image */}
          {(project.images && (project.images.length > 0 ))
            ? <Image
              src={project.images[0]}
              alt={project.name}
              className="w-full h-full object-cover rounded-2xl"
            />
            : <div className="w-full h-full object-cover rounded-2xl flex items-center justify-center bg-gray-300 dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
            </div>
          }

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">

            {/* Live Site */}
            {project.live_site_link && <div
              onClick={() => window.open(project.live_site_link, "_blank", "noreferrer")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <Image
                src={preview}
                alt="Live Site"
                title="Live Site"
                className="w-2/3 h-2/3 object-contain"
              />
            </div>}
            

            {/* Github */}
            {project.source_code_link && <div
              onClick={() => window.open(project.source_code_link, "_blank", "noreferrer")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
            >
              <Image
                src={github}
                alt="Github"
                title="Github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>}

          </div>
        </div>

        {/* Work Info */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{project.description}</p>
        </div>

        {/* Work Tag */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag: any, index: number) => (
            <p key={index + tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Project = () => {
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
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      {/* Project Card */}
        <div className="mt-20 flex flex-wrap gap-7">
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