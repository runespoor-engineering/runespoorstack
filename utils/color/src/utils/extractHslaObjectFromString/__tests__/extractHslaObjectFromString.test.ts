import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { HSLA_COLOR_REGEX } from '../../../constants/regexp';
import { extractHslaObjectFromString } from '../extractHslaObjectFromString';

describe('extractHslaObjectFromString', () => {
  it('should extract valid HSLA values from string', () => {
    expect.assertions(4);
    const testCases = [
      { input: 'hsla(180, 50%, 50%, 0.5)', expected: { h: 180, s: 50, l: 50, a: 0.5 } },
      { input: 'hsla(0, 0%, 0%, 0)', expected: { h: 0, s: 0, l: 0, a: 0 } },
      { input: 'hsla(360, 100%, 100%, 1)', expected: { h: 360, s: 100, l: 100, a: 1 } },
      { input: 'hsla(45, 75%, 25%, 0.25)', expected: { h: 45, s: 75, l: 25, a: 0.25 } }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(extractHslaObjectFromString(input)).toStrictEqual(expected);
    });
  });

  it('should handle spaces in the input string', () => {
    expect.assertions(1);
    const testCases = [
      { input: 'hsla(180,   50%,   50%,   0.5)', expected: { h: 180, s: 50, l: 50, a: 0.5 } }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(extractHslaObjectFromString(input)).toStrictEqual(expected);
    });
  });

  it('should throw error for invalid HSLA format', () => {
    expect.assertions(5);
    const invalidInputs = [
      'hsl(180, 50%, 50%)', // missing alpha
      'hsla(180, 50, 50, 0.5)', // missing % signs
      'hsla(180, 50%, 50%)', // missing alpha
      'hsla(180, 50%, 50%, 1.5)', // alpha > 1
      'hsla(180, 50%, 50%, -0.5)' // alpha < 0
    ];

    invalidInputs.forEach((input) => {
      expect(() => extractHslaObjectFromString(input)).toThrow(
        ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: HSLA_COLOR_REGEX })
      );
    });
  });

  it('should throw error for non-string input', () => {
    expect.assertions(3);
    const invalidInputs = [null, undefined, 123];

    invalidInputs.forEach((input) => {
      expect(() => extractHslaObjectFromString(input as unknown as string)).toThrow(
        ERROR_MESSAGES.invalidColorType({ actualType: typeof input, expectedType: 'string' })
      );
    });
  });
});
