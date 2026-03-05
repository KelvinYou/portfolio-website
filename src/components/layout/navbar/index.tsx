"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DesktopNav } from "./desktop-nav";
import { MobileDrawer } from "./mobile-drawer";
import { NavbarActions } from "./navbar-actions";
import { NavbarLogo } from "./navbar-logo";
import { useNavbarState } from "./use-navbar-state";

export function Navbar() {
  const state = useNavbarState();

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          state.scrolled
            ? "bg-background/90 backdrop-blur-lg shadow-md"
            : "bg-background/30 backdrop-blur-sm",
        )}
        animate={{
          paddingTop: state.scrolled ? "0.25rem" : "0.5rem",
          paddingBottom: state.scrolled ? "0.25rem" : "0.5rem",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{
            width: `${state.scrollProgress * 100}%`,
            transition: state.isNavigating ? "none" : "width ease",
          }}
        />

        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 sm:h-16">
            <NavbarLogo onLogoClick={() => state.setMobileMenuOpen(false)} />
            <DesktopNav state={state} />
            <NavbarActions state={state} />
          </nav>
        </div>
      </motion.header>

      <MobileDrawer state={state} />
    </>
  );
}
