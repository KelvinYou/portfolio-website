

import React, { ReactNode } from 'react';
import { PDFViewer } from '..';

interface PdfViewProps {
  children: React.JSX.Element;
}

const PdfViewer: React.FC<PdfViewProps> = ({ children }) => {
  return (
    <div className="pdf-container h-full">
    <PDFViewer className='w-full h-full pdf-container '>
      {children}
    </PDFViewer>
    </div>

  );
};

export default PdfViewer;
