import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { alphaPercentageToDecimal } from '../alphaPercentageToDecimal';

describe('alphaPercentageToDecimal', () => {
  it('should convert valid percentage values to decimal', () => {
    expect.hasAssertions();
    expect(alphaPercentageToDecimal(0)).toBe(0);
    expect(alphaPercentageToDecimal(50)).toBe(0.5);
    expect(alphaPercentageToDecimal(100)).toBe(1);
    expect(alphaPercentageToDecimal(25)).toBe(0.25);
    expect(alphaPercentageToDecimal(75)).toBe(0.75);
  });

  it('should round decimal values to 3 decimal places', () => {
    expect.hasAssertions();
    expect(alphaPercentageToDecimal(33.333)).toBe(0.333);
    expect(alphaPercentageToDecimal(66.666)).toBe(0.667);
    expect(alphaPercentageToDecimal(99.999)).toBe(1);
  });

  it('should throw error for out of range percentage values', () => {
    expect.hasAssertions();
    expect(() => alphaPercentageToDecimal(-10)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
    expect(() => alphaPercentageToDecimal(110)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
  });

  it('should throw error for non-numeric values', () => {
    expect.hasAssertions();
    expect(() => alphaPercentageToDecimal('blabla' as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'number' })
    );
    expect(() => alphaPercentageToDecimal(null as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => alphaPercentageToDecimal(undefined as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'number' })
    );
    expect(() => alphaPercentageToDecimal({} as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => alphaPercentageToDecimal([] as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
  });
});
