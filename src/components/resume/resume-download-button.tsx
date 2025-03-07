import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import ResumeDocument from './resume-document';

export const ResumeDownloadButton = ({ 
  className, 
  size = "default"
}: { 
  className?: string;
  size?: "default" | "sm" | "lg" | "icon"
}) => {
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