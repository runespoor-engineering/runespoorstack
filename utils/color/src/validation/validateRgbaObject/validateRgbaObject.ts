import { ERROR_MESSAGES } from '../../constants/error-messages';
import { RgbaObject } from '../../types';

export const validateRgbaObject = (rgbaObject: RgbaObject) => {
  if (
    rgbaObject.r < 0 ||
    rgbaObject.r > 255 ||
    rgbaObject.g < 0 ||
    rgbaObject.g > 255 ||
    rgbaObject.b < 0 ||
    rgbaObject.b > 255
  ) {
    throw new Error(ERROR_MESSAGES.invalidRgbRange);
  }
  if (rgbaObject.a < 0 || rgbaObject.a > 1) {
    throw new Error(ERROR_MESSAGES.invalidAlphaRange);
  }
};
