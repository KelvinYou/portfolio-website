"use client";

import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, FileSearch, Maximize2, Minimize2 } from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { PdfViewer } from "@/components/pdf-renderer";
import { Button } from "@/components/ui/button";
import { ResumeFullscreenDialog } from "./resume-fullscreen-dialog";
import { ResumeMobileFallback } from "./resume-mobile-fallback";

interface ResumeViewerProps {
  document: React.ReactElement<DocumentProps>;
}

export function ResumeViewerWithFallback({ document }: ResumeViewerProps) {
  const [hasPdfSupport, setHasPdfSupport] = useState<boolean | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | null>(
    null,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      setDeviceType("mobile");
      setHasPdfSupport(false);
    } else {
      setDeviceType("desktop");
      checkPdfSupport();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!window.document.fullscreenElement;
      setIsNativeFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );
    return () => {
      window.document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  const checkPdfSupport = () => {
    try {
      const hasBuiltInViewer = "application/pdf" in navigator.mimeTypes;
      const isModernBrowser = /Chrome|Firefox|Safari|Edge/.test(
        navigator.userAgent,
      );
      setHasPdfSupport(hasBuiltInViewer || isModernBrowser);
    } catch {
      setHasPdfSupport(false);
    }
  };

  const enterFullscreen = useCallback(async () => {
    if (!fullscreenRef.current) return;

    try {
      if (fullscreenRef.current.requestFullscreen) {
        await fullscreenRef.current.requestFullscreen();
        setIsFullscreen(true);
        setIsNativeFullscreen(true);
      } else {
        setIsFullscreen(true);
        setIsNativeFullscreen(false);
      }
    } catch {
      setIsFullscreen(true);
      setIsNativeFullscreen(false);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (isNativeFullscreen && window.document.exitFullscreen) {
        await window.document.exitFullscreen();
      }
    } catch {
      // Fullscreen exit failed silently
    }

    setIsFullscreen(false);
    setIsNativeFullscreen(false);
  }, [isNativeFullscreen]);

  if (!isClient) {
    return (
      <div className="glass-card rounded-xl p-8 mb-8 h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin motion-reduce:animate-none mx-auto mb-4" />
          <p className="text-xl font-medium mb-2">Loading resume viewer...</p>
          <p className="text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (
    deviceType === null ||
    (deviceType === "desktop" && hasPdfSupport === null)
  ) {
    return (
      <div className="glass-card rounded-xl p-8 mb-8 h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <FileSearch className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse motion-reduce:animate-none" />
          <p className="text-xl font-medium mb-2">Preparing resume view...</p>
        </div>
      </div>
    );
  }

  // Mobile device or desktop without PDF support
  if (deviceType === "mobile" || !hasPdfSupport) {
    return (
      <ResumeMobileFallback document={document} deviceType={deviceType!} />
    );
  }

  // Desktop with PDF support
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="section-heading !mb-0">Resume</h1>

        <div className="flex gap-3">
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

          <PDFDownloadLink
            document={document}
            fileName="KelvinYou-Resume.pdf"
            className="inline-flex"
          >
            {({ loading }) => (
              <Button
                disabled={loading}
                size="lg"
                className="gap-2"
                aria-label={loading ? "Preparing PDF download" : "Download resume as PDF"}
              >
                <Download className="h-4 w-4" />
                {loading ? "Preparing PDF..." : "Download Resume"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>

      <div
        ref={fullscreenRef}
        className={`glass-card rounded-xl p-8 mb-8 transition-all duration-300 ${
          isNativeFullscreen
            ? "fixed inset-0 z-50 rounded-none border-none m-0 bg-black"
            : "h-[80vh]"
        }`}
      >
        {isNativeFullscreen && (
          <div className="absolute top-4 right-4 z-10 flex gap-2">
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
        <PdfViewer>{document}</PdfViewer>
      </div>

      {/* Modal Fullscreen Fallback */}
      {isFullscreen && !isNativeFullscreen && (
        <ResumeFullscreenDialog
          document={document}
          open={isFullscreen}
          onClose={() => exitFullscreen()}
        />
      )}
    </>
  );
}
