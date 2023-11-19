import React from 'react'
import ProjectDetail from './ProjectDetail'

const ProjectDetailPage = ({ params }: { params: any }) => {

  return (
    <div className='p-4'>
      <ProjectDetail id={params.id} />
    </div>
  )
}

export default ProjectDetailPage