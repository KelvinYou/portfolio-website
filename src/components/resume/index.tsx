'use client';

import dynamic from 'next/dynamic';

export const ViewResume = dynamic(
  () => import('./_components/pdf-viewer'),
  { ssr: false }
);

export const DownloadResume = dynamic(
  () => import('./_components/pdf-downloader'),
  { ssr: false }
);