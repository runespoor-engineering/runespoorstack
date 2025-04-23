import { ERROR_MESSAGES } from '../../constants/error-messages';
import { validateAlpha } from '../../validation/validateAlpha/validateAlpha';

export const alphaPercentageToDecimal = (alpha: number) => {
  if (typeof alpha !== 'number') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof alpha, expectedType: 'number' })
    );
  }
  const decimal = Number((alpha / 100).toFixed(3));
  validateAlpha(decimal);
  return decimal;
};
