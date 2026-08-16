"use client";

import { personalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "shrink-0 rounded-sm font-mono text-[13px] font-semibold uppercase tracking-[0.09em]",
        "text-foreground transition-opacity duration-150 hover:opacity-60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {personalInfo.name}
    </Link>
  );
}
