"use client";

import { cn } from "@/lib/utils";
import { GalleryProps } from "@/types/gallery";
import { useState } from "react";
import { GalleryGrid } from "./gallery-grid";
import { ModernLightbox } from "./modern-lightbox";

export function Gallery({
  items,
  columns = 3,
  gap = "md",
  showTitles = false,
  showDescriptions = false,
  enableLightbox = true,
  className,
  itemClassName,
}: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = (index: number) => {
    if (enableLightbox) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleLightboxNavigate = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  if (!items || items.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-foreground/15 px-6 py-14 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          No plates in this collection
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <GalleryGrid
        items={items}
        columns={columns}
        gap={gap}
        showTitles={showTitles}
        showDescriptions={showDescriptions}
        enableLightbox={enableLightbox}
        itemClassName={itemClassName}
        onItemClick={handleItemClick}
      />

      {enableLightbox && (
        <ModernLightbox
          isOpen={lightboxOpen}
          onClose={handleLightboxClose}
          items={items}
          currentIndex={currentIndex}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </div>
  );
}

export type { GalleryProps, GalleryItem } from "@/types/gallery";
