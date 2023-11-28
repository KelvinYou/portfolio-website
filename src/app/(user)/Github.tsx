"use client"

import SelectableButtonGroup from "@/components/SelectableButtonGroup";
import SectionWrapper from "@/hoc/SectionWrapper";
import { fadeIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GitHubCalendar from "react-github-calendar";

const Github = () => {
  const [projectCategory, setProjectCategory] = useState("github");

  const handleOptionChange = (selectedOption: string) => {
    // Do something with the selected option, such as updating state
    setProjectCategory(selectedOption);
  };
  
  const options = [
    { id: 'github', label: 'Github' },
    { id: 'github_3d', label: 'Github 3D' },
  ];

  return (
    <SectionWrapper
      idName='github'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className="mt-[100px]"
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Day I Code
        </p>
        {/* <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Github Calendar.
        </h2> */}
      </motion.div>

      {/* <div className="w-full flex">
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          GitHub Calendar is a visual representation of my daily coding activity. 
        </motion.p>
      </div> */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className='flex items-center justify-center mt-10'
      >
        <SelectableButtonGroup
          options={options}
          onOptionChange={handleOptionChange}
        />
      </motion.div>

      <div className="mt-10">
        <div 
          className={`text-white mt-10 ${projectCategory === "github" ? "block" : "hidden"}`}
        >
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
        
        <div 
          className={`max-w-5xl mx-auto ${projectCategory === "github_3d" ? "block" : "hidden"}`} 
        >
          <img 
            src="https://raw.githubusercontent.com/KelvinYou/KelvinYou/main/profile-3d-contrib/profile-night-rainbow.svg" 
          />
        </div>
      </div>

    </SectionWrapper>
  );
}

export default Github;