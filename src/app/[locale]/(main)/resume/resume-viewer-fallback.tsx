"use client";

import { Button } from "@/components/ui/button";
import { Download, Maximize2, Minimize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ResumeFullscreenDialog } from "./resume-fullscreen-dialog";

interface ResumeViewerProps {
  pdfUrl: string;
}

export function ResumeViewerWithFallback({ pdfUrl }: ResumeViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentElementFullscreen =
        document.fullscreenElement === fullscreenRef.current;

      setIsNativeFullscreen(isCurrentElementFullscreen);

      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const enterFullscreen = useCallback(async () => {
    const element = fullscreenRef.current;
    if (!element) return;

    setIsFullscreen(true);

    if (!element.requestFullscreen) return;

    try {
      await element.requestFullscreen();
      setIsNativeFullscreen(true);
    } catch {
      setIsNativeFullscreen(false);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement === fullscreenRef.current) {
      try {
        await document.exitFullscreen();
      } catch {
        // The browser may already have exited fullscreen.
      }
    }

    setIsFullscreen(false);
    setIsNativeFullscreen(false);
  }, []);

  const iframeSrc = `${pdfUrl}#toolbar=0&view=FitH`;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="section-heading !mb-0">Resume</h1>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={enterFullscreen}
            size="lg"
            variant="outline"
            className="gap-2"
            aria-label="View resume in fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
            Fullscreen
          </Button>

          <Button asChild size="lg" className="gap-2">
            <a
              href={pdfUrl}
              download="KelvinYou-Resume.pdf"
              aria-label="Download resume as PDF"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>

      <div
        ref={fullscreenRef}
        className={`relative mb-8 rounded-xl p-4 transition-all duration-300 sm:p-6 ${
          isNativeFullscreen
            ? "fixed inset-0 z-50 m-0 rounded-none border-none bg-black"
            : "glass-card h-[70vh] min-h-[520px]"
        }`}
      >
        {isNativeFullscreen && (
          <div className="absolute right-4 top-4 z-10">
            <Button
              onClick={exitFullscreen}
              size="sm"
              variant="outline"
              className="gap-2 bg-background/90 backdrop-blur-sm"
              aria-label="Exit fullscreen view"
            >
              <Minimize2 className="h-4 w-4" />
              Exit Fullscreen
            </Button>
          </div>
        )}

        <iframe
          src={iframeSrc}
          title="Kelvin You resume"
          className="h-full min-h-0 w-full rounded-lg border-0 bg-white"
        />
      </div>

      {isFullscreen && !isNativeFullscreen && (
        <ResumeFullscreenDialog
          pdfUrl={pdfUrl}
          open={isFullscreen}
          onClose={exitFullscreen}
        />
      )}
    </>
  );
}
