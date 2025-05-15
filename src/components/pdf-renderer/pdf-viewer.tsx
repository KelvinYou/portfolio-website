"use client";

import { DocumentProps, PDFViewer } from "@react-pdf/renderer";
import React from "react";

interface PdfViewerProps {
  children: React.ReactElement<DocumentProps>;
}

const PdfViewer = ({ children }: PdfViewerProps) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full w-full border border-dashed border-border/60 rounded-lg p-8">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading PDF viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0.5rem",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </PDFViewer>
  );
};

export default PdfViewer;
