import { CHANGE_FILE_DATE_REGEXP } from '../../../constants/regexp';

export const getDateFromChangeFileName = (fileName: string): Date | null => {
  const datePattern = CHANGE_FILE_DATE_REGEXP;
  const match = fileName.match(datePattern);
  if (!match) return null;
  const dateStr = match[0];
  const [year, month, day, hour, minute, second, ms] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second, ms));
};
