'use client';

import dynamic from 'next/dynamic';

// Create a direct client component wrapper
export const MdxRemoteRender = dynamic(
  () => import('./mdx-remote-render'),
  { ssr: false }
);

// Remove the helper function entirely