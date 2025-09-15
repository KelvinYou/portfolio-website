"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MobileSwipeIndicatorProps {
  show: boolean;
  onHide: () => void;
}

export function MobileSwipeIndicator({
  show,
  onHide,
}: MobileSwipeIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "absolute bottom-20 left-1/2 -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-1 h-4 bg-white/60 rounded animate-pulse" />
          <div
            className="w-1 h-4 bg-white/60 rounded animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-1 h-4 bg-white/60 rounded animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
        <span>Swipe to navigate</span>
        <div className="flex gap-1">
          <div
            className="w-1 h-4 bg-white/60 rounded animate-pulse"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="w-1 h-4 bg-white/60 rounded animate-pulse"
            style={{ animationDelay: "0.8s" }}
          />
          <div
            className="w-1 h-4 bg-white/60 rounded animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
}
