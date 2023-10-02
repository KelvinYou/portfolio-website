"use client";
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Image from "next/image";
// import { styles } from "../styles";
import { services } from '@/constants/data';
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

// Service Card
const ServiceCard = ({ index, title, icon }: { index: any, title: any, icon: any }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          // options={{
          //   max: 45,
          //   scale: 1,
          //   speed: 450,
          // }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <Image src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// About
const AboutMe = () => {
  return (
    <SectionWrapper
      idName='about me'
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Introduction
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Overview.
        </h2>
      </motion.div>

      {/* Body */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="empty-4 text-gray-300 text-[17px] max-w-3xl leading-[30px] text-justify"
      >
        I have developed in the field of software development for 4 years, 
        eagerly immersed in the exploration of cutting-edge trends such as 
        <span className="text-[#7de7eb] font-bold"> blockchain (web3) technology </span> 
        . With my proficiency, I can leverage the power of the 
        <span className="text-[#7de7eb] font-bold"> NodeJS framework (ReactJS, NextJS, ExpressJS) </span> 
        and leverage 
        <span className="text-[#7de7eb] font-bold"> Flutter </span> 
        proficiently to build hybrid apps that transcend the traditional boundaries 
        of the Android and iOS platforms.
        {/* I'm a 
        with experience in TypeScript and Javascript, and expertise in frameworks like 
        <span className="text-[#915eff] font-bold"> ReactJS (NextJS) </span>, 
        <span className="text-[#915eff] font-bold"> NodeJS (ExpressJS) </span>and
        <span className="text-[#915eff] font-bold"> Flutter</span>.
        I have a keen interest in staying up-to-date with the 
        
        <span className="text-[#915eff] font-bold"> latest trends and best practices </span>
        in technology. I am skilled in 

        <span className="text-[#915eff] font-bold"> problem-solving </span>
        and thrive 
        on finding innovative solutions. Collaborating closely with clients, I strive 
        to create 
        
        
        <span className="text-[#915eff] font-bold"> efficient, scalable, and user-friendly </span>
        applications that address 
        real-world challenges. I am a 
        <span className="text-[#915eff] font-bold"> quick learner </span>
        and dedicated to bringing your 
        ideas to life. Let's work together to bring your ideas to life! */}
      </motion.p>

      {/* Service Card */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service: any, i: number) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AboutMe;
