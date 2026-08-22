"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  InfoIcon,
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  RotateCwIcon,
  Share2Icon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Ghost icon button. 44px hit area on touch (WCAG target size) shrinking to a
 * tighter 36px where a mouse is doing the pointing.
 */
export function ChromeButton({
  className,
  children,
  ...props
}: ComponentProps<"button"> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white/60",
        "[@media(hover:hover)]:h-9 [@media(hover:hover)]:w-9",
        "transition-colors duration-300 hover:bg-white/10 hover:text-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-25",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TopRailProps {
  currentIndex: number;
  total: number;
  title?: string;
  visible: boolean;
  onClose: () => void;
}

export function LightboxTopRail({
  currentIndex,
  total,
  title,
  visible,
  onClose,
}: TopRailProps) {
  return (
    <header
      className={cn(
        "z-50 flex items-center justify-between gap-4 px-[max(1rem,env(safe-area-inset-left))] py-3 sm:px-6 sm:py-4",
        "transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
        <span className="flex-shrink-0 font-mono text-[11px] tabular-nums tracking-[0.25em] text-white/70">
          {pad(currentIndex + 1)}
          <span className="mx-1.5 text-white/25">/</span>
          {pad(total)}
        </span>
        {title && (
          <span className="truncate font-heading text-xs font-medium tracking-[-0.01em] text-white/45 sm:text-sm">
            {title}
          </span>
        )}
      </div>

      <ChromeButton onClick={onClose} aria-label="Close gallery">
        <XIcon className="h-5 w-5" />
      </ChromeButton>
    </header>
  );
}

interface NavProps {
  visible: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Edge hit-zones. They sit above the stage on pointer devices only — on touch,
 * swiping is the gesture and invisible edge buttons just eat taps.
 */
export function LightboxNav({ visible, onPrevious, onNext }: NavProps) {
  const zone =
    "group absolute inset-y-0 z-40 hidden w-[15%] max-w-32 items-center [@media(hover:hover)]:flex focus-visible:outline-none";
  const glyph =
    "flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white/70 ring-1 ring-white/15 backdrop-blur-md transition-all duration-500 group-hover:text-primary group-hover:ring-primary/40 group-focus-visible:text-primary group-focus-visible:ring-primary";

  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous photo"
        className={cn(zone, "left-0 justify-start pl-3 sm:pl-5")}
      >
        <span
          className={cn(
            glyph,
            "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
            visible && "opacity-50",
          )}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </span>
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className={cn(zone, "right-0 justify-end pr-3 sm:pr-5")}
      >
        <span
          className={cn(
            glyph,
            "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
            visible && "opacity-50",
          )}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </span>
      </button>
    </>
  );
}

interface ToolsProps {
  isImage: boolean;
  isCoarsePointer: boolean;
  hasSiblings: boolean;
  zoom: number;
  showInfo: boolean;
  isSlideshow: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onToggleInfo: () => void;
  onToggleSlideshow: () => void;
  onFullscreen: () => void;
  onShare: () => void;
  onDownload: () => void;
}

/**
 * One hairline rail. Zoom/rotate/fullscreen are pointer-only — they are either
 * unusable or redundant with native pinch-zoom on touch, and dropping them is
 * what keeps the rail inside a 320px viewport.
 */
export function LightboxTools({
  isImage,
  isCoarsePointer,
  hasSiblings,
  zoom,
  showInfo,
  isSlideshow,
  onZoomIn,
  onZoomOut,
  onRotate,
  onToggleInfo,
  onToggleSlideshow,
  onFullscreen,
  onShare,
  onDownload,
}: ToolsProps) {
  const active = "bg-white/10 text-primary";

  return (
    <div className="flex flex-shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-black/40 px-1.5 py-1 backdrop-blur-xl sm:gap-1 sm:px-2">
      {isImage && !isCoarsePointer && (
        <>
          <ChromeButton
            onClick={onZoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out"
          >
            <ZoomOutIcon className="h-4 w-4" />
          </ChromeButton>
          <span className="hidden w-11 text-center font-mono text-[10px] tabular-nums tracking-[0.1em] text-white/45 md:block">
            {Math.round(zoom * 100)}%
          </span>
          <ChromeButton
            onClick={onZoomIn}
            disabled={zoom >= 5}
            aria-label="Zoom in"
          >
            <ZoomInIcon className="h-4 w-4" />
          </ChromeButton>
          <ChromeButton onClick={onRotate} aria-label="Rotate">
            <RotateCwIcon className="h-4 w-4" />
          </ChromeButton>
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
        </>
      )}

      {hasSiblings && (
        <ChromeButton
          onClick={onToggleSlideshow}
          aria-label={isSlideshow ? "Pause slideshow" : "Play slideshow"}
          className={isSlideshow ? active : undefined}
        >
          {isSlideshow ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </ChromeButton>
      )}

      <ChromeButton
        onClick={onToggleInfo}
        aria-label="Toggle details"
        aria-pressed={showInfo}
        className={showInfo ? active : undefined}
      >
        <InfoIcon className="h-4 w-4" />
      </ChromeButton>

      <ChromeButton onClick={onShare} aria-label="Share">
        <Share2Icon className="h-4 w-4" />
      </ChromeButton>

      <ChromeButton onClick={onDownload} aria-label="Download">
        <DownloadIcon className="h-4 w-4" />
      </ChromeButton>

      {!isCoarsePointer && (
        <ChromeButton onClick={onFullscreen} aria-label="Toggle fullscreen">
          <MaximizeIcon className="h-4 w-4" />
        </ChromeButton>
      )}
    </div>
  );
}
