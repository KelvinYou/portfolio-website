import { BlogDataProvider } from "@/components/blog/blog-data-provider";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogDataProvider>{children}</BlogDataProvider>;
}
