"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import { fadeIn, staggerContainer, textVariant } from "@/utils/motion";

interface SectionWrapperProps {
  idName: string;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ idName, children, title, subtitle, description }) => {
  const containerVariants: Variants = staggerContainer();

  const [ mount, setMount ] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`sm:px-16 px-6 sm:py-16 pb-10 pt-20 max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      <div className="">
        <motion.div
          initial="hidden"
          animate="show"
          variants={textVariant()}
        >
          {subtitle && <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            {subtitle}
          </p>}

          {title && <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            {title}
          </h2>}
          
        </motion.div>

        {description &&       
          <div className="w-full flex">
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              {description}
            </motion.p>
          </div>
        }
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
