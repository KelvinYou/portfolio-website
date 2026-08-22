"use client";

import { GalleryItem } from "@/types/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";

interface LightboxInfoProps {
  item: GalleryItem;
  open: boolean;
  onClose: () => void;
}

const FIELD_LABELS: Record<string, string> = {
  dateCreated: "Date",
  location: "Location",
  camera: "Camera",
  dimensions: "Dimensions",
  fileSize: "File size",
};

const FIELD_ORDER = [
  "dateCreated",
  "location",
  "camera",
  "dimensions",
  "fileSize",
] as const;

/**
 * Details. A bottom sheet where the screen is narrow (thumb-reachable), a side
 * drawer where there is width to spare.
 */
export function LightboxInfo({ item, open, onClose }: LightboxInfoProps) {
  const rows = FIELD_ORDER.map(
    (key) => [key, item.metadata?.[key]] as const,
  ).filter((entry): entry is readonly [(typeof FIELD_ORDER)[number], string] =>
    Boolean(entry[1]),
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={[
            "absolute inset-x-0 bottom-0 z-[60] max-h-[70dvh] overflow-y-auto",
            "rounded-t-2xl border-t border-white/10 bg-black/70 backdrop-blur-2xl",
            "px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5",
            "sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[min(22rem,80vw)] sm:max-h-none",
            "sm:rounded-none sm:border-l sm:border-t-0 sm:px-7 sm:pt-20",
          ].join(" ")}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Details
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="-mr-2 -mt-2 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          {item.title && (
            <h3 className="font-heading text-xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-2xl">
              {item.title}
            </h3>
          )}

          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {item.description}
            </p>
          )}

          {rows.length > 0 && (
            <dl className="mt-6 border-t border-white/10">
              {rows.map(([key, value]) => (
                <div
                  key={key}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/10 py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {FIELD_LABELS[key]}
                  </dt>
                  <dd className="min-w-0 text-sm text-white/75 sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
