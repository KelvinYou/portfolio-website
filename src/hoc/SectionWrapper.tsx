"use client";
import React, { FC, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

import { staggerContainer } from "../utils/motion";

interface SectionWrapperProps {
  idName: string;
  children: ReactNode;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ idName, children }) => {
  const containerVariants: Variants = staggerContainer();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
