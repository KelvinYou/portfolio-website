"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { personalInfo } from "@/constants";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavbarLogoProps {
  onLogoClick: () => void;
}

export function NavbarLogo({ onLogoClick }: NavbarLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0"
    >
      <Link
        href="/"
        className="flex items-center gap-1 sm:gap-2"
        onClick={onLogoClick}
      >
        <div className="relative">
          <Avatar className="h-7 w-7 sm:h-9 sm:w-9 border-2 border-primary/30 shadow-lg">
            <AvatarImage
              src={personalInfo.memoji}
              alt={`${personalInfo.name}'s profile picture`}
            />
            <AvatarFallback className="bg-primary/10 text-xs sm:text-sm">
              {personalInfo.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
        <motion.div className="flex flex-col">
          <motion.span
            className="font-bold text-base sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {personalInfo.name}
          </motion.span>
          <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">
            {personalInfo.title}
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
