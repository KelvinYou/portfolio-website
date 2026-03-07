"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { getIcon } from "./navbar-utils";
import { NavbarState } from "./use-navbar-state";

interface DesktopNavProps {
  state: NavbarState;
}

export function DesktopNav({ state }: DesktopNavProps) {
  const {
    activeRoute,
    isSmallScreen,
    handleLinkClick,
    getVisibleNavItems,
    moreItems,
    hasMoreItems,
  } = state;

  return (
    <div className="hidden md:block">
      <motion.div
        className="bg-card rounded-sm px-1 py-1 border-2 border-foreground dark:border-white/25"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <NavigationMenu>
          <NavigationMenuList className="gap-0.5 lg:gap-1">
            {getVisibleNavItems().map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  className={cn(
                    "transition-all duration-150 text-xs lg:text-sm rounded-sm px-3 lg:px-4 py-1.5 flex items-center gap-1.5 hover:bg-accent/50 hover:text-foreground cursor-pointer",
                    activeRoute === item.href.replace("/#", "")
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground",
                  )}
                  onClick={() => handleLinkClick(item.href)}
                >
                  <motion.div
                    className="flex items-center gap-1.5 md:gap-2"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        activeRoute === item.href.replace("/#", "")
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {getIcon(item.icon)}
                    </div>
                    <span
                      className={isSmallScreen ? "hidden lg:inline" : ""}
                    >
                      {item.name}
                    </span>
                  </motion.div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {hasMoreItems && (
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-sm text-xs lg:text-sm px-3 hover:bg-accent/50"
                    >
                      <span className="hidden lg:inline">More</span>
                      <span className="lg:hidden">&bull;&bull;&bull;</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 rounded-sm bg-card border-2 border-foreground dark:border-white/25"
                  >
                    {moreItems().map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                            activeRoute === item.href.replace("/#", "")
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-accent/50",
                          )}
                        >
                          <div className="w-6 h-6 rounded-sm bg-card flex items-center justify-center">
                            {getIcon(item.icon)}
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </div>
  );
}
