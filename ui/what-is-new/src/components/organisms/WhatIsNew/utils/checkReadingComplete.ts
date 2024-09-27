import { STORAGE_KEY } from '../constants';

export const checkReadingComplete = (version: string) => {
  const readingCompletion = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return Boolean(readingCompletion[version]);
};
