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

/**
 * The grid is intrinsically fluid: `auto-fit` + `minmax` means the column count
 * falls out of the space actually available, so there are no breakpoint cliffs
 * and it behaves the same at 320px, inside a narrow prose column, or full-bleed
 * on an ultrawide. The `columns` prop just tunes the ideal tile width, which
 * caps how many columns can fit at typical reading widths.
 */
const TILE_BASIS = {
  1: "100%",
  2: "22rem",
  3: "16rem",
  4: "13rem",
} as const;

const GAP = {
  sm: "0.5rem",
  md: "clamp(0.625rem, 1.4vw, 1rem)",
  lg: "clamp(0.875rem, 2.2vw, 1.75rem)",
} as const;

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
  return (
    <div
      className={cn("@container/gallery grid w-full items-start")}
      style={{
        gap: GAP[gap],
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${TILE_BASIS[columns]}), 1fr))`,
      }}
    >
      {items.map((item, index) => (
        <GalleryItemComponent
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          isLead={index === 0 && items.length > 2 && columns > 1}
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
