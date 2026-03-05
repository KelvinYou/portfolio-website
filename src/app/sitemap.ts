import { MetadataRoute } from "next";
import { domainPath } from "@/constants";
import { locales, defaultLocale } from "@/i18n/routing";
import { getAllPostsMeta } from "@/lib/mdx";
import dayjs from "dayjs";

function localizedUrl(path: string, locale: string): string {
  if (locale === defaultLocale) return `${domainPath}${path}`;
  return `${domainPath}/${locale}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedUrl(path, locale);
  }
  languages["x-default"] = localizedUrl(path, defaultLocale);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = dayjs().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${domainPath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: alternates(""),
    },
    {
      url: `${domainPath}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: alternates("/projects"),
    },
    {
      url: `${domainPath}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/blog"),
    },
    {
      url: `${domainPath}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates("/resume"),
    },
  ];

  const posts = getAllPostsMeta();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${domainPath}/blog/${post.slug}`,
    lastModified: dayjs(post.frontmatter.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: alternates(`/blog/${post.slug}`),
  }));

  return [...staticPages, ...blogPages];
}
