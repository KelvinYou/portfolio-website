
import { PDFDownloadLink } from '..';
import React, { FC } from 'react'

interface PdfViewProps {
  document: React.JSX.Element;
  fileName: string;
  children: React.ReactNode;
  className?: string;
}

export const PdfDownloader: FC<PdfViewProps> = ({ document, fileName, children, className }) => {
  return (
    <PDFDownloadLink
      document={document}
      fileName={`${fileName}.pdf`}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}


export default PdfDownloader