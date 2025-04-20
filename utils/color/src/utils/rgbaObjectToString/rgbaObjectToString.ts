import { RgbaObject } from '../../types';
import { validateRgbaObject } from '../../validation/validateRgbaObject/validateRgbaObject';

export const rgbaObjectToString = (rgbaObject: RgbaObject): string => {
  validateRgbaObject(rgbaObject);
  return `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`;
};
