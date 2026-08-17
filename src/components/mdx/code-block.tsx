"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MermaidDiagram } from "./mermaid-diagram";

// Define proper types for the React element structure
interface CodeProps {
  props?: {
    children?: string;
    className?: string;
  };
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

/**
 * The code plate is dark in both themes.
 *
 * It used to pick `oneDark` or `oneLight` from `useTheme()`, which returns
 * `undefined` on the server — so the moment the article started being
 * server-rendered, every code block hydrated with a different style object than
 * it was sent with. One fixed palette makes the markup identical on both sides,
 * and syntax colours stop shifting when the reader flips the theme.
 */
export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!children || typeof children !== "object") return;

    // Use the typed interface instead of any
    const codeElement = (children as CodeProps).props?.children;
    if (typeof codeElement === "string") {
      navigator.clipboard.writeText(codeElement);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const getLanguage = () => {
    if (!children || typeof children !== "object") return "text";

    const childClassName = (children as CodeProps).props?.className || "";
    const match = childClassName.match(/language-(\w+)/);
    return match ? match[1] : "text";
  };

  // Get code content
  const getCodeContent = () => {
    if (!children || typeof children !== "object") return "";
    return (children as CodeProps).props?.children || "";
  };

  const language = getLanguage();
  const codeContent = getCodeContent();

  // ```mermaid fences are diagrams, not code — render them rather than printing
  // the source. Kept here so authors write a normal fence and nothing else.
  if (language === "mermaid") {
    return <MermaidDiagram chart={codeContent.trim()} />;
  }

  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-[var(--code-border)]">
      {/* The language label was preceded by a terminal glyph on every block,
          including the Kotlin and TypeScript ones. The label alone is accurate. */}
      <div className="flex items-center justify-between border-b border-[var(--code-border)] bg-[var(--code-chrome)] px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--code-label)]">
          {language === "text" ? "Code" : language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--code-label)] transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          border: "none",
          // The previous values here read `hsl(var(--border) / 0.3)`, but
          // `--border` is an `rgba()` string, not HSL channels — the whole
          // declaration was invalid and dropped.
          background: "var(--code-surface)",
          fontSize: "0.8125rem",
          lineHeight: "1.65",
          padding: "1.125rem 1.25rem",
          overflowX: "auto",
        }}
        codeTagProps={{ style: { fontSize: "inherit", lineHeight: "inherit" } }}
        showLineNumbers={codeContent.split("\n").length > 5}
        lineNumberStyle={{
          minWidth: "2.5em",
          paddingRight: "1.25em",
          color: "var(--code-line-number)",
          userSelect: "none",
        }}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
}

// Enhanced inline code component
export function InlineCode({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        // A flat plate. The gradient this used to carry lived on a `before`
        // pseudo-element at `-z-10`, which put it behind the page background
        // rather than behind the text.
        "rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
