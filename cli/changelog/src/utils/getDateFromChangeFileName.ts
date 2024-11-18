export const getDateFromChangeFileName = (fileName: string): Date | null => {
  const datePattern = /\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}/;
  const match = fileName.match(datePattern);
  if (!match) return null;
  const dateStr = match[0];
  const [year, month, day, hour, minute, second, ms] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second, ms));
};
