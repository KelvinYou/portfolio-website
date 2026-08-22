"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface LightboxFilmstripProps {
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

/**
 * Two representations of the same thing, picked by available space in CSS so
 * there is no resize-listener flicker:
 *  - a contact strip where there is vertical room,
 *  - dots on short viewports (landscape phones), where a strip would steal the
 *    height the photo needs.
 */
export function LightboxFilmstrip({
  items,
  currentIndex,
  onNavigate,
}: LightboxFilmstripProps) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = stripRef.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );
    active?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [currentIndex]);

  if (items.length <= 1) return null;

  return (
    <>
      <div
        ref={stripRef}
        className="gallery-thumbnails scrollbar-hide hidden max-w-full items-end gap-1.5 overflow-x-auto px-1 pb-1 [@media(min-height:34rem)]:flex"
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={item.id}
              data-active={isActive}
              onClick={() => onNavigate(index)}
              aria-label={`Go to photo ${index + 1}`}
              aria-current={isActive}
              className="group/thumb flex flex-shrink-0 flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span
                className={cn(
                  "relative block h-9 w-14 overflow-hidden rounded-md transition-all duration-500 sm:h-11 sm:w-16",
                  "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                  isActive
                    ? "opacity-100 grayscale-0"
                    : "opacity-40 grayscale hover:opacity-80 hover:grayscale-0",
                )}
              >
                <Image
                  src={item.thumbnail || item.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span
                className={cn(
                  "block h-px w-full origin-center transition-transform duration-500",
                  isActive
                    ? "scale-x-100 bg-primary"
                    : "scale-x-0 bg-white/40 group-hover/thumb:scale-x-100",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 [@media(min-height:34rem)]:hidden">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(index)}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={index === currentIndex}
            className="flex h-7 w-4 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-400",
                index === currentIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-white/30 hover:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
