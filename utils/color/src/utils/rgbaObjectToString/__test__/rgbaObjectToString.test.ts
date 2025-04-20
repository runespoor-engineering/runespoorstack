import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RgbaObject } from '../../../types';
import { rgbaObjectToString } from '../rgbaObjectToString';

describe('rgbaObjectToString', () => {
  it('should convert valid RgbaObject to string', () => {
    expect.hasAssertions();
    const validRgbaObjects: RgbaObject[] = [
      { r: 0, g: 0, b: 0, a: 0 },
      { r: 255, g: 255, b: 255, a: 1 },
      { r: 128, g: 128, b: 128, a: 0.5 },
      { r: 0, g: 255, b: 0, a: 0.75 }
    ];

    validRgbaObjects.forEach((rgbaObject) => {
      expect(rgbaObjectToString(rgbaObject)).toBe(
        `rgba(${rgbaObject.r}, ${rgbaObject.g}, ${rgbaObject.b}, ${rgbaObject.a})`
      );
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
      expect(() => rgbaObjectToString(rgbaObject)).toThrow(ERROR_MESSAGES.invalidRgbRange);
    });
  });

  it('should throw error for invalid alpha values', () => {
    expect.hasAssertions();
    const invalidAlphaObjects: RgbaObject[] = [
      { r: 0, g: 0, b: 0, a: -0.1 },
      { r: 0, g: 0, b: 0, a: 1.1 }
    ];

    invalidAlphaObjects.forEach((rgbaObject) => {
      expect(() => rgbaObjectToString(rgbaObject)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
    });
  });
});
