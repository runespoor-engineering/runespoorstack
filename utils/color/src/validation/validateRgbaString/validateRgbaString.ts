import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RgbaColor } from '../../types';
import { extractRgbaObjectFromString } from '../../utils/extractRgbaObjectFromString/extractRgbaObjectFromString';

export const validateRgbaString = (rgbaString: RgbaColor) => {
  const actualColorType = typeof rgbaString;
  if (actualColorType !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: actualColorType, expectedType: 'string' })
    );
  }
  const { r, g, b, a } = extractRgbaObjectFromString(rgbaString);

  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error(ERROR_MESSAGES.invalidRgbRange);
  }
  if (a < 0 || a > 1) {
    throw new Error(ERROR_MESSAGES.invalidAlphaRange);
  }
};
