import { ERROR_MESSAGES } from '../../constants/error-messages';
import { HexColor, RgbObject } from '../../types';
import { validateRgbaObject } from '../../validation/validateRgbaObject/validateRgbaObject';

const rgbComponentToHex = (rgbComponent: number): string => {
  const hex = Math.round(rgbComponent).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbObjectToHex = (rgb: RgbObject): HexColor => {
  if (typeof rgb !== 'object' || rgb === null) {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof rgb, expectedType: 'object' })
    );
  }
  validateRgbaObject({ ...rgb, a: 1 });

  const rHex = rgbComponentToHex(rgb.r);
  const gHex = rgbComponentToHex(rgb.g);
  const bHex = rgbComponentToHex(rgb.b);

  return `#${rHex}${gHex}${bHex}`;
};
