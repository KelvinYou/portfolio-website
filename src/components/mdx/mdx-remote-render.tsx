'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';

const components = {
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
    <pre {...props} className="p-4 bg-muted/40 rounded-lg overflow-auto my-4 text-sm border border-border/50" />
  ),
  code: (props: React.ComponentPropsWithoutRef<'code'>) => (
    <code {...props} className="bg-muted/50 px-1.5 py-0.5 rounded font-mono text-sm" />
  ),
  img: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <Image 
      src={props.src || ''} 
      alt={props.alt || ''} 
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto"
      style={{ maxWidth: '100%' }}
    />
  ),
  // Add more component overrides as needed
};

const MdxRemoteRender = ({ 
  mdxSource, 
  mdxScope = {} 
}: { 
  mdxSource: MDXRemoteSerializeResult;
  mdxScope: Record<string, unknown>;
}) => {
  return (
    <div className="mdx-content">
      <MDXRemote {...mdxSource} components={components} scope={mdxScope} />
    </div>
  );
}

export default MdxRemoteRender;
