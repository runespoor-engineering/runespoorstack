import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RGBA_COLOR_REGEX } from '../../../constants/regexp';
import { RgbaColor, RgbaObject } from '../../../types';
import { extractRgbaObjectFromString } from '../extractRgbaObjectFromString';

describe('extractRgbaObjectFromString', () => {
  it('should correctly extract RGBA values from valid strings', () => {
    expect.hasAssertions();
    const testCases: Array<{ input: RgbaColor; expected: RgbaObject }> = [
      {
        input: 'rgba(0, 0, 0, 0)',
        expected: { r: 0, g: 0, b: 0, a: 0 }
      },
      {
        input: 'rgba(255, 255, 255, 1)',
        expected: { r: 255, g: 255, b: 255, a: 1 }
      },
      {
        input: 'rgba(128, 64, 32, 0.5)',
        expected: { r: 128, g: 64, b: 32, a: 0.5 }
      },
      {
        input: 'rgba(10, 20, 30, 0.75)',
        expected: { r: 10, g: 20, b: 30, a: 0.75 }
      },
      {
        input: 'rgba(0, 255, 0, 0.25)',
        expected: { r: 0, g: 255, b: 0, a: 0.25 }
      }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = extractRgbaObjectFromString(input);
      expect(result).toStrictEqual(expected);
    });
  });

  it('should handle strings with spaces', () => {
    expect.hasAssertions();
    const testCases: Array<{ input: RgbaColor; expected: RgbaObject }> = [
      {
        input: 'rgba(0,  0,   0,   0)',
        expected: { r: 0, g: 0, b: 0, a: 0 }
      },
      {
        input: 'rgba(255,   255,   255,  1)',
        expected: { r: 255, g: 255, b: 255, a: 1 }
      },
      {
        input: 'rgba(128,  64,  32,  0.5)',
        expected: { r: 128, g: 64, b: 32, a: 0.5 }
      }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = extractRgbaObjectFromString(input);
      expect(result).toStrictEqual(expected);
    });
  });

  it('should throw error for invalid format', () => {
    expect.hasAssertions();
    const invalidFormats = [
      'rgb(0, 0, 0)',
      'rgba(0, 0, 0)',
      'rgba(0, 0, 0, 1, 1)',
      'rgba(0, 0)',
      'rgba(0, 0, 0, a)',
      'rgba(0, 0, 0, 1.1.1)',
      'rgba(0, 0, 0)',
      'rgba(0, 0, 0, 1, 1)',
      'rgba(0, 0)',
      'rgba(0, 0, 0, a)',
      'rgba(0, 0, 0, 1.1.1)',
      'not a color',
      '',
      'rgba()',
      'rgba(,,,)'
    ];

    invalidFormats.forEach((input) => {
      expect(() => extractRgbaObjectFromString(input as RgbaColor)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: RGBA_COLOR_REGEX })
      );
    });
  });

  it('should handle decimal alpha values correctly', () => {
    expect.hasAssertions();
    const testCases: Array<{ input: RgbaColor; expected: RgbaObject }> = [
      {
        input: 'rgba(0, 0, 0, 0.1)',
        expected: { r: 0, g: 0, b: 0, a: 0.1 }
      },
      {
        input: 'rgba(0, 0, 0, 0.01)',
        expected: { r: 0, g: 0, b: 0, a: 0.01 }
      },
      {
        input: 'rgba(0, 0, 0, 0.001)',
        expected: { r: 0, g: 0, b: 0, a: 0.001 }
      },
      {
        input: 'rgba(0, 0, 0, 0.999)',
        expected: { r: 0, g: 0, b: 0, a: 0.999 }
      }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = extractRgbaObjectFromString(input);
      expect(result).toStrictEqual(expected);
    });
  });
});
