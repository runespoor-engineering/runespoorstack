import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RGB_COLOR_REGEX } from '../../constants/regexp';
import { RgbColor, RgbObject } from '../../types';

export const extractRgbObjectFromString = (rgbString: RgbColor): RgbObject => {
  const match = rgbString.match(RGB_COLOR_REGEX);
  if (!match) {
    throw new Error(ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGB_COLOR_REGEX }));
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  return { r, g, b };
};
