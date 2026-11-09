"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, Grid2X2, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ArticleCarouselProps } from "@/types";

export function ArticleCarousel({ items, title }: ArticleCarouselProps) {
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const slides = useRef<HTMLDivElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const lightbox = useRef<PhotoSwipeLightbox | null>(null);
  const heading = title || `Article in ${items.length} images`;
  const current = items[index];

  useEffect(() => {
    const viewer = new PhotoSwipeLightbox({
      dataSource: items.map((item) => ({
        src: item.src,
        width: item.width || 1122,
        height: item.height || 1402,
        alt:
          item.alt || item.description || item.title || "Article illustration",
      })),
      pswpModule: () => import("photoswipe"),
      mainClass: "article-image-viewer",
      bgOpacity: 1,
      initialZoomLevel: "fit",
      secondaryZoomLevel: 1,
      maxZoomLevel: 3,
      loop: false,
      trapFocus: true,
      returnFocus: true,
      showHideAnimationType: "none",
      zoomAnimationDuration: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
        ? 0
        : 200,
      padding: { top: 64, bottom: 72, left: 16, right: 16 },
      imageClickAction: "zoom",
      doubleTapAction: "zoom",
    });
    viewer.on("change", () => {
      const next = viewer.pswp?.currIndex ?? 0;
      setIndex(next);
      slides.current?.scrollTo({ left: next * slides.current.clientWidth });
    });
    viewer.init();
    lightbox.current = viewer;
    return () => {
      viewer.destroy();
      lightbox.current = null;
    };
  }, [items]);

  useEffect(() => {
    const strip = thumbnails.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (strip && thumb) {
      strip.scrollTo({
        left:
          thumb.offsetLeft -
          strip.offsetLeft -
          (strip.clientWidth - thumb.clientWidth) / 2,
      });
    }
  }, [index]);

  if (!current) return null;
  const navigate = (next: number) => {
    const page = Math.max(0, Math.min(items.length - 1, next));
    setIndex(page);
    slides.current?.scrollTo({ left: page * slides.current.clientWidth });
  };

  return (
    <div
      className="not-prose my-10 first:mt-0"
      role="region"
      aria-label={heading}
      aria-roledescription="carousel"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium">{heading}</p>
        <Dialog.Root open={overview} onOpenChange={setOverview}>
          <Dialog.Trigger asChild>
            <Button variant="ghost" className="min-h-11 text-muted-foreground">
              <Grid2X2 />
              View all {items.length}
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90svh] w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border bg-background shadow-lg">
              <div className="flex items-center justify-between gap-3 border-b px-5 py-3">
                <div>
                  <Dialog.Title className="font-medium">{heading}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                    Choose an image to read.
                  </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-11"
                    aria-label="Close image overview"
                  >
                    <X />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="grid min-h-0 auto-rows-max grid-cols-2 gap-x-4 gap-y-6 overflow-y-auto p-5 sm:grid-cols-4">
                {items.map((item, page) => (
                  <button
                    key={item.id}
                    type="button"
                    className="group self-start text-left"
                    onClick={() => {
                      navigate(page);
                      setOverview(false);
                    }}
                    aria-label={`Read image ${page + 1}: ${item.title}`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={224}
                      height={280}
                      sizes="(min-width:640px) 12rem, 40vw"
                      className={cn(
                        "aspect-[4/5] w-full rounded-sm object-contain ring-offset-background group-hover:ring-2 group-hover:ring-ring group-hover:ring-offset-2",
                        page === index &&
                          "ring-2 ring-foreground ring-offset-2",
                      )}
                    />
                    <span className="mt-3 block text-xs tabular-nums text-muted-foreground">
                      {page + 1} / {items.length}
                    </span>
                    <span className="mt-1 block text-sm leading-snug">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div
        ref={slides}
        tabIndex={0}
        aria-label="Article images. Use left and right arrow keys to navigate."
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const el = event.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            return;
          event.preventDefault();
          navigate(
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : index + (event.key === "ArrowRight" ? 1 : -1),
          );
        }}
      >
        {items.map((item, page) => (
          <a
            key={item.id}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={page === index ? 0 : -1}
            className="block w-full shrink-0 snap-center bg-muted/20 cursor-zoom-in"
            aria-label={`Enlarge image ${page + 1}: ${item.title}`}
            onClick={(event) => {
              if (lightbox.current) {
                event.preventDefault();
                lightbox.current.loadAndOpen(page);
              }
            }}
          >
            <Image
              src={item.src}
              alt={
                item.alt ||
                item.description ||
                item.title ||
                "Article illustration"
              }
              width={item.width || 1122}
              height={item.height || 1402}
              sizes="(min-width:768px) 34rem, 100vw"
              className="mx-auto h-[min(65svh,40rem)] w-full object-contain"
            />
          </a>
        ))}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="pt-2">
          <p
            className="text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="mr-2 tabular-nums text-muted-foreground">
              {index + 1} / {items.length}
            </span>
            {current.title}
          </p>
          <Button
            variant="ghost"
            className="-ml-3 mt-1 min-h-11 text-xs text-muted-foreground"
            onClick={() => lightbox.current?.loadAndOpen(index)}
          >
            <Expand />
            Enlarge image
          </Button>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            disabled={index === 0}
            aria-label="Previous image"
            onClick={() => navigate(index - 1)}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            disabled={index === items.length - 1}
            aria-label="Next image"
            onClick={() => navigate(index + 1)}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div
        ref={thumbnails}
        className="relative mt-3 flex gap-3 overflow-x-auto overscroll-x-contain p-1 pb-3"
        role="group"
        aria-label="Choose an article image"
      >
        {items.map((item, page) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(page)}
            aria-current={page === index ? "true" : undefined}
            aria-label={`Image ${page + 1}: ${item.title}`}
            className={cn(
              "w-16 shrink-0 self-start rounded-sm text-left opacity-60 transition-opacity hover:opacity-100",
              page === index && "opacity-100",
            )}
          >
            <Image
              src={item.src}
              alt=""
              width={64}
              height={80}
              sizes="64px"
              className={cn(
                "aspect-[4/5] w-full rounded-sm object-contain ring-offset-background",
                page === index && "ring-2 ring-foreground ring-offset-2",
              )}
            />
            <span className="mt-2 line-clamp-2 text-[11px] leading-snug">
              <span className="tabular-nums">{page + 1}.</span> {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
