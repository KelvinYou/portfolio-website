"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

interface SimpleRichEditorProps {
  content: string;
  onChange: (content: string) => void;
  onMDXChange: (mdx: string) => void;
}

// Convert HTML to MDX
const htmlToMDX = (html: string): string => {
  let mdx = html;

  // Convert headers
  mdx = mdx.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n# $1\n");
  mdx = mdx.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n");
  mdx = mdx.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n");

  // Convert formatting
  mdx = mdx.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  mdx = mdx.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
  mdx = mdx.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
  mdx = mdx.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
  mdx = mdx.replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~");
  mdx = mdx.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");

  // Convert paragraphs
  mdx = mdx.replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n");
  mdx = mdx.replace(/<div[^>]*>(.*?)<\/div>/gi, "\n$1\n");

  // Convert line breaks
  mdx = mdx.replace(/<br\s*\/?>/gi, "\n");

  // Convert blockquotes
  mdx = mdx.replace(
    /<blockquote[^>]*>(.*?)<\/blockquote>/gi,
    (match, content) => {
      return content
        .split("\n")
        .map((line: string) => (line.trim() ? `> ${line.trim()}` : ""))
        .join("\n");
    },
  );

  // Convert lists
  mdx = mdx.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
    return (
      "\n" +
      items
        .map((item: string) => {
          const text = item.replace(/<li[^>]*>(.*?)<\/li>/gi, "$1").trim();
          return `- ${text}`;
        })
        .join("\n") +
      "\n"
    );
  });

  mdx = mdx.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
    return (
      "\n" +
      items
        .map((item: string, index: number) => {
          const text = item.replace(/<li[^>]*>(.*?)<\/li>/gi, "$1").trim();
          return `${index + 1}. ${text}`;
        })
        .join("\n") +
      "\n"
    );
  });

  // Convert links
  mdx = mdx.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Convert images
  mdx = mdx.replace(
    /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi,
    "![$2]($1)",
  );
  mdx = mdx.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Clean up
  mdx = mdx.replace(/<[^>]*>/g, ""); // Remove remaining HTML tags
  mdx = mdx.replace(/\n\s*\n\s*\n/g, "\n\n"); // Clean up extra line breaks
  mdx = mdx.replace(/^\s+|\s+$/g, ""); // Trim

  return mdx;
};

// Convert MDX to HTML for display
const mdxToHTML = (mdx: string): string => {
  let html = mdx;

  // Convert headers
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");

  // Convert formatting
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/~~(.*?)~~/g, "<s>$1</s>");
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  // Convert blockquotes
  html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Convert lists
  html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*<\/li>)/g, "<ul>$1</ul>");

  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");

  // Convert paragraphs
  html = html
    .split("\n")
    .map((line) => {
      line = line.trim();
      if (line && !line.match(/^<[^>]+>/)) {
        return `<p>${line}</p>`;
      }
      return line;
    })
    .join("\n");

  return html;
};

export default function SimpleRichEditor({
  content,
  onChange,
  onMDXChange,
}: SimpleRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = mdxToHTML(content);
      setIsInitialized(true);
    }
  }, [content, isInitialized]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const mdx = htmlToMDX(html);
      onChange(html);
      onMDXChange(mdx);
    }
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      executeCommand("insertImage", url);
    }
  };

  return (
    <div className="border rounded-lg bg-background">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 bg-muted/30">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("strikeThrough")}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Headers */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "h1")}
          >
            H1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "h2")}
          >
            H2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "h3")}
          >
            H3
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertUnorderedList")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("insertOrderedList")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        {/* Block Elements */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("formatBlock", "blockquote")}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        {/* Media & Links */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button variant="ghost" size="sm" onClick={insertLink}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={insertImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("undo")}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => executeCommand("redo")}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="prose prose-lg max-w-none dark:prose-invert focus:outline-none min-h-[500px] p-6 bg-background"
        style={{
          whiteSpace: "pre-wrap",
        }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}
