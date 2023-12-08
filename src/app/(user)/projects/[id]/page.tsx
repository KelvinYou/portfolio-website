import React, { FC } from 'react'
import ProjectDetail from './ProjectDetail'
import ProjectNotFound from './ProjectNotFound';
import { getProjectById } from '@/services/projectService';

const ProjectPage = ({ params }: { params: any }) => {
  const projectDetail = getProjectById(params.id);

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