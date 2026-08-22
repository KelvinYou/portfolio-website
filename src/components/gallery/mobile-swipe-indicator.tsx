"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveHorizontalIcon } from "lucide-react";

interface MobileSwipeIndicatorProps {
  show: boolean;
  onHide: () => void;
}

/**
 * One-time hint. A single hairline capsule that breathes and leaves — replaces
 * the row of pulsing bars, which read as a loading state rather than a hint.
 */
export function MobileSwipeIndicator({
  show,
  onHide,
}: MobileSwipeIndicatorProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onHide, 2800);
    return () => clearTimeout(timer);
  }, [show, onHide]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute bottom-4 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-xl">
            <MoveHorizontalIcon className="h-3.5 w-3.5 text-[#00F0FF]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              Swipe
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
