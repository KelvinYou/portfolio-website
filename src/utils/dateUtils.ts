import dayjs from "dayjs";
import { Duration } from "date-fns/types";

export const formatDate = (dateString: string, format: string = 'MMM YYYY') => {
  // Check if dateString is a valid date string
  if (!dayjs(dateString).isValid()) {
    throw new Error('Invalid date');
  }

  // Check if format is a string and not empty
  if (typeof format !== 'string' || format.trim() === '') {
    throw new Error('Invalid format');
  }

  // Parse the date string and format it
  const parsedDate = dayjs(dateString);
  return parsedDate.format(format);
};

export const calculateDuration = (startDate: string, endDate: string): Duration => {
  const startDateParts = startDate.split('-').map(Number);
  const endDateParts = endDate.split('-').map(Number);

  const startYear = startDateParts[0];
  const startMonth = startDateParts[1];
  const endYear = endDateParts[0];
  const endMonth = endDateParts[1];

  let years = endYear - startYear;
  let months = endMonth - startMonth + 1; // Calculated from the starting month

  if (months < 0) {
      years--;
      months += 12;
  }

  if (years < 0) {
      years = 0;
  }

  return { years, months };
  
  // const start = dayjs(startDate);
  // const end = dayjs(endDate);

  // const duration = end.diff(start, 'month') + 1;

  // const years = Math.floor(duration / 12);
  // const months = duration % 12;

  // return {
  //   years,
  //   months
  // };
};

export const calculateDurationString = (startDate: string, endDate: string): string => {
  const { years = 0, months = 0 } = calculateDuration(startDate, endDate);

  if (years === 0 && months === 0) return 'Less than a month';

  const durationParts = [];

  if (years !== 0) {
    durationParts.push(`${years} year${years > 1 ? 's' : ''}`);
  }

  if (months !== 0) {
    durationParts.push(`${months} month${months > 1 ? 's' : ''}`);
  }

  return durationParts.join(' and ');
}
