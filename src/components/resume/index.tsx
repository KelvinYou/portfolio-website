'use client';

import dynamic from 'next/dynamic';

export const ResumeDownloadButton = dynamic(
  () => import('./resume-download-button').then(mod => mod.ResumeDownloadButton),
  { ssr: false }
);
