import { validateAlpha } from '../../validation/validateAlpha/validateAlpha';

export const alphaDecimalToPercentage = (alpha: number) => {
  validateAlpha(alpha);
  return Math.round(alpha * 100);
};
