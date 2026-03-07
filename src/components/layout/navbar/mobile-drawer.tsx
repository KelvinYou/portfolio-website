"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { navItems, personalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, FileText, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getIcon } from "./navbar-utils";
import { NavbarState } from "./use-navbar-state";

interface MobileDrawerProps {
  state: NavbarState;
}

export function MobileDrawer({ state }: MobileDrawerProps) {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeRoute,
    isMobile,
    isTinyScreen,
    isVeryTinyScreen,
    handleLinkClick,
  } = state;

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Side drawer */}
          <motion.div
            className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-background border-l-2 border-foreground dark:border-white/25"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b-2 border-foreground dark:border-white/25">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage
                      src={personalInfo.profilePicture}
                      alt={personalInfo.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-xs">
                      {personalInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-primary">
                      {personalInfo.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground -mt-1">
                      {personalInfo.title}
                    </span>
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-sm h-8 w-8"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={isMobile ? 18 : 22} />
                </Button>
              </div>

              {/* Nav items */}
              <motion.div
                className="flex-1 overflow-auto py-6 px-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.07 },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                <div
                  className={cn(
                    "space-y-2",
                    isTinyScreen ? "grid grid-cols-2 gap-2 space-y-0" : "",
                  )}
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-sm transition-all duration-150",
                          isTinyScreen
                            ? "p-2 text-sm flex-col text-center gap-1"
                            : "p-3 text-base gap-2",
                          activeRoute === item.href.replace("/#", "")
                            ? "bg-primary/10 text-primary font-medium shadow-sm"
                            : "text-foreground hover:bg-muted/50",
                        )}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLinkClick();
                        }}
                      >
                        <div
                          className={cn(
                            "rounded-sm bg-card border-2 border-foreground dark:border-white/25 flex items-center justify-center",
                            isTinyScreen ? "w-8 h-8" : "w-9 h-9 mr-3",
                            activeRoute === item.href.replace("/#", "")
                              ? "bg-primary/5 border-primary/20 text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {getIcon(item.icon)}
                        </div>
                        <span>{item.name}</span>
                        {!isTinyScreen && (
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Footer */}
              <div className="p-4 border-t-2 border-foreground dark:border-white/25 flex items-center justify-between">
                <ThemeToggle />
                <Button
                  size="sm"
                  className="group relative overflow-hidden rounded-sm border-2 border-foreground dark:border-white/25 bg-primary px-5 text-xs text-primary-foreground neo-shadow-sm transition-all duration-150"
                  asChild
                >
                  <Link
                    href="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-rotate-3 group-hover:scale-110" />
                    <span className={isVeryTinyScreen ? "sr-only" : ""}>
                      Resume
                    </span>
{/* shimmer removed for neo-brutalism */}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
