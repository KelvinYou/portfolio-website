'use client';

import dynamic from 'next/dynamic';

export const ViewResume = dynamic(
  () => import('./_components/PdfViewer'),
  { ssr: false }
);

export const DownloadResume = dynamic(
  () => import('./_components/PdfDownloader'),
  { ssr: false }
);