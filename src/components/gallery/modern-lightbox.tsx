"use client";

import { cn } from "@/lib/utils";
import { LightboxProps } from "@/types/gallery";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  PlayIcon,
  PauseIcon,
  InfoIcon,
  ShareIcon,
  RotateCwIcon,
  ImageIcon,
  CalendarIcon,
  CameraIcon,
  MapPinIcon,
  HardDriveIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { MobileSwipeIndicator } from "./mobile-swipe-indicator";

export function ModernLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>(null);

  const currentItem = items[currentIndex];

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(
      () => {
        setShowControls(false);
      },
      isMobile ? 4000 : 3000,
    ); // Longer timeout on mobile
  }, [isMobile]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setZoom(1);
      setRotation(0);
      setDragPosition({ x: 0, y: 0 });
      resetControlsTimeout();

      // Show swipe indicator on mobile for first-time users
      if (isMobile && isTouch && items.length > 1) {
        const hasSeenIndicator = localStorage.getItem("gallery-swipe-seen");
        if (!hasSeenIndicator) {
          setTimeout(() => setShowSwipeIndicator(true), 1000);
          localStorage.setItem("gallery-swipe-seen", "true");
        }
      }
    }
  }, [
    isOpen,
    currentIndex,
    resetControlsTimeout,
    isMobile,
    isTouch,
    items.length,
  ]);

  // Mouse movement for auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      resetControlsTimeout();
    };

    if (isOpen) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isOpen, resetControlsTimeout]);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Slideshow functionality
  useEffect(() => {
    if (isSlideshow && items.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      setSlideshowInterval(interval);
      return () => clearInterval(interval);
    } else if (slideshowInterval) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
  }, [isSlideshow, items.length, handleNext, slideshowInterval]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setDragPosition({ x: 0, y: 0 });
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleSlideshow = useCallback(() => {
    setIsSlideshow(!isSlideshow);
  }, [isSlideshow]);

  const handleDownload = () => {
    if (currentItem) {
      const link = document.createElement("a");
      link.href = currentItem.src;
      link.download = currentItem.title || `gallery-item-${currentIndex + 1}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && currentItem) {
      try {
        await navigator.share({
          title: currentItem.title || "Gallery Image",
          text: currentItem.description || "",
          url: currentItem.src,
        });
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(currentItem.src);
      }
    } else if (currentItem) {
      navigator.clipboard.writeText(currentItem.src);
    }
  };

  // Drag functionality for zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setDragPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // Handle zoom drag on touch
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - dragPosition.x,
        y: touch.clientY - dragPosition.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });

    // Handle zoom drag on touch
    if (isDragging && zoom > 1) {
      setDragPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) {
      const deltaX = touchStart.x - touchEnd.x;
      const deltaY = Math.abs(touchStart.y - touchEnd.y);
      const minSwipeDistance = 50;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > deltaY) {
        if (deltaX > 0) {
          handleNext(); // Swipe left = next
        } else {
          handlePrevious(); // Swipe right = previous
        }
      } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        // Tap to toggle controls
        resetControlsTimeout();
      }
    }
    setIsDragging(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "=":
        case "+":
          e.preventDefault();
          handleZoomIn();
          break;
        case "-":
          e.preventDefault();
          handleZoomOut();
          break;
        case "0":
          e.preventDefault();
          resetZoom();
          break;
        case "r":
          e.preventDefault();
          handleRotate();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "i":
          e.preventDefault();
          setShowInfo(!showInfo);
          break;
        case " ":
          e.preventDefault();
          toggleSlideshow();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    currentIndex,
    items.length,
    showInfo,
    isSlideshow,
    handleNext,
    handlePrevious,
    onClose,
    toggleSlideshow,
  ]);

  const renderMedia = () => {
    if (!currentItem) return null;

    if (currentItem.type === "video") {
      return (
        <video
          key={currentItem.id}
          className="max-w-full max-h-full w-auto h-auto transition-all duration-500"
          controls
          autoPlay
          onLoadedData={() => setIsLoading(false)}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          <source src={currentItem.src} type="video/mp4" />
          <source src={currentItem.src} type="video/webm" />
          <source src={currentItem.src} type="video/ogg" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <Image
        ref={imageRef}
        key={currentItem.id}
        src={currentItem.src}
        alt={
          currentItem.alt ||
          currentItem.title ||
          `Gallery item ${currentIndex + 1}`
        }
        width={currentItem.width || 1200}
        height={currentItem.height || 800}
        className={cn(
          "max-w-full max-h-full w-auto h-auto transition-all duration-500 select-none",
          isLoading ? "blur-sm" : "blur-0",
          zoom > 1 ? "cursor-grab" : "cursor-default",
          isDragging ? "cursor-grabbing" : "",
        )}
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg) translate(${dragPosition.x / zoom}px, ${dragPosition.y / zoom}px)`,
        }}
        onLoad={() => setIsLoading(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        priority
      />
    );
  };

  const renderProgressBar = () => {
    if (items.length <= 1) return null;

    const progress = ((currentIndex + 1) / items.length) * 100;

    return (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const renderThumbnails = () => {
    if (items.length <= 1) return null;

    return (
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg overflow-x-auto",
          isMobile
            ? "bottom-16 max-w-[90vw] scrollbar-hide"
            : "bottom-4 max-w-[80vw]",
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(index)}
            className={cn(
              "flex-shrink-0 rounded overflow-hidden border-2 transition-all",
              isMobile ? "w-10 h-10" : "w-12 h-12",
              index === currentIndex
                ? "border-white"
                : "border-transparent hover:border-white/50",
            )}
          >
            <Image
              src={item.thumbnail || item.src}
              alt={item.alt || `Thumbnail ${index + 1}`}
              width={isMobile ? 40 : 48}
              height={isMobile ? 40 : 48}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    );
  };

  const renderInfoPanel = () => {
    if (!showInfo || !currentItem) return null;

    return (
      <div
        className={cn(
          "absolute bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg space-y-3 overflow-y-auto",
          isMobile
            ? "bottom-4 left-4 right-4 max-h-[40vh]"
            : "top-16 right-4 w-80 max-h-[70vh]",
        )}
      >
        <div className="flex items-center gap-2 text-lg font-semibold">
          <InfoIcon className="w-5 h-5" />
          Details
        </div>

        {currentItem.title && (
          <div>
            <h3 className="font-medium text-base mb-1">{currentItem.title}</h3>
          </div>
        )}

        {currentItem.description && (
          <p className="text-sm text-gray-300 leading-relaxed">
            {currentItem.description}
          </p>
        )}

        {currentItem.metadata && (
          <div className="space-y-2 pt-2 border-t border-white/20">
            {currentItem.metadata.dimensions && (
              <div className="flex items-center gap-2 text-sm">
                <ImageIcon className="w-4 h-4" />
                <span>{currentItem.metadata.dimensions}</span>
              </div>
            )}

            {currentItem.metadata.fileSize && (
              <div className="flex items-center gap-2 text-sm">
                <HardDriveIcon className="w-4 h-4" />
                <span>{currentItem.metadata.fileSize}</span>
              </div>
            )}

            {currentItem.metadata.dateCreated && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-4 h-4" />
                <span>{currentItem.metadata.dateCreated}</span>
              </div>
            )}

            {currentItem.metadata.camera && (
              <div className="flex items-center gap-2 text-sm">
                <CameraIcon className="w-4 h-4" />
                <span>{currentItem.metadata.camera}</span>
              </div>
            )}

            {currentItem.metadata.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPinIcon className="w-4 h-4" />
                <span>{currentItem.metadata.location}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen || !currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/95 backdrop-blur-sm" />
        <DialogContent
          ref={containerRef}
          className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-transparent border-0 shadow-none"
        >
          <VisuallyHidden>
            <DialogTitle>
              {currentItem?.title ||
                currentItem?.alt ||
                `Gallery item ${currentIndex + 1}`}
            </DialogTitle>
          </VisuallyHidden>

          {/* Top Controls */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent transition-opacity duration-300",
              isMobile ? "p-2" : "p-4",
              showControls ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className={cn("flex items-center", isMobile ? "gap-1" : "gap-2")}
            >
              {/* Counter */}
              {items.length > 1 && (
                <div
                  className={cn(
                    "bg-black/50 text-white rounded-full font-medium",
                    isMobile ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm",
                  )}
                >
                  {currentIndex + 1} / {items.length}
                </div>
              )}

              {/* Slideshow toggle */}
              {items.length > 1 && (
                <button
                  onClick={toggleSlideshow}
                  className={cn(
                    "rounded-full transition-colors",
                    isMobile ? "p-1.5" : "p-2",
                    isSlideshow
                      ? "bg-white/20 text-white"
                      : "bg-black/50 text-white hover:bg-black/70",
                  )}
                  aria-label={
                    isSlideshow ? "Stop slideshow" : "Start slideshow"
                  }
                >
                  {isSlideshow ? (
                    <PauseIcon className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
                  ) : (
                    <PlayIcon className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
                  )}
                </button>
              )}
            </div>

            <div
              className={cn("flex items-center", isMobile ? "gap-1" : "gap-2")}
            >
              {/* Zoom controls - hide on mobile to save space */}
              {currentItem.type === "image" && !isMobile && (
                <>
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Zoom out"
                    disabled={zoom <= 0.5}
                  >
                    <ZoomOutIcon className="w-5 h-5" />
                  </button>
                  <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Zoom in"
                    disabled={zoom >= 5}
                  >
                    <ZoomInIcon className="w-5 h-5" />
                  </button>

                  {/* Rotate */}
                  <button
                    onClick={handleRotate}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Rotate image"
                  >
                    <RotateCwIcon className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Info toggle */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={cn(
                  "rounded-full transition-colors",
                  isMobile ? "p-1.5" : "p-2",
                  showInfo
                    ? "bg-white/20 text-white"
                    : "bg-black/50 text-white hover:bg-black/70",
                )}
                aria-label="Toggle info"
              >
                <InfoIcon className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              </button>

              {/* Share - hide on mobile to save space */}
              {!isMobile && (
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Share"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
              )}

              {/* Download */}
              <button
                onClick={handleDownload}
                className={cn(
                  "rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
                  isMobile ? "p-1.5" : "p-2",
                )}
                aria-label="Download"
              >
                <DownloadIcon className={isMobile ? "w-4 h-4" : "w-5 h-5"} />
              </button>

              {/* Fullscreen - hide on mobile as it's less useful */}
              {!isMobile && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Toggle fullscreen"
                >
                  <MaximizeIcon className="w-5 h-5" />
                </button>
              )}

              {/* Close */}
              <button
                onClick={onClose}
                className={cn(
                  "rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
                  isMobile ? "p-1.5" : "p-2",
                )}
                aria-label="Close"
              >
                <XIcon className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
            </div>
          </div>

          {/* Navigation buttons - smaller on mobile */}
          {items.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300",
                  isMobile ? "left-2 p-2" : "left-4 p-3",
                  showControls ? "opacity-100" : "opacity-0",
                )}
                aria-label="Previous"
              >
                <ChevronLeftIcon className={isMobile ? "w-5 h-5" : "w-6 h-6"} />
              </button>
              <button
                onClick={handleNext}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300",
                  isMobile ? "right-2 p-2" : "right-4 p-3",
                  showControls ? "opacity-100" : "opacity-0",
                )}
                aria-label="Next"
              >
                <ChevronRightIcon
                  className={isMobile ? "w-5 h-5" : "w-6 h-6"}
                />
              </button>
            </>
          )}

          {/* Media container */}
          <div className="flex items-center justify-center w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-40">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {renderMedia()}
          </div>

          {/* Info panel */}
          {renderInfoPanel()}

          {/* Thumbnails */}
          <div
            className={cn(
              "transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0",
            )}
          >
            {renderThumbnails()}
          </div>

          {/* Mobile swipe indicator */}
          {isMobile && (
            <MobileSwipeIndicator
              show={showSwipeIndicator}
              onHide={() => setShowSwipeIndicator(false)}
            />
          )}

          {/* Progress bar */}
          {renderProgressBar()}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
