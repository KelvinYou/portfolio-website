import { domainPath } from "@/constants";

/**
 * Every social card on the site is drawn by `app/api/og`, which renders the
 * same KY mark the navbar does. Pages point here instead of at a checked-in
 * JPEG so that changing the brand changes every preview at once.
 */

/** The site card: mark, wordmark, role. Used by any page without its own subject. */
export const siteOgImage = {
  url: `${domainPath}/api/og`,
  width: 1200,
  height: 630,
  alt: "Kelvin You — AI-native Full-stack Engineer",
} as const;

/** A card whose subject is a specific piece of writing or work. */
export function ogImageFor({
  title,
  date,
  tags,
}: {
  title: string;
  date?: string;
  tags?: readonly string[];
}) {
  const params = new URLSearchParams({ title });
  if (date) params.set("date", date);
  if (tags?.length) params.set("tags", tags.join(","));
  return `${domainPath}/api/og?${params.toString()}`;
}
