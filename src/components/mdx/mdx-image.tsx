"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface MdxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export function MdxImage({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: MdxImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Convert width and height to numbers
  const safeWidth =
    typeof width === "string" ? parseInt(width, 10) : width || 800;
  const safeHeight =
    typeof height === "string" ? parseInt(height, 10) : height || 450;

  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg">
        <div className={cn("transition-all", isLoading ? "blur-sm" : "blur-0")}>
          <Image
            src={(src as string) || ""}
            alt={alt}
            width={safeWidth}
            height={safeHeight}
            className={cn(
              "w-full h-auto transition-transform hover:scale-105",
              className,
            )}
            onLoadingComplete={() => setIsLoading(false)}
            {...props}
          />
        </div>
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
