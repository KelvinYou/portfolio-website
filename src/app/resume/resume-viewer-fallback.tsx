"use client";

import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, FileSearch, Laptop, Smartphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PdfViewer } from "../../components/pdf-renderer";
import { Button } from "../../components/ui/button";

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

  useEffect(() => {
    setIsClient(true);
    detectDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <div className="bg-background border border-border/40 rounded-xl shadow-sm p-8 mb-8 h-[80vh]">
          <PdfViewer>{document}</PdfViewer>
        </div>
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

          <div className="flex justify-center items-center">
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
      </div>
    </>
  );
}
