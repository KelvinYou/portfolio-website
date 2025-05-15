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
