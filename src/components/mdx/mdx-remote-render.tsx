"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import React from "react";
import { CodeBlock, InlineCode } from "./code-block";
import { createSlug } from "@/lib/utils";
import { Gallery } from "@/components/gallery";

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
    <CodeBlock {...props} />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => {
    // If code is inside a pre tag, it's already handled by CodeBlock
    // This is for inline code
    const isInline = !props.className?.includes("language-");

    if (isInline) {
      return <InlineCode {...props} />;
    }

    // For code blocks, return the code element as-is since it will be handled by pre/CodeBlock
    return <code {...props} />;
  },
  h1: ({ children, ...props }: React.ComponentPropsWithoutRef<"h1">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    console.log("h1 text:", text, "id:", id);
    return (
      <h1
        id={id}
        className="group flex mt-12 mb-6 scroll-mt-24 text-4xl font-bold text-foreground"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    console.log("h2 text:", text, "id:", id);
    return (
      <h2
        id={id}
        className="group flex mt-10 mb-5 scroll-mt-24 text-3xl font-bold text-foreground"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    console.log("h3 text:", text, "id:", id);
    return (
      <h3
        id={id}
        className="group flex mt-8 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: React.ComponentPropsWithoutRef<"h4">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    return (
      <h4
        id={id}
        className="group flex mt-6 mb-3 scroll-mt-24 text-xl font-semibold text-foreground"
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, ...props }: React.ComponentPropsWithoutRef<"h5">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    return (
      <h5
        id={id}
        className="group flex mt-4 mb-2 scroll-mt-24 text-lg font-semibold text-foreground"
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, ...props }: React.ComponentPropsWithoutRef<"h6">) => {
    const text = extractTextFromChildren(children);
    const id = createSlug(text);
    return (
      <h6
        id={id}
        className="group flex mt-2 mb-1 scroll-mt-24 text-base font-semibold text-foreground"
        {...props}
      >
        {children}
      </h6>
    );
  },
  img: (props: React.ComponentPropsWithoutRef<"img">) => (
    <Image
      src={(props.src as string) || ""}
      alt={props.alt || ""}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto my-8 rounded-2xl border border-border/20 shadow-lg"
      style={{ maxWidth: "100%" }}
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-6 leading-relaxed text-muted-foreground" />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="list-decimal list-inside my-6 pl-6 space-y-2 text-muted-foreground"
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="list-disc list-inside my-6 pl-6 space-y-2 text-muted-foreground"
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="leading-relaxed" />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-8 border-l-4 border-primary/30 bg-muted/20 pl-6 pr-4 py-4 rounded-r-xl italic text-muted-foreground"
    />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2 font-medium"
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-bold text-foreground" />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em {...props} className="italic text-foreground" />
  ),
  Gallery,
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
