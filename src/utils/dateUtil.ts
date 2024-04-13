import dayjs from "dayjs";

interface DateComponents {
  year: number;
  month: number;
  day: number;
}

/**
 * Parses a string representing a date and returns the components.
 *
 * @param inputDate - The input string in the format "YYYY-MM-DD".
 * @returns DateTimeComponents if the input is valid, or null otherwise.
 */
const parseDateComponents = (inputDate: string): DateComponents | null => {
  const [year, month, day] = inputDate.split('-').map(Number);

  // Check if the date components are valid
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  return { year, month, day };
};

interface DateTimeComponents {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * Parses a string representing a date and time and returns the components.
 *
 * @param inputDateTime - The input string in the format "YYYY-MM-DD HH:mm:ss".
 * @returns DateTimeComponents if the input is valid, or null otherwise.
 */
const parseDateTimeComponents = (inputDateTime: string): DateTimeComponents | null => {
  const [datePart, timePart] = inputDateTime.split(' ');

  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Check if the date and time components are valid
  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hour) ||
    isNaN(minute) ||
    isNaN(second)
  ) {
    return null;
  }

  return { year, month, day, hour, minute, second };
};

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