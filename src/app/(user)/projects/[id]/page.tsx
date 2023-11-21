import React, { FC } from 'react'
import ProjectDetail from './ProjectDetail'

const ProjectPage = ({ params }: { params: any }) => {

  return (
    <>
      <ProjectDetail id={params.id}/>
    </>
  )
}

export default ProjectPage