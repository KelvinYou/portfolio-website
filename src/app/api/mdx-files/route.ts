import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// Ensure blog directory exists
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

// GET - List all MDX files
export async function GET() {
  try {
    const files = fs
      .readdirSync(BLOG_DIR)
      .filter((file) => file.endsWith(".mdx"));

    const blogFiles = files.map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);

      return {
        name: filename,
        content,
        frontmatter: parsed.data,
        body: parsed.content,
      };
    });

    return NextResponse.json(blogFiles);
  } catch (error) {
    console.error("Error reading MDX files:", error);
    return NextResponse.json(
      { error: "Failed to read MDX files" },
      { status: 500 },
    );
  }
}

// POST - Create new MDX file
export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json();

    if (!filename || !content) {
      return NextResponse.json(
        { error: "Filename and content are required" },
        { status: 400 },
      );
    }

    const filePath = path.join(BLOG_DIR, filename);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File already exists" },
        { status: 409 },
      );
    }

    fs.writeFileSync(filePath, content, "utf8");

    return NextResponse.json(
      { message: "File created successfully", filename },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating MDX file:", error);
    return NextResponse.json(
      { error: "Failed to create MDX file" },
      { status: 500 },
    );
  }
}

// PUT - Update existing MDX file
export async function PUT(request: NextRequest) {
  try {
    const { filename, content } = await request.json();

    if (!filename || !content) {
      return NextResponse.json(
        { error: "Filename and content are required" },
        { status: 400 },
      );
    }

    const filePath = path.join(BLOG_DIR, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fs.writeFileSync(filePath, content, "utf8");

    return NextResponse.json(
      { message: "File updated successfully", filename },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating MDX file:", error);
    return NextResponse.json(
      { error: "Failed to update MDX file" },
      { status: 500 },
    );
  }
}

// DELETE - Delete MDX file
export async function DELETE(request: NextRequest) {
  try {
    const { filename } = await request.json();

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 },
      );
    }

    const filePath = path.join(BLOG_DIR, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fs.unlinkSync(filePath);

    return NextResponse.json(
      { message: "File deleted successfully", filename },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting MDX file:", error);
    return NextResponse.json(
      { error: "Failed to delete MDX file" },
      { status: 500 },
    );
  }
}
