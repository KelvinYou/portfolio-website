import { BlogDataProvider } from "@/components/blog/blog-data-provider";
import { BlogMotionConfig } from "@/components/blog/blog-motion-config";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogDataProvider>
      <BlogMotionConfig>{children}</BlogMotionConfig>
    </BlogDataProvider>
  );
}
