"use client";

import { KyMark } from "@/components/brand/ky-mark";
import { personalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${personalInfo.name} — home`}
      className={cn(
        "group flex shrink-0 items-center gap-2.5 rounded-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      {/* The mark takes the accent on hover; the wordmark just recedes. Two
          different responses read as one lockup rather than two links. */}
      <KyMark className="h-[18px] w-[18px] text-foreground transition-colors duration-150 group-hover:text-primary-ink" />
      {/* <span
        className={cn(
          "font-mono text-[13px] font-semibold uppercase tracking-[0.09em]",
          "text-foreground transition-opacity duration-150 group-hover:opacity-60",
        )}
      >
        {personalInfo.name}
      </span> */}
    </Link>
  );
}
