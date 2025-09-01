"use client";

import { cn } from "@/lib/utils";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

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

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

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

  // Choose theme based on current theme
  const syntaxTheme = theme === "dark" ? oneDark : oneLight;

  return (
    <div className="relative group my-6">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border border-border/30 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {language === "text" ? "Code" : language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg opacity-70 hover:opacity-100 transition-all duration-200 hover:bg-muted/50"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="font-medium">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with syntax highlighting */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.75rem 0.75rem",
            border: "1px solid hsl(var(--border) / 0.3)",
            borderTop: "none",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={codeContent.split("\n").length > 5}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: "hsl(var(--muted-foreground) / 0.5)",
            borderRight: "1px solid hsl(var(--border) / 0.2)",
            marginRight: "1em",
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>
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
        "relative rounded-md bg-muted/50 px-2 py-1 font-mono text-sm font-medium",
        "text-primary border border-border/20",
        "before:content-[''] before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-primary/5 before:to-primary/10 before:-z-10",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
