import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { alphaDecimalToPercentage } from '../alphaDecimalToPercentage';

describe('alphaDecimalToPercentage', () => {
  it('should convert valid alpha values to percentage', () => {
    expect.hasAssertions();
    expect(alphaDecimalToPercentage(0)).toBe(0);
    expect(alphaDecimalToPercentage(0.5)).toBe(50);
    expect(alphaDecimalToPercentage(1)).toBe(100);
    expect(alphaDecimalToPercentage(0.25)).toBe(25);
    expect(alphaDecimalToPercentage(0.75)).toBe(75);
  });

  it('should round decimal values correctly', () => {
    expect.hasAssertions();
    expect(alphaDecimalToPercentage(0.333)).toBe(33);
    expect(alphaDecimalToPercentage(0.666)).toBe(67);
    expect(alphaDecimalToPercentage(0.999)).toBe(100);
  });

  it('should throw error for out of range alpha values', () => {
    expect.hasAssertions();
    expect(() => alphaDecimalToPercentage(-0.1)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
    expect(() => alphaDecimalToPercentage(1.1)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
  });

  it('should throw error for non-numeric values', () => {
    expect.hasAssertions();
    expect(() => alphaDecimalToPercentage('blabla' as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'number' })
    );
    expect(() => alphaDecimalToPercentage(null as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => alphaDecimalToPercentage(undefined as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'number' })
    );
    expect(() => alphaDecimalToPercentage({} as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => alphaDecimalToPercentage([] as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
  });
});
