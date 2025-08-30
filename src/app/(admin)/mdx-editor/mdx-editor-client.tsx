"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Save,
  FileText,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Edit3,
} from "lucide-react";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import SimpleRichEditor from "./simple-rich-editor";

// Dynamically import Monaco Editor to avoid SSR issues (for raw mode)
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-md" />,
});

interface BlogFile {
  name: string;
  content: string;
  frontmatter: {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    image?: string;
    author?: string;
  };
  body: string;
}

interface PreviewProps {
  content: string;
}

// Preview component that renders MDX-like content with proper styling
const MDXPreview = ({ content }: PreviewProps) => {
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines
      .map((line, index) => {
        // Handle headers
        if (line.startsWith("# ")) {
          return (
            <h1
              key={index}
              className="text-4xl font-bold mt-8 mb-4 text-foreground"
            >
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="text-3xl font-semibold mt-6 mb-3 text-foreground"
            >
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="text-2xl font-semibold mt-5 mb-2 text-foreground"
            >
              {line.substring(4)}
            </h3>
          );
        }
        if (line.startsWith("#### ")) {
          return (
            <h4
              key={index}
              className="text-xl font-semibold mt-4 mb-2 text-foreground"
            >
              {line.substring(5)}
            </h4>
          );
        }
        if (line.startsWith("##### ")) {
          return (
            <h5
              key={index}
              className="text-lg font-semibold mt-3 mb-2 text-foreground"
            >
              {line.substring(6)}
            </h5>
          );
        }
        if (line.startsWith("###### ")) {
          return (
            <h6
              key={index}
              className="text-base font-semibold mt-2 mb-1 text-foreground"
            >
              {line.substring(7)}
            </h6>
          );
        }

        // Handle horizontal rules
        if (line.trim() === "---") {
          return <hr key={index} className="my-6 border-border" />;
        }

        // Handle bold text
        let processedLine = line.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>",
        );

        // Handle italic text
        processedLine = processedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

        // Handle inline code
        processedLine = processedLine.replace(
          /`(.*?)`/g,
          '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>',
        );

        // Handle links
        processedLine = processedLine.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-blue-600 hover:underline">$1</a>',
        );

        // Handle empty lines
        if (line.trim() === "") {
          return <br key={index} />;
        }

        // Handle list items
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={index} className="ml-4 mb-1">
              <span
                dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }}
              />
            </li>
          );
        }

        // Handle numbered lists
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={index} className="ml-4 mb-1">
              <span
                dangerouslySetInnerHTML={{
                  __html: line.replace(/^\d+\.\s/, ""),
                }}
              />
            </li>
          );
        }

        // Regular paragraphs
        if (line.trim()) {
          return (
            <p key={index} className="mb-3 leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: processedLine }} />
            </p>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {renderContent(content)}
    </div>
  );
};

