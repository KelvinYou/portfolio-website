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

export function uniqueArray<T>(arr: Array<T>) {
  return Array.from(new Set(arr));
}

// 对比两个数组是否相同
export function compareArraysEqual<T>(arr1: Array<T>, arr2: Array<T>) {
  // 两边随便谁不存在，都代表不相同
  if (!arr1 || !arr2) {
    return false;
  }

  arr1 = uniqueArray(arr1);
  arr2 = uniqueArray(arr2);

  // 如果长度不同，那肯定就不同
  if (arr1.length !== arr2.length) {
    return false;
  }
  // 排序后进行比较，保证所有元素是在同一个位置
  arr1.sort();
  arr2.sort();

  return arr1.some((item, index) => {
    let a2 = arr2[index];
    return item === a2;
  });
}