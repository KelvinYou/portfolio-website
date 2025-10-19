"use client";

import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Download,
  FileSearch,
  Laptop,
  Smartphone,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { PdfViewer } from "../../../components/pdf-renderer";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent } from "../../../components/ui/dialog";

interface ResumeViewerProps {
  document: React.ReactElement<DocumentProps>;
}

export default function ResumeViewerWithFallback({
  document,
}: ResumeViewerProps) {
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
    detectDevice();

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      if (typeof window === "undefined") return;

      const isCurrentlyFullscreen = !!(
        window.document.fullscreenElement ||
        // @ts-expect-error - webkit prefixed versions
        window.document.webkitFullscreenElement ||
        // @ts-expect-error - moz prefixed versions
        window.document.mozFullScreenElement ||
        // @ts-expect-error - ms prefixed versions
        window.document.msFullscreenElement
      );
      setIsNativeFullscreen(isCurrentlyFullscreen);
      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (typeof window !== "undefined") {
      window.document.addEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
      window.document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      window.document.addEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      window.document.addEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );

      return () => {
        window.document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
        window.document.removeEventListener(
          "webkitfullscreenchange",
          handleFullscreenChange,
        );
        window.document.removeEventListener(
          "mozfullscreenchange",
          handleFullscreenChange,
        );
        window.document.removeEventListener(
          "MSFullscreenChange",
          handleFullscreenChange,
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  const detectDevice = () => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // Detect mobile devices
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      setDeviceType("mobile");
      // Skip PDF support check for mobile - just use download option
      setHasPdfSupport(false);
    } else {
      setDeviceType("desktop");
      // Continue with PDF support check for desktop
      checkPdfSupport();
    }
  };

  const checkPdfSupport = () => {
    try {
      // Various checks for PDF support
      const hasAcrobat =
        navigator?.plugins?.namedItem("Chrome PDF Viewer") ||
        navigator?.plugins?.namedItem("Adobe Acrobat") ||
        navigator?.plugins?.namedItem("PDF Viewer") ||
        // @ts-expect-error lazy to figure out why this is not working
        navigator?.mimeTypes?.["application/pdf"];

      const hasBuiltInViewer = "application/pdf" in navigator.mimeTypes;

      // Modern browsers usually have built-in PDF capability
      const isModernBrowser = /Chrome|Firefox|Safari|Edge/.test(
        navigator.userAgent,
      );

      setHasPdfSupport(hasAcrobat || hasBuiltInViewer || isModernBrowser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // If any error occurs during detection, default to fallback
      setHasPdfSupport(false);
    }
  };

  const enterFullscreen = useCallback(async () => {
    if (!fullscreenRef.current) return;

    try {
      // Try native fullscreen API first
      if (fullscreenRef.current.requestFullscreen) {
        await fullscreenRef.current.requestFullscreen();
        setIsFullscreen(true);
        setIsNativeFullscreen(true);
      }
      // @ts-expect-error - webkit prefixed version
      else if (fullscreenRef.current.webkitRequestFullscreen) {
        // @ts-expect-error - webkit prefixed version
        await fullscreenRef.current.webkitRequestFullscreen();
        setIsFullscreen(true);
        setIsNativeFullscreen(true);
      }
      // @ts-expect-error - moz prefixed version
      else if (fullscreenRef.current.mozRequestFullScreen) {
        // @ts-expect-error - moz prefixed version
        await fullscreenRef.current.mozRequestFullScreen();
        setIsFullscreen(true);
        setIsNativeFullscreen(true);
      }
      // @ts-expect-error - ms prefixed version
      else if (fullscreenRef.current.msRequestFullscreen) {
        // @ts-expect-error - ms prefixed version
        await fullscreenRef.current.msRequestFullscreen();
        setIsFullscreen(true);
        setIsNativeFullscreen(true);
      } else {
        // Fallback to modal fullscreen
        setIsFullscreen(true);
        setIsNativeFullscreen(false);
      }
    } catch (error) {
      console.warn("Native fullscreen failed, using modal fallback:", error);
      // Fallback to modal fullscreen
      setIsFullscreen(true);
      setIsNativeFullscreen(false);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (isNativeFullscreen && typeof window !== "undefined") {
        if (window.document.exitFullscreen) {
          await window.document.exitFullscreen();
        }
        // @ts-expect-error - webkit prefixed version
        else if (window.document.webkitExitFullscreen) {
          // @ts-expect-error - webkit prefixed version
          await window.document.webkitExitFullscreen();
        }
        // @ts-expect-error - moz prefixed version
        else if (window.document.mozCancelFullScreen) {
          // @ts-expect-error - moz prefixed version
          await window.document.mozCancelFullScreen();
        }
        // @ts-expect-error - ms prefixed version
        else if (window.document.msExitFullscreen) {
          // @ts-expect-error - ms prefixed version
          await window.document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.warn("Exit fullscreen failed:", error);
    }

    setIsFullscreen(false);
    setIsNativeFullscreen(false);
  }, [isNativeFullscreen]);

  if (!isClient) {
    return (
      <div className="bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
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
    // Still detecting device or checking PDF support
    return (
      <div className="bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <FileSearch className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-xl font-medium mb-2">Preparing resume view...</p>
        </div>
      </div>
    );
  }

  // Desktop with PDF support
  if (deviceType === "desktop" && hasPdfSupport) {
    return (
      <>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>

          <div className="flex gap-3">
            <Button
              onClick={enterFullscreen}
              size="lg"
              variant="outline"
              className="gap-2"
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
                <Button disabled={loading} size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  {loading ? "Preparing PDF..." : "Download Resume"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div
          ref={fullscreenRef}
          className={`bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 transition-all duration-300 ${
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
          <Dialog
            open={isFullscreen}
            onOpenChange={() => setIsFullscreen(false)}
          >
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0">
              <div className="flex items-center justify-between p-4 border-b bg-background">
                <h2 className="text-lg font-semibold">
                  Resume - Fullscreen View
                </h2>
                <div className="flex gap-2">
                  <Button
                    onClick={exitFullscreen}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <Minimize2 className="h-4 w-4" />
                    Exit Fullscreen
                  </Button>
                  <Button
                    onClick={exitFullscreen}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden">
                <div className="w-full h-full bg-background border border-border/40 rounded-lg">
                  <PdfViewer>{document}</PdfViewer>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  // Mobile device or desktop without PDF support
  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
      </div>

      <div className="bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          {deviceType === "mobile" ? (
            <Smartphone className="w-16 h-16 mx-auto mb-6 text-primary/70" />
          ) : (
            <Laptop className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
          )}

          <h2 className="text-2xl font-bold mb-3">
            {deviceType === "mobile"
              ? "Mobile Device Detected"
              : "PDF Viewer Not Available"}
          </h2>

          <p className="text-muted-foreground mb-6">
            {deviceType === "mobile"
              ? "For the best experience on mobile devices, please download the resume to view it in your device's PDF reader."
              : "Your browser doesn't support viewing PDFs directly. You can download the resume to view it in your preferred PDF reader."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Button
              onClick={enterFullscreen}
              size="lg"
              variant="outline"
              className="gap-2 w-full sm:w-auto"
            >
              <Maximize2 className="h-4 w-4" />
              View Fullscreen
            </Button>

            <PDFDownloadLink
              document={document}
              fileName="KelvinYou-Resume.pdf"
              className="inline-flex w-full sm:w-auto"
            >
              {({ loading }) => (
                <Button disabled={loading} size="lg" className="gap-2 w-full">
                  <Download className="h-4 w-4" />
                  {loading ? "Preparing PDF..." : "Download Resume"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>

          {/* Fullscreen Modal for Mobile/Fallback */}
          {isFullscreen && (
            <Dialog
              open={isFullscreen}
              onOpenChange={() => setIsFullscreen(false)}
            >
              <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 gap-0">
                <div className="flex items-center justify-between p-4 border-b bg-background">
                  <h2 className="text-lg font-semibold">
                    Resume - Fullscreen View
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={exitFullscreen}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <Minimize2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Exit Fullscreen</span>
                    </Button>
                    <Button
                      onClick={exitFullscreen}
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-hidden">
                  <div className="w-full h-full bg-background border border-border/40 rounded-lg">
                    <PdfViewer>{document}</PdfViewer>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
}
