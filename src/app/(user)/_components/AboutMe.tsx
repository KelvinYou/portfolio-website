
import React from "react";
// import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Image from "next/image";
// import { styles } from "../styles";
import { languages, summary, totalExperiences } from '@/constants/data';
import { fadeIn, textVariant } from "@/utils/motion";
import { SectionWrapper } from "@/hoc";
import HighlightText from "@/components/common/HighlightedText";
import Accordion from "@/components/Accordion";
import BaseCard from "@/components/ui/BaseCard";

// Service Card
// const ServiceCard = ({ index, title, icon }: { index: any, title: any, icon: any }) => {
//   return (
//     <Tilt className="xs:w-[250px] w-full">
//       <motion.div
//         variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
//         className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
//       >
//         <div
//           // options={{
//           //   max: 45,
//           //   scale: 1,
//           //   speed: 450,
//           // }}
//           className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
//         >
//           <Image src={icon} alt={title} className="w-16 h-16 object-contain" />
//           <h3 className="text-white text-[20px] font-bold text-center">
//             {title}
//           </h3>
//         </div>
//       </motion.div>
//     </Tilt>
//   );
// };

const OccupyProportion = ({title, percentage}: {title: string, percentage: number}) => {

  const levels = {
    0: 'Novice',
    20: 'Intermediate',
    40: 'Advanced',
    60: 'Superior',
    90: 'Distinguished'
  }

  let level = 'Novice'; // Default to 'Novice' if percentage is below the first level
  
  for (const [minPercentage, levelName] of Object.entries(levels)) {
    if (percentage >= Number(minPercentage)) {
      level = levelName;
    } else {
      break;
    }
  }

  const formatPercentage = (percentage: number): string => {
    return percentage.toFixed(0) + "%";
  }

  return (
    <>
      <span className="flex justify-between text-on-secondary mb-2">
        <span>{title}</span>
        <div className=" bg-slate-700 rounded-md font-light flex text-xs">
          <span className="py-1 px-2">
            {level} 
          </span>

          <div className="w-[1px] bg-gray-400"></div>

          <span className="py-1 px-2">
            {formatPercentage(percentage)}
          </span>
        </div>
      </span>

      <span>
        <div className="max-w-80% bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-on-primary h-2.5 rounded-full" style={{width: `${formatPercentage(percentage)}`}}></div>
        </div>
      </span>
    </>

  )
}


// About
const AboutMe: React.FC = () => {

  return (
    <SectionWrapper
      idName='about-me'
      title='Overview'
      subtitle='Introduction'
    >

      {/* Body */}
      {/* <motion.div
        // initial="hidden"
        // animate="show"
        variants={fadeIn("", "", 0.1, 1)}
      > */}
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

        
        <p className="empty-4 text-gray-300 text-[17px] max-w-3xl leading-[30px] text-justify mt-4">
          <HighlightText
            highlightedTexts={[
              totalExperiences,
              'blockchain, investing and chess'
            ]}
            text={summary}
          />

        </p>
        
        {/* <div className="mt-5 text-gray-300">

          Skills

          {Object.entries(skills).map(([category, items], index) => {
            return (
              <div key={index}>
                {capitalizeFirstLetter(category)}:
                {items.join(', ')}
              </div>
            )
          })}
        </div>

        <div className="mt-5 text-gray-300">
          Certs

          {certifications.map((cert, index) => {
            return (
              <div key={index}>
                {cert.name}
                {cert.issuingOrganization}
                {formatDate(cert.issueDate)}
              </div>
            )}
          )}
        </div> */}
        
        <BaseCard
          title={'Language'}
          tooltip="Language Evaluation: Evaluated by my ability to speak, read, and write"
          className="max-w-xl"
        >
          <ul>
            {languages.map((language, index: number) => {
              const readAndWritePercentage = language.readAndWrite * 100;
              const speakPercentage = language.speak * 100;
              const averagePercentage = (readAndWritePercentage + speakPercentage) / 2;

              return (
                <li key={language.name + index} className="mb-4">
                  <Accordion 
                    title={
                      <OccupyProportion
                        title={language.name}
                        percentage={averagePercentage} 
                      />
                    } 
                    id={`faqs-${index}`} 
                    active={false}
                  >
                    <div className="p-4">
                      <OccupyProportion
                        title={'Read and Write'}
                        percentage={readAndWritePercentage} 
                      />
                    </div>
                    <div className="p-4">
                      <OccupyProportion
                        title={'Speak'}
                        percentage={speakPercentage} 
                      />
                    </div>
                  </Accordion>
                </li>
              )
            })}
          </ul>
        </BaseCard>


      {/* </motion.div> */}


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
