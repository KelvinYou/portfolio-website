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


export const formatDate = (inputDate: string): string => {
  // Parse date components
  const dateComponents = parseDateComponents(inputDate);

  if (!dateComponents) {
    return 'Invalid Date';
  }

  // Destructure date components
  const { year, month, day } = dateComponents;

  // Construct a Date object
  const date = new Date(year, month - 1, day);

  // Ensure the month is formatted as a three-letter abbreviation
  const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Construct the desired date string
  const formattedDate = `${monthAbbreviation} ${year}`;

  return formattedDate;
};

