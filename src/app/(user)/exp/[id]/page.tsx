import React from 'react'

const ExpPage = ({ params }: {
  params: { id: string }
}) => {
  
  return (
    <div>{params.id}</div>
  )
}

export default ExpPage