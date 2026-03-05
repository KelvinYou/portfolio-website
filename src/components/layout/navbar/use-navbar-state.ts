"use client";

import { navItems } from "@/constants";
import { NavItem } from "@/types";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface NavbarState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  scrolled: boolean;
  scrollProgress: number;
  activeRoute: string;
  isMobile: boolean;
  isSmallScreen: boolean;
  isTinyScreen: boolean;
  isVeryTinyScreen: boolean;
  isClient: boolean;
  isNavigating: boolean;
  handleLinkClick: (href?: string) => void;
  getVisibleNavItems: () => NavItem[];
  moreItems: () => NavItem[];
  hasMoreItems: boolean;
}

export function useNavbarState(): NavbarState {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const prevScrollY = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeRoute, setActiveRoute] = useState("/");
  const [isNavigating, setIsNavigating] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  // Track if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track window size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position for navbar styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = isClient && windowWidth < 640 ? 30 : 50;
    setScrolled(latest > threshold);
    if (isClient) {
      prevScrollY.current = latest;
    }
  });

  // Track active section based on scroll position
  useEffect(() => {
    if (!isClient) return;

    const sections = navItems.map((item) => item.href.replace("/#", ""));

    const handleScroll = () => {
      let currentSection = "";
      let maxVisibility = 0;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          const visibleTop = Math.max(elementTop, window.scrollY);
          const visibleBottom = Math.min(
            elementBottom,
            window.scrollY + window.innerHeight,
          );
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const viewportCenter = window.scrollY + window.innerHeight / 2;
          const distanceFromCenter = Math.abs(
            elementTop + rect.height / 2 - viewportCenter,
          );
          const normalizedDistance =
            1 - Math.min(distanceFromCenter / (window.innerHeight / 2), 1);
          const visibilityScore = visibleHeight * normalizedDistance;

          if (visibilityScore > maxVisibility) {
            maxVisibility = visibilityScore;
            currentSection = section;
          }
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth, isClient, activeSection]);

  // Update active route when pathname changes
  useEffect(() => {
    setScrollProgress(0);
    setIsNavigating(false);

    const matchedRoute = navItems.find((item) => {
      if (item.href === "/" && pathname === "/") return true;
      if (item.href !== "/" && pathname.startsWith(item.href)) return true;
      return false;
    });

    setActiveRoute(matchedRoute?.href || pathname);
  }, [pathname]);

  // Calculate scroll progress
  useEffect(() => {
    if (isNavigating) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollableHeight = scrollHeight - clientHeight;
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

      setScrollProgress(progress);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isNavigating]);

  const handleLinkClick = useCallback(
    (href?: string) => {
      setIsNavigating(true);
      setScrollProgress(0);
      if (href) {
        router.push(href);
      }
    },
    [router],
  );

  const getVisibleNavItems = useCallback(() => {
    if (!isClient) return navItems.slice(0, 3);
    if (windowWidth < 1024) return navItems.slice(0, 3);
    if (windowWidth < 1280) return navItems.slice(0, 5);
    return navItems;
  }, [isClient, windowWidth]);

  const moreItems = useCallback(() => {
    if (!isClient) return navItems.slice(3);
    if (windowWidth < 1024) return navItems.slice(3);
    if (windowWidth < 1280) return navItems.slice(5);
    return [];
  }, [isClient, windowWidth]);

  const isMobile = isClient && windowWidth < 640;
  const isSmallScreen = isClient && windowWidth < 1024;
  const isTinyScreen = isClient && windowWidth < 400;
  const isVeryTinyScreen = isClient && windowWidth < 350;

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeSection,
    scrolled,
    scrollProgress,
    activeRoute,
    isMobile,
    isSmallScreen,
    isTinyScreen,
    isVeryTinyScreen,
    isClient,
    isNavigating,
    handleLinkClick,
    getVisibleNavItems,
    moreItems,
    hasMoreItems: moreItems().length > 0,
  };
}
