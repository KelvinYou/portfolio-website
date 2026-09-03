"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";
import { ModernLightbox } from "./modern-lightbox";

/**
 * A photo trigger for one ledger entry (a role, a credential). Deliberately
 * not a grid — the ledger's whole argument is hairline rules over cards, and
 * a bank of thumbnails per entry would be the cards argument again, just
 * smaller. So this is one line, matching `WroteAbout`, and the photos only
 * exist behind a click.
 */
export const EntryPhotos = React.memo(function EntryPhotos({
  photos,
}: {
  photos?: GalleryItem[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="group/photos -my-3 mt-6 inline-flex items-center gap-1.5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <Camera className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="underline decoration-border underline-offset-4 transition-colors group-hover/photos:decoration-primary-ink">
          Photos
        </span>
        <span className="tabular-nums">{photos.length}</span>
      </button>

      <ModernLightbox
        isOpen={open}
        onClose={() => setOpen(false)}
        items={photos}
        currentIndex={index}
        onNavigate={setIndex}
      />
    </>
  );
});
