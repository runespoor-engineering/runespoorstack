import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RGB_COLOR_REGEX } from '../../../constants/regexp';
import { RgbColor } from '../../../types';
import { validateRgbString } from '../validateRgbString';

describe('validateRgbString', () => {
  it('should not throw error for valid rgba string', () => {
    expect.hasAssertions();

    const validRgbaStrings: RgbColor[] = [
      'rgb(0, 0, 0)',
      'rgb(255, 255, 255)',
      'rgb(128, 128, 128)',
      'rgb(0, 255, 0)'
    ];

    validRgbaStrings.forEach((rgbaString) => {
      expect(() => validateRgbString(rgbaString)).not.toThrow();
    });
  });

  it('should throw error for non-string input', () => {
    expect.hasAssertions();

    const invalidInputs = [null, undefined, 123, true, {}, [], () => {}];

    invalidInputs.forEach((input) => {
      expect(() => validateRgbString(input as RgbColor)).toThrow(
        ERROR_MESSAGES.invalidColorType({ actualType: typeof input, expectedType: 'string' })
      );
    });
  });

  it('should throw error for invalid RGB values', () => {
    expect.hasAssertions();

    const invalidRgbStrings: RgbColor[] = ['rgb(256, 0, 0)', 'rgb(0, 256, 0)', 'rgb(0, 0, 256)'];

    invalidRgbStrings.forEach((rgbaString) => {
      expect(() => validateRgbString(rgbaString)).toThrow(ERROR_MESSAGES.invalidRgbRange);
    });
  });

  it('should throw error for malformed rgba strings', () => {
    expect.hasAssertions();

    const malformedStrings = [
      'rgb(0, 0, 0, 1, 1)',
      'rgb(0, 0)',
      'rgb(0, 0, 0, a)',
      'rgb(0, 0, 0, 1.1.1)'
    ];
    malformedStrings.forEach((rgbaString) => {
      expect(() => validateRgbString(rgbaString as RgbColor)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGB_COLOR_REGEX })
      );
    });
  });
});
