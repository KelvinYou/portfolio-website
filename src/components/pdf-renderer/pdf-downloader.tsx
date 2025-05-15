"use client";

import { Button } from "@/components/ui/button";
import { DocumentProps, PDFDownloadLink } from "@react-pdf/renderer";
import { FileText, Loader2 } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

interface PdfDownloaderProps {
  document: React.ReactElement<DocumentProps>;
  fileName: string;
  children?: ReactNode;
}

const PdfDownloader = ({
  document,
  fileName,
  children,
}: PdfDownloaderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <PDFDownloadLink document={document} fileName={fileName}>
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              {"Download " + children || "Download PDF"}
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default PdfDownloader;
