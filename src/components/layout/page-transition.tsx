"use client";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  // Route-level enter/exit animation remounted the whole page tree on
  // navigation, causing child motion elements to animate a second time.
  return <>{children}</>;
}
