"use client";

import { Button } from "@/components/ui/button";
import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Laptop, Smartphone } from "lucide-react";
import React from "react";

interface ResumeMobileFallbackProps {
  document: React.ReactElement<DocumentProps>;
  deviceType: "desktop" | "mobile";
}

export function ResumeMobileFallback({
  document,
  deviceType,
}: ResumeMobileFallbackProps) {
  return (
    <div className="glass-card rounded-xl p-8 mb-8 flex items-center justify-center">
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

        <div className="flex justify-center">
          <PDFDownloadLink
            document={document}
            fileName="KelvinYou-Resume.pdf"
            className="inline-flex w-full sm:w-auto"
          >
            {({ loading }) => (
              <Button
                disabled={loading}
                size="lg"
                className="gap-2 w-full"
                aria-label={loading ? "Preparing PDF download" : "Download resume as PDF"}
              >
                <Download className="h-4 w-4" />
                {loading ? "Preparing PDF..." : "Download Resume"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
