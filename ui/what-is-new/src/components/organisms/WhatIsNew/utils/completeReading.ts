import { STORAGE_KEY } from '../constants';

export const completeReading = (version: string) => {
  const readingCompletion = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...readingCompletion,
      [version]: true
    })
  );
};
