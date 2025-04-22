import { HexColor, RgbaObject } from '../../types';
import { validateRgbaObject } from '../../validation/validateRgbaObject/validateRgbaObject';

const rgbaComponentToHex = (rgbaComponent: number): string => {
  const hex = Math.round(rgbaComponent).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbaObjectToHex = (rgba: RgbaObject): HexColor => {
  validateRgbaObject(rgba);

  const rHex = rgbaComponentToHex(rgba.r);
  const gHex = rgbaComponentToHex(rgba.g);
  const bHex = rgbaComponentToHex(rgba.b);
  const aHex = rgbaComponentToHex(rgba.a * 255);

  return `#${rHex}${gHex}${bHex}${aHex}`;
};
