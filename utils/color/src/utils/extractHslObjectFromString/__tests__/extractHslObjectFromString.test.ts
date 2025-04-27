import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { HSL_COLOR_REGEX } from '../../../constants/regexp';
import { extractHslObjectFromString } from '../extractHslObjectFromString';

describe('extractHslObjectFromString', () => {
  it('should extract valid HSLA values from string', () => {
    expect.assertions(4);
    const testCases = [
      { input: 'hsl(180, 50%, 50%)', expected: { h: 180, s: 50, l: 50 } },
      { input: 'hsl(0, 0%, 0%)', expected: { h: 0, s: 0, l: 0 } },
      { input: 'hsl(360, 100%, 100%)', expected: { h: 360, s: 100, l: 100 } },
      { input: 'hsl(45, 75%, 25%)', expected: { h: 45, s: 75, l: 25 } }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(extractHslObjectFromString(input)).toStrictEqual(expected);
    });
  });

  it('should handle spaces in the input string', () => {
    expect.assertions(1);
    const testCases = [{ input: 'hsl(180,   50%,   50%)', expected: { h: 180, s: 50, l: 50 } }];

    testCases.forEach(({ input, expected }) => {
      expect(extractHslObjectFromString(input)).toStrictEqual(expected);
    });
  });

  it('should throw error for invalid HSLA format', () => {
    expect.assertions(2);
    const invalidInputs = [
      'hsla(180, 50, 50)', // missing % signs
      'hsla(180, 50%, 50%, 0.5)' // alpha
    ];

    invalidInputs.forEach((input) => {
      expect(() => extractHslObjectFromString(input)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: HSL_COLOR_REGEX })
      );
    });
  });

  it('should throw error for non-string input', () => {
    expect.assertions(3);
    const invalidInputs = [null, undefined, 123];

    invalidInputs.forEach((input) => {
      expect(() => extractHslObjectFromString(input as unknown as string)).toThrow(
        ERROR_MESSAGES.invalidColorType({ actualType: typeof input, expectedType: 'string' })
      );
    });
  });
});
