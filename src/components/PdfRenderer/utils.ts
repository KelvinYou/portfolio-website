import dynamic from 'next/dynamic';

const DynamicNoSSR = <T extends {}>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options?: any
) => {
  return dynamic(importFunc, { ssr: false, ...options });
};

export default DynamicNoSSR;
