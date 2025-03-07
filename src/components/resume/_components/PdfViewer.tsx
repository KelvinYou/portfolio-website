"use client";

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

interface PdfViewProps {
  children: React.JSX.Element;
}

const PdfViewer: React.FC<PdfViewProps> = ({ children }) => {
  return (
    <div className="h-full">
      <PDFViewer className='w-full h-full'>
        {children}
      </PDFViewer>
    </div>

  );
};

export default PdfViewer;
