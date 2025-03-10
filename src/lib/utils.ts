import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatStartEndDate(startDate: string, endDate: string | undefined): string {
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : 'Present';

  if (end === 'Present') {
    return `${start.format('MMM YYYY')} - Present`;
  }

  if (start.isSame(end, 'day')) {
    return start.format('MMM YYYY');
  }

  return `${start.format('MMM YYYY')} - ${end.format('MMM YYYY')}`;
}

export function getLinkedInName(url: string): string | undefined {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const name = pathname.split('/').pop();
  return name;
}

export function getGitHubName(url: string): string | undefined {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const name = pathname.split('/').pop();
  return name;
}

export function getPersonalWebsiteName(url: string): string | undefined {
  const urlObj = new URL(url);
  return urlObj.hostname;
}