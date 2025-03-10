import { MetadataRoute } from "next";
import { domainPath } from "@/data";
import dayjs from "dayjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domainPath,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${domainPath}/projects`,
      lastModified: dayjs('2025-03-09').toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domainPath}/blog`,
      lastModified: dayjs('2025-03-09').toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domainPath}/resume`,
      lastModified: dayjs('2025-03-09').toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }
  ];
}
