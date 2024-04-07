"use client";
import React, { FC } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Image from "next/image";
// import { styles } from "../styles";
import { languages, services, summary, totalExperiences } from '@/constants/data';
import { fadeIn, textVariant } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";
import HighlightText from "@/components/common/HighlightedText";
import { calculateExperience } from "@/utils/common";

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
const AboutMe: FC = () => {

  return (
    <SectionWrapper
      idName='about-me'
      title='Overview.'
      subtitle='Introduction'
    >

      {/* Body */}
      <motion.div
        // initial="hidden"
        // animate="show"
        variants={fadeIn("", "", 0.1, 1)}
      >
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <div>
            <div className="h-[60px] font-bold text-lg text-on-primary flex flex-row justify-start items-start">
              <div className="text-[50px] mb-[-10px]">
                4
              </div>
              <div className="text-[30px] mt-[-5px]">
                +
              </div>
            </div>
            <div className="text-secondary">
              years of experience
            </div>
          </div>

          <div>
            <div className="h-[60px] font-bold text-lg text-on-primary flex flex-row justify-start items-start">
              <div className="text-[50px] mb-[-10px]">
                6
              </div>
              <div className="text-[30px] mt-[-5px]">
                +
              </div>
            </div>
            <div className="text-secondary">
              projects
            </div>
          </div>

        </div> */}
        {/* <ul className="text-gray-300 max-w-3xl">

          <li>
            <span>
              Name:
            </span>

            <span>
              Kelvin
            </span>
          </li>

          <li>
            <span>
              Start Coding:
            </span>

            <span>
              2018
            </span>
          </li>

          <li>
            <span>Language: </span>
            <span>
              <ul>
                {languages.map((language, index: number) => {
                  const percentage = ((language.readAndWrite * 100) + (language.speak * 100)) / 2;
                  const formattedPercentage = percentage.toFixed(0) + "%";

                  return (
                    <li key={language.name + index} className="flex items-center gap-2">
                      <span>{language.name}</span>
                      <span>
                        <div className="w-[300px] max-w-80% bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-on-primary h-2.5 rounded-full" style={{width: `${formattedPercentage}`}}></div>
                        </div>
                      </span>
                      <div>{formattedPercentage}</div>
                    </li>
                  )
                })}
              </ul>
            </span>
            
          </li>
          
        </ul> */}
        


        <p className="empty-4 text-gray-300 text-[17px] max-w-3xl leading-[30px] text-justify">
          <HighlightText
            highlightedTexts={[
              totalExperiences,
              'blockchain, investing and chess'
            ]}
            text={summary}
          />

          {/* I have developed in the field of software development for 4 years, 
          eagerly immersed in the exploration of cutting-edge trends such as 
          <span className="text-on-primary font-bold"> blockchain (web3) technology </span> 
          . With my proficiency, I can leverage the power of the 
          <span className="text-on-primary font-bold"> NodeJS framework (ReactJS, NextJS, ExpressJS) </span> 
          and leverage 
          <span className="text-on-primary font-bold"> Flutter </span> 
          proficiently to build hybrid apps that transcend the traditional boundaries 
          of the Android and iOS platforms. */}
        </p>
      </motion.div>

      {/* <motion.div
        initial="hidden"
        animate="show"
        variants={textVariant()}
        className="mt-4"
      >
        <Link 
          href="/resume"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold 
          rounded-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg flex gap-3 w-fit">
          Resume <ArrowRight />
        </Link>
      </motion.div> */}

      {/* Service Card */}
      {/* <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service: any, i: number) => (
          <ServiceCard key={service.title} index={i} {...service} />
        ))}
      </div> */}
    </SectionWrapper>
  );
};

export default AboutMe;
