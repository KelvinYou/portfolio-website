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
            "group relative overflow-hidden rounded-sm",
            "border-2 border-foreground dark:border-white/25 bg-primary",
            "px-5 text-xs text-primary-foreground neo-shadow-sm",
            "transition-all duration-150 hover:border-primary sm:text-sm",
          )}
          asChild
        >
          <Link href="/resume">
            <FileText className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-rotate-3 group-hover:scale-110" />
            <span className={isSmallScreen ? "hidden lg:inline" : ""}>
              {t("resume")}
            </span>
{/* shimmer removed for neo-brutalism */}
          </Link>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-foreground rounded-sm h-8 w-8"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open mobile menu"
      >
        <Menu size={isMobile ? 16 : 20} />
      </Button>
    </motion.div>
  );
}
