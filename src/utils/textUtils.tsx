/**
 * Truncate a text to a specified maximum length, adding ellipsis if truncated.
 * @param text - The input text to be truncated.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text with ellipsis if needed.
 */
export const truncateText = (text: string, maxLength: number): string => {
  // Check if the text is already within or equal to the maximum length
  if (text.length <= maxLength) {
    return text; // Return the original text if it's within or equal to the limit
  }

  // Subtracting 3 to account for the length of the ellipsis
  return text.slice(0, maxLength - 3) + '...'; // Truncate and add ellipsis
};

/**
 * Escape special characters in a string to be used in a regular expression.
 * @param text - The input text to escape special characters.
 * @returns The text with special characters escaped.
 */
export const escapeRegExp = (text: string): string => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Replace special characters with their escaped versions
};

/**
 * Format a number with commas for better readability.
 * @param input - The input number to be formatted.
 * @returns The formatted number as a string with commas.
 */
export const formatNumberWithCommas = (input: string | number): string => {
  // Convert string input to a number if needed
  const number = typeof input === 'string' ? parseFloat(input) : input;
  
  // Use regex to add commas to the number
  return number.toLocaleString();
};

/**
 * Format a number as an abbreviation (e.g., K, M, B, T) for better readability.
 * @param input - The input number to be formatted as an abbreviation.
 * @returns The formatted number as a string with an appropriate abbreviation.
 */
export const formatNumberAsAbbreviation = (input: string | number): string => {
  var number = typeof input === 'string' ? parseFloat(input) : input;
  const abbreviations = ['', 'K', 'M', 'B', 'T'];


  let index = 0;
  while (number >= 1000 && index < abbreviations.length - 1) {
    number /= 1000;
    index++;
  }

  return number.toFixed(3).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + ' ' + abbreviations[index];
}