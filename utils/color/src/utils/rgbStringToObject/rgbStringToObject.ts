import { RgbColor, RgbObject } from '../../types';
import { validateRgbString } from '../../validation/validateRgbString/validateRgbString';
import { extractRgbObjectFromString } from '../extractRgbObjectFromString/extractRgbObjectFromString';

export const rgbStringToObject = (rgbString: RgbColor): RgbObject => {
  validateRgbString(rgbString);
  return extractRgbObjectFromString(rgbString);
};
