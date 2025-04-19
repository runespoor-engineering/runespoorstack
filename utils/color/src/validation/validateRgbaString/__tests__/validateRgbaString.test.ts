import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RGBA_COLOR_REGEX } from '../../../constants/regexp';
import { RgbaColor } from '../../../types';
import { validateRgbaString } from '../validateRgbaString';

describe('validateRgbaString', () => {
  it('should not throw error for valid rgba string', () => {
    expect.hasAssertions();
    const validRgbaStrings: RgbaColor[] = [
      'rgba(0, 0, 0, 0)',
      'rgba(255, 255, 255, 1)',
      'rgba(128, 128, 128, 0.5)',
      'rgba(0, 255, 0, 0.75)'
    ];

    validRgbaStrings.forEach((rgbaString) => {
      expect(() => validateRgbaString(rgbaString)).not.toThrow();
    });
  });

  it('should throw error for non-string input', () => {
    expect.hasAssertions();
    const invalidInputs = [null, undefined, 123, true, {}, [], () => {}];

    invalidInputs.forEach((input) => {
      expect(() => validateRgbaString(input as RgbaColor)).toThrow(
        ERROR_MESSAGES.invalidColorType({ actualType: typeof input, expectedType: 'string' })
      );
    });
  });

  it('should throw error for invalid RGB values', () => {
    expect.hasAssertions();
    const invalidRgbStrings: RgbaColor[] = [
      'rgba(256, 0, 0, 1)',
      'rgba(0, 256, 0, 1)',
      'rgba(0, 0, 256, 1)'
    ];

    invalidRgbStrings.forEach((rgbaString) => {
      expect(() => validateRgbaString(rgbaString)).toThrow(ERROR_MESSAGES.invalidRgbRange);
    });
  });

  it('should throw error for invalid alpha values', () => {
    expect.hasAssertions();
    const invalidAlphaStrings = [
      'rgba(0, 0, 0, -0.1)',
      'rgba(0, 0, 0, 1.1)',
      'rgba(0, 0, 0, 2)',
      'rgba(0, 0, 0, -1)'
    ];

    invalidAlphaStrings.forEach((rgbaString) => {
      expect(() => validateRgbaString(rgbaString as RgbaColor)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGBA_COLOR_REGEX })
      );
    });
  });

  it('should throw error for malformed rgba strings', () => {
    expect.hasAssertions();
    const malformedStrings = [
      'rgb(0, 0, 0)',
      'rgba(0, 0, 0)',
      'rgba(0, 0, 0, 1, 1)',
      'rgba(0, 0)',
      'rgba(0, 0, 0, a)',
      'rgba(0, 0, 0, 1.1.1)'
    ];
    malformedStrings.forEach((rgbaString) => {
      expect(() => validateRgbaString(rgbaString as RgbaColor)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGBA_COLOR_REGEX })
      );
    });
  });
});
