"use client";
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Image from "next/image";
// import { styles } from "../styles";
import { services } from '@/constants/data';
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import Link from "next/link";

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
      {/* <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
      >
        <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Know who is me faster
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          About Me.
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-5"
      >
        <p></p>
        <Link 
          href="https://github.com/KelvinYou" 
          target="_blank"
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">My Github</span>
          
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>

      </motion.div>

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
      </motion.p> */}

      {/* Title */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className="mt-[100px]"
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
