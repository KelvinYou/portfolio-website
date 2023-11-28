"use client"

import ComputerCanvas from '@/components/canvas/ComputerCanvas'
import { HOME_PATH } from '@/constants/routes'
import { motion } from 'framer-motion'
import { ArrowDownCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const ComputerView = () => {
  const pathname = usePathname();

  return (
    <>
      <div className={`absolute w-full h-screen top-0 ${pathname === HOME_PATH ? "" : "hidden"}`}>
        <ComputerCanvas />

        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about-me">
            <div className="w-[35px] h-[64px] rounded-3xl flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="rounded-full mb-1 text-secondary"
              >
                <ArrowDownCircle size={36}/>
              </motion.div>
            </div>
          </a>
        </div>
      </div>
    </>

  )
}

export default ComputerView