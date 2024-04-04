
import { PDFDownloadLink } from '..';
import React, { FC } from 'react'

interface PdfViewProps {
  document: React.JSX.Element;
  fileName: string;
  children: React.ReactNode;
}

export const PdfDownloader: FC<PdfViewProps> = ({ document, fileName, children }) => {
  return (
    <PDFDownloadLink
      document={document}
      fileName={`${fileName}.pdf`}
    >
      {children}
    </PDFDownloadLink>
  )
}


export default PdfDownloader