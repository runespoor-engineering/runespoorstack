import { RgbaColor, RgbaObject } from '../../types';
import { validateRgbaString } from '../../validation/validateRgbaString/validateRgbaString';
import { extractRgbaObjectFromString } from '../extractRgbaObjectFromString/extractRgbaObjectFromString';

export const rgbaStringToObject = (rgbaString: RgbaColor): RgbaObject => {
  validateRgbaString(rgbaString);
  return extractRgbaObjectFromString(rgbaString);
};
