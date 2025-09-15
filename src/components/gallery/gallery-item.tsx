"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import Image from "next/image";
import { useState } from "react";
import { PlayCircleIcon, ZoomInIcon } from "lucide-react";

interface GalleryItemProps {
  item: GalleryItem;
  index: number;
  showTitle: boolean;
  showDescription: boolean;
  enableLightbox: boolean;
  className?: string;
  onClick: () => void;
}

export function GalleryItemComponent({
  item,
  index,
  showTitle,
  showDescription,
  enableLightbox,
  className,
  onClick,
}: GalleryItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    if (enableLightbox) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (enableLightbox && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const renderMedia = () => {
    if (item.type === "video") {
      return (
        <div className="relative w-full h-full">
          <video
            className="w-full h-full object-cover"
            poster={item.thumbnail}
            preload="metadata"
            onLoadedData={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          >
            <source src={item.src} type="video/mp4" />
            <source src={item.src} type="video/webm" />
            <source src={item.src} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          {enableLightbox && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
              <PlayCircleIcon className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <Image
          src={item.src}
          alt={item.alt || item.title || `Gallery item ${index + 1}`}
          width={item.width || 800}
          height={item.height || 600}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isLoading ? "blur-sm" : "blur-0",
            enableLightbox ? "hover:scale-105" : "",
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
        {enableLightbox && !isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <ZoomInIcon className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        )}
      </div>
    );
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "aspect-video bg-muted rounded-lg flex items-center justify-center",
          className,
        )}
      >
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">⚠️</div>
          <p className="text-sm">Failed to load media</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group", className)}>
      <div
        className={cn(
          "relative aspect-video bg-muted rounded-lg overflow-hidden transition-all duration-300",
          enableLightbox
            ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
            : "",
          isLoading ? "animate-pulse" : "",
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={enableLightbox ? 0 : -1}
        role={enableLightbox ? "button" : undefined}
        aria-label={
          enableLightbox
            ? `View ${item.title || item.alt || "media"} in lightbox`
            : undefined
        }
      >
        {renderMedia()}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {(showTitle || showDescription) && (item.title || item.description) && (
        <div className="mt-3 space-y-1">
          {showTitle && item.title && (
            <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
          )}
          {showDescription && item.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
