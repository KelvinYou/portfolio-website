import { experiences } from '@/constants/data'
import React from 'react'
import ExpDetail from './ExpDetail';

const ExpPage = ({ params }: {
  params: { id: string }
}) => {
  
  const expDetail = experiences.find((exp) => (exp.id === parseInt(params.id)));

  return (
    <>
      <ExpDetail expDetail={expDetail} />
    </>
  )
}

export default ExpPage