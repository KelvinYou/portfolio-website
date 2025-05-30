"use client";

import { motion } from "framer-motion";

interface PlaceholderImageProps {
  name: string;
  className?: string;
}

export default function PlaceholderImage({
  name,
  className,
}: PlaceholderImageProps) {
  // Generate a consistent color based on the name
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const bgColor = stringToColor(name);

  return (
    <motion.div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div
        className="flex h-3/5 w-4/5 flex-col rounded-lg border border-border/40 bg-background/70 p-4 shadow-lg backdrop-blur-sm"
        style={{ borderTopColor: bgColor, borderTopWidth: "4px" }}
      >
        <div className="mb-3 flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="mb-2 h-2 w-1/3 rounded bg-muted"></div>

          {/* Main content */}
          <div className="flex h-full gap-2">
            <div className="w-1/4">
              <div className="mb-2 h-4 w-4/5 rounded bg-muted"></div>
              <div className="mb-1.5 h-3 w-full rounded bg-muted/60"></div>
              <div className="mb-1.5 h-3 w-full rounded bg-muted/60"></div>
              <div className="h-3 w-3/4 rounded bg-muted/60"></div>
            </div>
            <div className="flex-1">
              <div className="mb-2 h-4 w-1/3 rounded bg-muted"></div>
              <div
                className="h-16 w-full rounded"
                style={{ backgroundColor: `${bgColor}33` }}
              ></div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="h-8 w-full rounded bg-muted/40"></div>
                <div className="h-8 w-full rounded bg-muted/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
