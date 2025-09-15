"use client";

import { cn } from "@/lib/utils";
import { GalleryItem } from "@/types/gallery";
import { GalleryItemComponent } from "./gallery-item";

interface GalleryGridProps {
  items: GalleryItem[];
  columns: 1 | 2 | 3 | 4;
  gap: "sm" | "md" | "lg";
  showTitles: boolean;
  showDescriptions: boolean;
  enableLightbox: boolean;
  itemClassName?: string;
  onItemClick: (index: number) => void;
}

export function GalleryGrid({
  items,
  columns,
  gap,
  showTitles,
  showDescriptions,
  enableLightbox,
  itemClassName,
  onItemClick,
}: GalleryGridProps) {
  const getGridClasses = () => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    const gapClasses = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    };

    return cn("grid", columnClasses[columns], gapClasses[gap]);
  };

  return (
    <div className={getGridClasses()}>
      {items.map((item, index) => (
        <GalleryItemComponent
          key={item.id}
          item={item}
          index={index}
          showTitle={showTitles}
          showDescription={showDescriptions}
          enableLightbox={enableLightbox}
          className={itemClassName}
          onClick={() => onItemClick(index)}
        />
      ))}
    </div>
  );
}
