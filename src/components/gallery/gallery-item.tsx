"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ExpandIcon, PlayIcon } from "lucide-react";

interface GalleryItemProps {
  item: GalleryItem;
  index: number;
  total: number;
  isLead: boolean;
  showTitle: boolean;
  showDescription: boolean;
  enableLightbox: boolean;
  className?: string;
  onClick: () => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Tiles keep their own proportions, but clamped — an extreme panorama or a very
 * tall portrait would otherwise blow the row height out on narrow screens.
 */
function frameRatio(width: number, height: number, isLead: boolean) {
  const natural = width / height;
  const [min, max] = isLead ? [1.4, 2.4] : [0.74, 1.6];
  return Math.min(Math.max(natural, min), max);
}

export function GalleryItemComponent({
  item,
  index,
  total,
  isLead,
  showTitle,
  showDescription,
  enableLightbox,
  className,
  onClick,
}: GalleryItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const width = item.width || 1200;
  const height = item.height || 800;
  const ratio = frameRatio(width, height, isLead);
  const label = item.title || item.alt || `Photo ${pad(index + 1)}`;

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (enableLightbox && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-foreground/[0.04] p-6 ring-1 ring-foreground/10",
          className,
        )}
        style={{ aspectRatio: ratio }}
      >
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          {pad(index + 1)} unavailable
        </p>
      </div>
    );
  }

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: Math.min(index, 5) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative min-w-0 @container/tile",
        isLead && "@[46rem]/gallery:col-span-2",
        className,
      )}
    >
      <div
        ref={frameRef}
        onClick={enableLightbox ? onClick : undefined}
        onKeyDown={handleKeyDown}
        onPointerMove={handlePointerMove}
        tabIndex={enableLightbox ? 0 : -1}
        role={enableLightbox ? "button" : undefined}
        aria-label={enableLightbox ? `Open ${label}` : undefined}
        style={{ aspectRatio: ratio }}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-foreground/[0.04]",
          "ring-1 ring-foreground/10 transition-[box-shadow,ring-color,transform] duration-500",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
          enableLightbox &&
            "cursor-pointer hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)] hover:ring-primary/25 motion-safe:hover:-translate-y-0.5",
        )}
      >
        {isLoading && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </div>
        )}

        {item.type === "video" ? (
          <video
            className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
            poster={item.thumbnail}
            preload="metadata"
            muted
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          >
            <source src={item.src} type="video/mp4" />
            <source src={item.src} type="video/webm" />
          </video>
        ) : (
          <Image
            src={item.src}
            alt={item.alt || item.title || label}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 33vw"
            className={cn(
              "object-cover transition-[transform,opacity] duration-700",
              "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
              "motion-safe:group-hover:scale-[1.05]",
              isLoading ? "opacity-0" : "opacity-100",
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        )}

        {/* Cyan spotlight follows the cursor — the site's signature interaction */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, rgba(0,240,255,0.16), transparent 55%)`,
          }}
        />

        {/* Legibility scrim under the caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tabular-nums tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-primary">
          {pad(index + 1)}
          <span className="text-white/25">/{pad(total)}</span>
        </span>

        {item.type === "video" && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-[clamp(2.5rem,14%,3.5rem)] w-[clamp(2.5rem,14%,3.5rem)] items-center justify-center rounded-full bg-black/35 ring-1 ring-white/40 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
              <PlayIcon className="ml-0.5 h-4 w-4 fill-white text-white" />
            </span>
          </span>
        )}

        {/* Caption. Hover devices get the reveal; touch devices always see it,
            because a hover-only caption is invisible on a phone. */}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
          <span className="min-w-0">
            <span className="block truncate font-heading text-[clamp(0.75rem,2.6cqw,0.9375rem)] font-semibold leading-tight tracking-[-0.01em] text-white [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-all [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100">
              {label}
            </span>
            {item.description && (
              <span className="mt-0.5 hidden truncate text-[11px] leading-snug text-white/55 @[22rem]/gallery:block [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:delay-75 [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:opacity-100">
                {item.description}
              </span>
            )}
          </span>

          {enableLightbox && (
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-500 group-hover:bg-primary/20 group-hover:text-primary group-hover:ring-primary/40">
              <ExpandIcon className="h-3.5 w-3.5" />
            </span>
          )}
        </figcaption>
      </div>

      {(showTitle || showDescription) && (item.title || item.description) && (
        <div className="mt-3 min-w-0">
          {showTitle && item.title && (
            <h3 className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">
              {item.title}
            </h3>
          )}
          {showDescription && item.description && (
            <p className="mt-1 text-xs leading-relaxed text-subtle">
              {item.description}
            </p>
          )}
        </div>
      )}
    </motion.figure>
  );
}
