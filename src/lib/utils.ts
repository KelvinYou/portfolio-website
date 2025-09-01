import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  format: "full" | "short" = "full",
): string {
  const date = new Date(dateString);

  if (format === "short") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatStartEndDate(
  startDate: string,
  endDate: string | undefined,
): string {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : "Present";

  if (end === "Present") {
    return `${start.format("MMM YYYY")} - Present`;
  }

  if (start.isSame(end, "day")) {
    return start.format("MMM YYYY");
  }

  return `${start.format("MMM YYYY")} - ${end.format("MMM YYYY")}`;
}

export function getLinkedInName(url: string): string | undefined {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const name = pathname.split("/").pop();
  return name;
}

export function getGitHubName(url: string): string | undefined {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const name = pathname.split("/").pop();
  return name;
}

export function getPersonalWebsiteName(url: string): string | undefined {
  const urlObj = new URL(url);
  return urlObj.hostname;
}

export const getTotalWorkingExperiences = (
  experiences: {
    startDate: string;
    endDate?: string;
  }[],
) => {
  const today = dayjs();
  let totalDays = 0;

  experiences.forEach((experience) => {
    const start = dayjs(experience.startDate);
    const end = experience.endDate ? dayjs(experience.endDate) : today;
    totalDays += end.diff(start, "day");
  });

  const totalYears = totalDays / 365;
  return `${Math.floor(totalYears)}+ years`;
};

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
  };

  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return htmlEntities[entity] || entity;
  });
};

// Enhanced slugify function that handles emojis and special characters
export const createSlug = (text: string): string => {
  return (
    decodeHtmlEntities(text)
      .toLowerCase()
      // Replace emojis and special unicode characters
      .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Emoticons
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Misc Symbols and Pictographs
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Transport and Map
      .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "") // Regional indicator symbols (flags)
      .replace(/[\u{2600}-\u{26FF}]/gu, "") // Misc symbols
      .replace(/[\u{2700}-\u{27BF}]/gu, "") // Dingbats
      .replace(/[\u{FE00}-\u{FE0F}]/gu, "") // Variation selectors
      .replace(/[\u{1F900}-\u{1F9FF}]/gu, "") // Supplemental Symbols and Pictographs
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove special characters except hyphens and alphanumeric
      .replace(/[^a-z0-9\-]/g, "")
      // Remove multiple consecutive hyphens
      .replace(/-+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "") ||
    // Ensure we have at least some content, fallback to a hash if empty
    `heading-${Math.random().toString(36).substr(2, 9)}`
  );
};
