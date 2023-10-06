interface DateComponents {
  year: number;
  month: number;
  day: number;
}

const parseDateComponents = (inputDate: string): DateComponents | null => {
  const [year, month, day] = inputDate.split('-').map(Number);

  // Check if the date components are valid
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  return { year, month, day };
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

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };

  // Use toLocaleDateString to format the date
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
};