export default function MDXEditorClient() {
  const [files, setFiles] = useState<BlogFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<BlogFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorMode, setEditorMode] = useState<"rich" | "raw">("rich");

  // Load files on component mount
  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/mdx-files");
      if (response.ok) {
        const filesData = await response.json();
        setFiles(filesData);
        if (filesData.length > 0 && !selectedFile) {
          setSelectedFile(filesData[0]);
          setEditorContent(filesData[0].content);
        }
      } else {
        toast.error("Failed to load files");
      }
    } catch (error) {
      console.error("Error loading files:", error);
      toast.error("Error loading files");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Save file
  const saveFile = async () => {
    if (!selectedFile) return;

    try {
      setIsSaving(true);
      const response = await fetch("/api/mdx-files", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: selectedFile.name,
          content: editorContent,
        }),
      });

      if (response.ok) {
        toast.success("File saved successfully");
        // Update the file in the local state
        const parsed = matter(editorContent);
        const updatedFile = {
          ...selectedFile,
          content: editorContent,
          frontmatter: parsed.data,
          body: parsed.content,
        };
        setSelectedFile(updatedFile);
        setFiles(
          files.map((f) => (f.name === selectedFile.name ? updatedFile : f)),
        );
      } else {
        toast.error("Failed to save file");
      }
    } catch (error) {
      console.error("Error saving file:", error);
      toast.error("Error saving file");
    } finally {
      setIsSaving(false);
    }
  };

  // Create new file
  const createNewFile = async () => {
    if (!newFileName.trim()) {
      toast.error("Please enter a filename");
      return;
    }

    const filename = newFileName.endsWith(".mdx")
      ? newFileName
      : `${newFileName}.mdx`;

    const defaultContent = `---
title: "New Blog Post"
date: "${new Date().toISOString().split("T")[0]}"
description: "A new blog post"
tags: []
author: "Me"
---

# New Blog Post

Start writing your content here...
`;

    try {
      const response = await fetch("/api/mdx-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename,
          content: defaultContent,
        }),
      });

      if (response.ok) {
        toast.success("File created successfully");
        setNewFileName("");
        await loadFiles();
      } else {
        toast.error("Failed to create file");
      }
    } catch (error) {
      console.error("Error creating file:", error);
      toast.error("Error creating file");
    }
  };

  // Delete file
  const deleteFile = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const response = await fetch("/api/mdx-files", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      if (response.ok) {
        toast.success("File deleted successfully");
        if (selectedFile?.name === filename) {
          setSelectedFile(null);
          setEditorContent("");
        }
        await loadFiles();
      } else {
        toast.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Error deleting file");
    }
  };

  // Select file
  const selectFile = (file: BlogFile) => {
    setSelectedFile(file);
    setEditorContent(file.content);
    setShowPreview(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* File List Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Blog Files
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create New File */}
            <div className="space-y-2">
              <Input
                placeholder="New file name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createNewFile()}
              />
              <Button onClick={createNewFile} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </div>

            {/* File List */}
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedFile?.name === file.name
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => selectFile(file)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      {file.frontmatter.title && (
                        <p className="text-xs text-muted-foreground truncate">
                          {file.frontmatter.title}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(file.name);
                      }}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {file.frontmatter.tags &&
                    file.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {file.frontmatter.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {file.frontmatter.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{file.frontmatter.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor/Preview Area */}
      <div className="lg:col-span-3">
        {selectedFile ? (
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  {selectedFile.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={editorMode === "rich" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditorMode("rich")}
                  >
                    Rich Text
                  </Button>
                  <Button
                    variant={editorMode === "raw" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditorMode("raw")}
                  >
                    Raw MDX
                  </Button>
                  <Button
                    variant={showPreview ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? "Edit" : "Preview"}
                  </Button>
                  <Button onClick={saveFile} disabled={isSaving} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
              {selectedFile.frontmatter.title && (
                <p className="text-sm text-muted-foreground">
                  {selectedFile.frontmatter.title}
                </p>
              )}
            </CardHeader>
            <CardContent className="h-[calc(100vh-300px)]">
              {showPreview ? (
                <div className="h-full overflow-auto p-4 bg-muted/30 rounded-lg">
                  <MDXPreview content={selectedFile.body} />
                </div>
              ) : editorMode === "rich" ? (
                <div className="h-full">
                  <SimpleRichEditor
                    content={selectedFile.body}
                    onChange={() => {
                      // Update the HTML content for internal use
                    }}
                    onMDXChange={(mdx: string) => {
                      setEditorContent(
                        selectedFile.content.replace(
                          /---[\s\S]*?---\n([\s\S]*)/,
                          `---${selectedFile.content.match(/---([\s\S]*?)---/)?.[1] || ""}---\n${mdx}`,
                        ),
                      );
                    }}
                  />
                </div>
              ) : (
                <MonacoEditor
                  height="100%"
                  defaultLanguage="markdown"
                  value={editorContent}
                  onChange={(value) => setEditorContent(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    folding: true,
                    renderLineHighlight: "line",
                    selectOnLineNumbers: true,
                  }}
                />
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a file to start editing</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
