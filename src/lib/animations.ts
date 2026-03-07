import { Variants } from "framer-motion";

/**
 * Shared animation variants — Neo-Brutalism: snappy, immediate feel
 */

// Standard fade in with upward movement
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

// Fade in with configurable delay (for staggered items)
export const fadeInWithDelay = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
});

// Container that staggers children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Container with configurable stagger timing
export const staggerContainerWithTiming = (
  staggerChildren: number = 0.12,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Slide in from direction
export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  distance: number = 50
): Variants => {
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  };

  return {
    hidden: { opacity: 0, ...directions[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };
};

// Scale animation for cards/buttons
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

// Page transition animation for route changes
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15 },
  },
};

// Common viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: "-100px" as const,
};
