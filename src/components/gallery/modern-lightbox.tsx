"use client";

import { cn } from "@/lib/utils";
import { LightboxProps } from "@/types/gallery";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { LightboxFilmstrip } from "./lightbox-filmstrip";
import { LightboxInfo } from "./lightbox-info";
import { LightboxTopRail, LightboxTools } from "./lightbox-chrome";
import { LightboxStage } from "./lightbox-stage";
import { useLightboxView } from "./use-lightbox-view";

export function ModernLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [direction, setDirection] = useState(1);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const currentItem = items[currentIndex];
  const hasSiblings = items.length > 1;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setIsLoading(true);
      onNavigate(index);
    },
    [onNavigate],
  );

  const handlePrevious = useCallback(() => {
    goTo(currentIndex > 0 ? currentIndex - 1 : items.length - 1, -1);
  }, [currentIndex, items.length, goTo]);

  const handleNext = useCallback(() => {
    goTo(currentIndex < items.length - 1 ? currentIndex + 1 : 0, 1);
  }, [currentIndex, items.length, goTo]);

  const view = useLightboxView({
    isOpen,
    currentIndex,
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  // Chrome only auto-hides where there is a cursor to move. On touch there is
  // no mousemove to bring it back, so it stays put.
  const chromeVisible = view.isCoarsePointer || view.showChrome;

  useEffect(() => {
    if (!isSlideshow || !hasSiblings) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isSlideshow, hasSiblings, handleNext]);

  useEffect(() => {
    if (!isOpen || !view.isCoarsePointer || !hasSiblings) return;
    if (localStorage.getItem("gallery-swipe-seen")) return;
    const timer = setTimeout(() => setShowSwipeHint(true), 900);
    localStorage.setItem("gallery-swipe-seen", "true");
    return () => clearTimeout(timer);
  }, [isOpen, view.isCoarsePointer, hasSiblings]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  }, []);

  const handleDownload = useCallback(() => {
    if (!currentItem) return;
    const link = document.createElement("a");
    link.href = currentItem.src;
    link.download = currentItem.title || `photo-${currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentItem, currentIndex]);

  const handleShare = useCallback(async () => {
    if (!currentItem) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentItem.title || "Gallery",
          text: currentItem.description || "",
          url: currentItem.src,
        });
        return;
      } catch {
        // user dismissed, or the target rejected — fall through to clipboard
      }
    }
    navigator.clipboard.writeText(currentItem.src);
  }, [currentItem]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const actions: Record<string, () => void> = {
        Escape: onClose,
        ArrowLeft: handlePrevious,
        ArrowRight: handleNext,
        "=": view.zoomIn,
        "+": view.zoomIn,
        "-": view.zoomOut,
        "0": view.resetZoom,
        r: view.rotate,
        f: toggleFullscreen,
        i: () => setShowInfo((v) => !v),
        " ": () => setIsSlideshow((v) => !v),
      };
      const action = actions[e.key];
      if (!action) return;
      if (e.key !== "Escape") e.preventDefault();
      action();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext, toggleFullscreen, view]);

  if (!isOpen || !currentItem) return null;

  const isImage = currentItem.type === "image";
  const transform = `translate(${view.pan.x}px, ${view.pan.y}px) scale(${view.zoom}) rotate(${view.rotation}deg)`;
  const slide = reduceMotion ? 0 : direction * 32;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#060608]/95 backdrop-blur-xl" />
        {/* The Radix primitive is used directly rather than the shared
            DialogContent wrapper: that wrapper ships its own overlay (a second
            backdrop blur), its own close button, and an `sm:max-w-lg` clamp —
            all wrong for a full-bleed viewer. */}
        <DialogPrimitive.Content
          ref={containerRef}
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "fixed inset-0 z-50 grid h-[100dvh] w-screen overflow-hidden outline-none",
            "grid-rows-[auto_minmax(0,1fr)_auto]",
          )}
        >
          <VisuallyHidden>
            <DialogPrimitive.Title>
              {currentItem.title || currentItem.alt || "Gallery viewer"}
            </DialogPrimitive.Title>
          </VisuallyHidden>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_40%,transparent_30%,rgba(0,0,0,0.8)_100%)]"
          />
          <div
            aria-hidden
            className="gallery-grain pointer-events-none absolute inset-0"
          />

          <LightboxTopRail
            currentIndex={currentIndex}
            total={items.length}
            title={currentItem.title}
            visible={chromeVisible}
            onClose={onClose}
          />

          <LightboxStage
            item={currentItem}
            slideOffset={slide}
            transform={transform}
            isLoading={isLoading}
            zoom={view.zoom}
            isDragging={view.isDragging}
            chromeVisible={chromeVisible}
            hasSiblings={hasSiblings}
            showSwipeHint={showSwipeHint}
            onSwipeHintHide={() => setShowSwipeHint(false)}
            onLoaded={() => setIsLoading(false)}
            onToggleZoom={view.toggleZoom}
            onPrevious={handlePrevious}
            onNext={handleNext}
            handlers={view.stageHandlers}
          />

          {/* Footer. Wraps to two rows before it ever overflows a 320px width. */}
          <footer
            className={cn(
              "z-50 flex flex-col gap-3 px-[max(0.75rem,env(safe-area-inset-left))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:gap-4 sm:px-6 sm:pb-5",
              "transition-opacity duration-500",
              chromeVisible ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="flex justify-center">
              <LightboxFilmstrip
                items={items}
                currentIndex={currentIndex}
                onNavigate={(index) =>
                  goTo(index, index > currentIndex ? 1 : -1)
                }
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-white/10 pt-3">
              <div className="min-w-0 flex-1 basis-48">
                {currentItem.title && (
                  <p className="truncate font-heading text-[13px] font-semibold tracking-[-0.01em] text-white sm:text-sm">
                    {currentItem.title}
                  </p>
                )}
                {currentItem.description && (
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/45 sm:text-xs">
                    {currentItem.description}
                  </p>
                )}
              </div>

              <LightboxTools
                isImage={isImage}
                isCoarsePointer={view.isCoarsePointer}
                hasSiblings={hasSiblings}
                zoom={view.zoom}
                showInfo={showInfo}
                isSlideshow={isSlideshow}
                onZoomIn={view.zoomIn}
                onZoomOut={view.zoomOut}
                onRotate={view.rotate}
                onToggleInfo={() => setShowInfo((v) => !v)}
                onToggleSlideshow={() => setIsSlideshow((v) => !v)}
                onFullscreen={toggleFullscreen}
                onShare={handleShare}
                onDownload={handleDownload}
              />
            </div>
          </footer>

          <LightboxInfo
            item={currentItem}
            open={showInfo}
            onClose={() => setShowInfo(false)}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
