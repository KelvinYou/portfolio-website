import { combinedExperiences } from '@/constants/data'
import React from 'react'
import ExpDetail from './ExpDetail';
import ExpNotFound from './ExpNotFound';
import EducationDetail from './EducationDetail';

const ExpPage = ({ params }: {
  params: { id: string }
}) => {
  
  const expDetail = combinedExperiences.find((exp) => (exp.id === params.id));

  if (!expDetail) {
    return (
      <>
        <ExpNotFound />
      </>
    )
  }

  return (
    <>
      {expDetail.experienceCategory === "education" ?
        <EducationDetail educationDetail={expDetail} /> 
        :
        <ExpDetail expDetail={expDetail} />
      }
      
    </>
  )
}

export default ExpPage