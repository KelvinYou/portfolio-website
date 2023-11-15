"use client"

import ComputerCanvas from '@/components/canvas/ComputerCanvas'
import { HOME_PATH } from '@/constants/routes'
import { usePathname } from 'next/navigation'
import React from 'react'

const ComputerView = () => {
  const pathname = usePathname();

  return (
    <>
      <div className={`absolute w-full h-screen top-0 ${pathname === HOME_PATH ? "" : "hidden"}`}>
        <ComputerCanvas />
      </div>
    </>

  )
}

export default ComputerView