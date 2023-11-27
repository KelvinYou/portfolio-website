"use client"

import SectionWrapper from "@/hoc/SectionWrapper";
import { fadeIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import React from "react";
import GitHubCalendar from "react-github-calendar";

const Github = () => {
  return (
    <SectionWrapper
      idName='github'
    >
      {/* Title */}
      <motion.div
        // initial="hidden"
        // animate="show"
        variants={textVariant()}
        className="mt-[100px]"
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Day I Code
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Github Calendar.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {/* Explanation: */}
          GitHub Calendar is a visual representation of my daily coding activity. 
        </motion.p>
      </div>

      <div className="text-white mt-20">
        <GitHubCalendar
          username="KelvinYou"
          blockSize={15}
          blockMargin={5}
          // year={2023}
          style={{ width: "max-content", margin: "auto" }}
          colorScheme='dark'
          fontSize={16}
        />
      </div>
    </SectionWrapper>
  );
}

export default Github;