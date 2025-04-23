import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RGB_COLOR_REGEX } from '../../../constants/regexp';
import { RgbColor, RgbObject } from '../../../types';
import { extractRgbObjectFromString } from '../extractRgbObjectFromString';

describe('extractRgbObjectFromString', () => {
  it('should correctly extract RGB values from valid strings', () => {
    expect.hasAssertions();
    const testCases: Array<{ input: RgbColor; expected: RgbObject }> = [
      {
        input: 'rgb(0, 0, 0)',
        expected: { r: 0, g: 0, b: 0 }
      },
      {
        input: 'rgb(255, 255, 255)',
        expected: { r: 255, g: 255, b: 255 }
      },
      {
        input: 'rgb(128, 64, 32)',
        expected: { r: 128, g: 64, b: 32 }
      }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = extractRgbObjectFromString(input);
      expect(result).toStrictEqual(expected);
    });
  });

  it('should handle strings with spaces', () => {
    expect.hasAssertions();
    const testCases: Array<{ input: RgbColor; expected: RgbObject }> = [
      {
        input: 'rgb(0,  0,   0)',
        expected: { r: 0, g: 0, b: 0 }
      },
      {
        input: 'rgb(255,   255,   255)',
        expected: { r: 255, g: 255, b: 255 }
      },
      {
        input: 'rgb(128,  64,  32)',
        expected: { r: 128, g: 64, b: 32 }
      }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = extractRgbObjectFromString(input);
      expect(result).toStrictEqual(expected);
    });
  });

  it('should throw error for invalid format', () => {
    expect.hasAssertions();
    const invalidFormats = [
      'rgb(0, 0, 0, 1)',
      'rgb(0, 0, 0, )',
      'rgb(0, 0, 0, 1, 1)',
      'rgb(0, 0)',
      'rgb(0, 0, 0, a)',
      'rgb(0, 0, 0, 1.1.1)',
      'rgb(0, 0, 0, 1, 1)',
      'rgb(0, 0)',
      'rgb(0, 0, 0, a)',
      'rgb(0, 0, 0, 1.1.1)',
      'not a color',
      '',
      'rgb()',
      'rgb(,,,)'
    ];

    invalidFormats.forEach((input) => {
      expect(() => extractRgbObjectFromString(input as RgbColor)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGB_COLOR_REGEX })
      );
    });
  });
});
