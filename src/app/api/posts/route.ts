import { getAllPostsMeta } from "@/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Metadata only. The single consumer (related blog links) reads `slug` and
    // `frontmatter.title`; the endpoint used to serve every post's full body
    // and compiled MDX alongside them.
    const posts = getAllPostsMeta();
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
