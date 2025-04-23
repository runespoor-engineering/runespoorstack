import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RgbColor } from '../../types';
import { extractRgbObjectFromString } from '../../utils/extractRgbObjectFromString/extractRgbObjectFromString';
import { validateRgbaObject } from '../validateRgbaObject/validateRgbaObject';

export const validateRgbString = (rgbString: RgbColor) => {
  const actualColorType = typeof rgbString;
  if (actualColorType !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: actualColorType, expectedType: 'string' })
    );
  }

  validateRgbaObject({ ...extractRgbObjectFromString(rgbString), a: 1 });
};
