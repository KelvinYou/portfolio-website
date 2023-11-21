import { combinedExperiences } from '@/constants/data'
import React from 'react'
import ExpDetail from './ExpDetail';
import ExpNotFound from './ExpNotFound';

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
      <ExpDetail expDetail={expDetail} />
    </>
  )
}

export default ExpPage