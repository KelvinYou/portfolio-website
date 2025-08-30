import { Metadata } from "next";
import MDXEditorClient from "./mdx-editor-client";

export const metadata: Metadata = {
  title: "MDX Editor | Portfolio",
  description: "Edit and manage MDX blog files",
};

export default function MDXEditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">MDX Editor</h1>
          <p className="text-muted-foreground">
            Edit and manage your blog MDX files with a document-like experience
          </p>
        </div>
        <MDXEditorClient />
      </div>
    </div>
  );
}
