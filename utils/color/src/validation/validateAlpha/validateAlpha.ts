import { ERROR_MESSAGES } from '../../constants/error-messages';

export const validateAlpha = (alpha: number) => {
  if (typeof alpha !== 'number') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof alpha, expectedType: 'number' })
    );
  }
  if (alpha < 0 || alpha > 1) {
    throw new Error(ERROR_MESSAGES.invalidAlphaRange);
  }
};
