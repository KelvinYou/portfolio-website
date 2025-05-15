"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

// Define proper types for the React element structure
interface CodeProps {
  props?: {
    children?: string;
  };
}

export function CodeBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
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

  return (
    <div className="relative group">
      <pre
        className={cn(
          "rounded-lg px-4 py-3 bg-muted/50 overflow-x-auto",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-muted hover:bg-accent"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
