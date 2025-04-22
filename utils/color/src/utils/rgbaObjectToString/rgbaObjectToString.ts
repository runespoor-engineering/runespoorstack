import { RgbaColor, RgbaObject } from '../../types';
import { validateRgbaObject } from '../../validation/validateRgbaObject/validateRgbaObject';

export const rgbaObjectToString = (rgbaObject: RgbaObject): RgbaColor => {
  validateRgbaObject(rgbaObject);
  return `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;
};
