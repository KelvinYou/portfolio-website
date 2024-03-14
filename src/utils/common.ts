function calculateExperience(experiences: any) {
  let totalMonths = 0;
  for (const exp of experiences) {
    const startDate = new Date(exp.startDate);
    const endDate = exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  }
  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  return `${totalYears} year(s) and ${remainingMonths} month(s)`;
}