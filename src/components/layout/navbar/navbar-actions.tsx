"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileText, Menu } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { NavbarState } from "./use-navbar-state";

interface NavbarActionsProps {
  state: NavbarState;
}

export function NavbarActions({ state }: NavbarActionsProps) {
  const { isMobile, isSmallScreen, setMobileMenuOpen } = state;
  const t = useTranslations("nav");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 sm:gap-3"
    >
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <div className="hidden md:flex">
        <Button
          size="sm"
          className={cn(
            "group relative overflow-hidden rounded-full border-0",
            "bg-gradient-to-r from-primary/90 to-indigo-500/90",
            "px-5 text-xs text-primary-foreground shadow-lg shadow-primary/20",
            "transition-all hover:shadow-xl hover:shadow-primary/30 sm:text-sm",
          )}
          asChild
        >
          <Link href="/resume">
            <FileText className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-rotate-3 group-hover:scale-110" />
            <span className={isSmallScreen ? "hidden lg:inline" : ""}>
              {t("resume")}
            </span>
            <span className="animate-shimmer absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground rounded-full h-8 w-8"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open mobile menu"
      >
        <Menu size={isMobile ? 16 : 20} />
      </Button>
    </motion.div>
  );
}
