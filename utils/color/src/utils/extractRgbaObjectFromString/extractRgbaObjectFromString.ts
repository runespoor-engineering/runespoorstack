import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RGBA_COLOR_REGEX } from '../../constants/regexp';
import { RgbaColor, RgbaObject } from '../../types';

export const extractRgbaObjectFromString = (rgbaString: RgbaColor): RgbaObject => {
  const match = rgbaString.match(RGBA_COLOR_REGEX);
  if (!match) {
    throw new Error(ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGBA_COLOR_REGEX }));
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = parseFloat(match[4]);
  return { r, g, b, a };
};
