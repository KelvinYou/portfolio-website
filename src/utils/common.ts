import { Duration } from "date-fns/types";

export function calculateExperience(experiences: any) {
  let totalMonths = 0;
  for (const exp of experiences) {
    const startDate = new Date(exp.startDate);
    const endDate = (!exp.endDate || exp.endDate === "Present") ? new Date() : new Date(exp.endDate);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  }
  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  return `${totalYears} year(s) and ${remainingMonths} month(s)`;
}

export function calculateDuration(startDate: string, endDate: string): Duration {
  const startDateParts = startDate.split('-').map(Number);
  const endDateParts = endDate.split('-').map(Number);

  const startYear = startDateParts[0];
  const startMonth = startDateParts[1];
  const endYear = endDateParts[0];
  const endMonth = endDateParts[1];

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
      years--;
      months += 12;
  }

  if (years < 0) {
      years = 0;
  }

  return { years, months };
}

export function getDurationString(startDate: string, endDate: string): string {
  const duration = calculateDuration(startDate, endDate);

  if (duration.years && duration.years > 0) {
      if (duration.months && duration.months > 0) {
          return `${duration.years} years and ${duration.months} months`;
      } else {
          return `${duration.years} years`;
      }
  } else {
      return `${duration.months} months`;
  }
}