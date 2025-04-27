import { ERROR_MESSAGES } from '../../constants/error-messages';
import { HSL_COLOR_REGEX } from '../../constants/regexp';
import { HslObject } from '../../types';

export const extractHslObjectFromString = (hslString: string): HslObject => {
  if (typeof hslString !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof hslString, expectedType: 'string' })
    );
  }
  const match = hslString.match(HSL_COLOR_REGEX);
  if (!match) {
    throw new Error(ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: HSL_COLOR_REGEX }));
  }
  const h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10);
  const l = parseInt(match[3], 10);
  return { h, s, l };
};
