import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelvin You | Software Engineer',
  description: 'Step into the world of my projects, where innovation meets creativity. From unique web interfaces to cutting-edge applications, explore a realm of tech-driven imagination.',

}

const ProjectsLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
    {children}
    
    </>
  )
}

export default ProjectsLayout