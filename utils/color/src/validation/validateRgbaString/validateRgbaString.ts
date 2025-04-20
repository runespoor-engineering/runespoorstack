import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RgbaColor } from '../../types';
import { extractRgbaObjectFromString } from '../../utils/extractRgbaObjectFromString/extractRgbaObjectFromString';
import { validateRgbaObject } from '../validateRgbaObject/validateRgbaObject';

export const validateRgbaString = (rgbaString: RgbaColor) => {
  const actualColorType = typeof rgbaString;
  if (actualColorType !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: actualColorType, expectedType: 'string' })
    );
  }

  validateRgbaObject(extractRgbaObjectFromString(rgbaString));
};
