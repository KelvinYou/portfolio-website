import React, { FC } from 'react'
import ProjectDetail from './ProjectDetail'
import ProjectNotFound from './ProjectNotFound';
import projects from '@/data/projects.json';

const ProjectPage = ({ params }: { params: any }) => {
  const projectDetail = projects.find((project) => project._id === params.id);

  if (!projectDetail) {
    return (
      <>
        <ProjectNotFound />
      </>
    )
  }

  return (
    <>
      <ProjectDetail projectDetail={projectDetail} />
    </>
  )
}

export default ProjectPage