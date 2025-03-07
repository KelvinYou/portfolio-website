'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const components = {
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => <pre {...props} className="p-4 bg-muted/20 rounded-md overflow-auto my-4" />,
  code: (props: React.ComponentPropsWithoutRef<'code'>) => <code {...props} className="bg-muted/30 px-1 py-0.5 rounded" />,
};

const MdxRemoteRender = ({ 
  mdxSource, 
  mdxScope = {} 
}: { 
  mdxSource: MDXRemoteSerializeResult;
  mdxScope: Record<string, unknown>;
}) => {
  return (
    <MDXRemote {...mdxSource} components={components} scope={mdxScope} />
  );
}

export default MdxRemoteRender;
