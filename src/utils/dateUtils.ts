export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateDuration(startDate: Date | string, endDate: Date | string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  
  if (months < 12) {
    return `${months} months`;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  return remainingMonths > 0
    ? `${years} year${years > 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
    : `${years} year${years > 1 ? 's' : ''}`;
}

export function isDateInFuture(date: Date | string): boolean {
  return new Date(date) > new Date();
}