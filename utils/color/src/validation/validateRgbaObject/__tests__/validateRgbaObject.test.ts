import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RgbaObject } from '../../../types';
import { validateRgbaObject } from '../validateRgbaObject';

describe('validateRgbaObject', () => {
  it('should not throw error for valid rgba string', () => {
    expect.hasAssertions();

    const validRgbaObject: RgbaObject[] = [
      { r: 0, g: 0, b: 0, a: 0 },
      { r: 255, g: 255, b: 255, a: 1 },
      { r: 128, g: 128, b: 128, a: 0.5 },
      { r: 0, g: 255, b: 0, a: 0.75 }
    ];

    validRgbaObject.forEach((rgbaObject) => {
      expect(() => validateRgbaObject(rgbaObject)).not.toThrow();
    });
  });

  it('should throw error for invalid RGB values', () => {
    expect.hasAssertions();

    const invalidRgbObjects: RgbaObject[] = [
      { r: 256, g: 0, b: 0, a: 1 },
      { r: 0, g: 256, b: 0, a: 1 },
      { r: 0, g: 0, b: 256, a: 1 }
    ];

    invalidRgbObjects.forEach((rgbaObject) => {
      expect(() => validateRgbaObject(rgbaObject)).toThrow(ERROR_MESSAGES.invalidRgbRange);
    });
  });
});
