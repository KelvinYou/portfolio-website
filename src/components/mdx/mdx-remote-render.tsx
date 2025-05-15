"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import React from "react";

// Helper function to extract text content from React children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    return extractTextFromChildren(
      (children.props as { children?: React.ReactNode }).children,
    );
  }

  return "";
};

const components = {
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="p-4 bg-muted/40 rounded-lg overflow-auto my-4 text-sm border border-border/50"
    />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="bg-muted/50 px-1.5 py-0.5 rounded font-mono text-sm"
    />
  ),
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    console.log("h1 text:", text, "id:", id);
    return (
      <h1 id={id} className="group flex mt-10 mb-5 scroll-mt-24" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    console.log("h2 text:", text, "id:", id);
    return (
      <h2 id={id} className="group flex mt-10 mb-5 scroll-mt-24" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    console.log("h3 text:", text, "id:", id);
    return (
      <h3 id={id} className="group flex mt-8 mb-4 scroll-mt-24" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return (
      <h4 id={id} className="group flex mt-6 mb-3 scroll-mt-24" {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }: React.ComponentPropsWithoutRef<"h5">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return (
      <h5 id={id} className="group flex mt-4 mb-2 scroll-mt-24" {...props}>
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }: React.ComponentPropsWithoutRef<"h6">) => {
    const text = extractTextFromChildren(children);
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    return (
      <h6 id={id} className="group flex mt-2 mb-1 scroll-mt-24" {...props}>
        {children}
      </h6>
    );
  },
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto"
      style={{ maxWidth: "100%" }}
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="list-decimal list-inside my-4 pl-4" />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="list-disc list-inside my-4 pl-4" />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => <li {...props} />,
};

const MdxRemoteRender = ({
  mdxSource,
  mdxScope = {},
}: {
  mdxSource: MDXRemoteSerializeResult;
  mdxScope: Record<string, unknown>;
}) => {
  return (
    <div className="mdx-content">
      <MDXRemote {...mdxSource} components={components} scope={mdxScope} />
    </div>
  );
};

export default MdxRemoteRender;
