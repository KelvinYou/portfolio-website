"use client";

import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { FileText, Loader2, ExternalLink } from "lucide-react";
import ResumeDocument from './resume-document';
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ResumeDownloadButton = ({ 
  className, 
  size = "default"
}: { 
  className?: string;
  size?: "default" | "sm" | "lg" | "icon"
}) => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";

  // React-PDF has issues with SSR, so we need to ensure this only runs client-side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // If we're not on the resume page, only show "View Resume" button (no download button)
  if (!isResumePage && isClient) {
    return (
      <Button variant="outline" size={size} className={className} asChild>
        <Link href="/resume">
          <ExternalLink className="mr-2 h-4 w-4" />
          View Resume
        </Link>
      </Button>
    );
  }

  // Loading state for client-side
  if (!isClient) {
    return (
      <Button className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading Resume
      </Button>
    );
  }

  // On resume page, show download button only
  return (
    <PDFDownloadLink 
      document={<ResumeDocument />} 
      fileName="your-name-resume.pdf"
      className={className}
    >
      {({ loading }) => (
        <Button 
          className={className}
          size={size}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing Resume
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Download Resume
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}; 