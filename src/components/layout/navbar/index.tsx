"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MobileSheet } from "./mobile-sheet";
import { NavbarActions } from "./navbar-actions";
import { NavbarLogo } from "./navbar-logo";
import { SectionIndexRule, SectionIndexTrack } from "./section-index";
import { useSectionIndex } from "./use-section-index";

export function Navbar() {
  const index = useSectionIndex();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
          lifted
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-background/60 backdrop-blur-sm",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex h-14 items-center justify-between gap-6"
            aria-label={t("primary")}
          >
            <NavbarLogo onNavigate={() => setMenuOpen(false)} />
            <SectionIndexTrack index={index} />
            <NavbarActions onOpenMenu={() => setMenuOpen(true)} />
          </nav>
        </div>

        <SectionIndexRule index={index} />
      </header>

      <MobileSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        index={index}
      />
    </>
  );
}
