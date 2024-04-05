import dynamic from 'next/dynamic';

export const DynamicNoSSR = <T extends {}>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options?: any
) => {
  return dynamic(importFunc, { ssr: false, ...options });
};