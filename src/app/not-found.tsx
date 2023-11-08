"use client";

import { HOME_PATH } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(HOME_PATH);
  });
  
  return (
    <>Loading ...</>
  )
}

export default NotFound