'use client'

import { MDXRemote } from 'next-mdx-remote';
import './mdx-remote-render.scss';
import ArticlePreview from '../ArticlePreview';

const mdxComponents = {
  ArticlePreview,
}

const MdxRemoteRender = ({ mdxSource, mdxScope = {} }: any) => {
  return (
    <div className='mdx-content'>
      <MDXRemote {...mdxSource} components={mdxComponents} scope={mdxScope} />
    </div>
  );
}

export default MdxRemoteRender;
