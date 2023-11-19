"use client";

import Image from 'next/image';
import { preview, github } from "@/assets";
import Tooltip from "@/components/ui/Tooltip";
import { formatDate } from "@/utils/dateUtil";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Tilt } from "react-tilt";
import { FC } from 'react';

const ProjectCard: FC<{ project: any }> = ({ project }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={fadeIn("up", "spring", project.index * 0.5, 0.75)} 
      className='sm:w-[360px] w-full cursor-pointer'
    >
      <Tilt
        options={{
          max: 0,
          scale: 1.03,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl h-full relative"
      >
        <div className="relative w-full h-[230px]">
          {/* Work image */}
          {(project.images && (project.images.length > 0 ))
            ? <Image
              src={project.images[0]}
              alt={project.name}
              priority={true}
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
            {project.liveSiteLink && <Tooltip
              content="Live Preview"
            >
              <div
                onClick={() => window.open(project.liveSiteLink, "_blank", "noreferrer")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <Image
                  src={preview}
                  alt="Live Site"
                  title="Live Site"
                  className="w-2/3 h-2/3 object-contain"
                />
              </div>
            </Tooltip>}
            

            {/* Github */}
            {project.sourceCodeLink && <Tooltip
              content="View Source Code"
            >
              <div
                onClick={() => window.open(project.sourceCodeLink, "_blank", "noreferrer")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
              >
                <Image
                  src={github}
                  alt="Github"
                  title="Github"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </Tooltip>}

          </div>
        </div>

        {/* Work Info */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{project.description}</p>
        </div>

        {/* Work Tag */}
        <div className="mt-4 flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag: any, index: number) => (
            <p key={index + tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-1 justify-end absolute bottom-4 right-4 opacity-80">
          {/* <SvgIcon type={ICON_TYPE.CLOCK_OUTLINE} color="rgb(254 240 138)" size={18}/> */}
          <Clock size={14} color='rgb(254 240 138)'/>
          <p className="text-yellow-200 text-[12px]">{formatDate(project.date)}</p>
        </div>
      </Tilt>
    </motion.div>
  )
}

export default ProjectCard;