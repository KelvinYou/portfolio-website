import { Button } from '@/components/ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileText, Loader2 } from 'lucide-react';
import React, { FC } from 'react'

interface PdfViewProps {
  document: React.JSX.Element;
  fileName: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export const PdfDownloader: FC<PdfViewProps> = ({ document, fileName, children, className, size }) => {
  return (
    <PDFDownloadLink
      document={document}
      fileName={`${fileName}.pdf`}
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
              Preparing {children}
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Download {children}
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  )
}


export default PdfDownloader