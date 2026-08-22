"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { DOMAttributes } from "react";
import { LightboxNav } from "./lightbox-chrome";
import { MobileSwipeIndicator } from "./mobile-swipe-indicator";

interface LightboxStageProps {
  item: GalleryItem;
  slideOffset: number;
  transform: string;
  isLoading: boolean;
  zoom: number;
  isDragging: boolean;
  chromeVisible: boolean;
  hasSiblings: boolean;
  showSwipeHint: boolean;
  onSwipeHintHide: () => void;
  onLoaded: () => void;
  onToggleZoom: () => void;
  onPrevious: () => void;
  onNext: () => void;
  handlers: DOMAttributes<HTMLDivElement>;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The photo itself. `min-h-0` on this grid row is what lets the image shrink to
 * fit instead of shoving the footer off the bottom of a short screen, and
 * `object-contain` with no vh magic number keeps it correct in landscape.
 */
export function LightboxStage({
  item,
  slideOffset,
  transform,
  isLoading,
  zoom,
  isDragging,
  chromeVisible,
  hasSiblings,
  showSwipeHint,
  onSwipeHintHide,
  onLoaded,
  onToggleZoom,
  onPrevious,
  onNext,
  handlers,
}: LightboxStageProps) {
  return (
    <div
      className="relative flex min-h-0 items-center justify-center px-3 sm:px-6 [@media(hover:hover)]:px-16"
      {...handlers}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: slideOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -slideOffset }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex h-full w-full items-center justify-center"
        >
          {item.type === "video" ? (
            <video
              className="max-h-full max-w-full rounded-lg shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]"
              controls
              autoPlay
              playsInline
              onLoadedData={onLoaded}
              style={{ transform }}
            >
              <source src={item.src} type="video/mp4" />
              <source src={item.src} type="video/webm" />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt || item.title || "Gallery photo"}
              width={item.width || 1600}
              height={item.height || 1067}
              sizes="100vw"
              className={cn(
                "h-auto max-h-full w-auto max-w-full select-none rounded-lg object-contain",
                "shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10",
                "transition-[opacity,filter] duration-500",
                isLoading ? "opacity-0 blur-md" : "opacity-100 blur-0",
                zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
                isDragging && "cursor-grabbing",
              )}
              style={{ transform }}
              onLoad={onLoaded}
              onDoubleClick={onToggleZoom}
              priority
            />
          )}
        </motion.div>
      </AnimatePresence>

      {isLoading && (
        <span className="pointer-events-none absolute font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
          Loading
        </span>
      )}

      {hasSiblings && (
        <LightboxNav
          visible={chromeVisible}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      )}

      <MobileSwipeIndicator show={showSwipeHint} onHide={onSwipeHintHide} />
    </div>
  );
}
