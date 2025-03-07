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

export function calculatePeriod(startDate: string, endDate: string | undefined): string {
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