import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { validateAlpha } from '../validateAlpha';

describe('validateAlpha', () => {
  it('should not throw for valid alpha values', () => {
    expect.hasAssertions();
    expect(() => validateAlpha(0)).not.toThrow();
    expect(() => validateAlpha(0.5)).not.toThrow();
    expect(() => validateAlpha(1)).not.toThrow();
  });

  it('should throw error for out of range alpha values', () => {
    expect.hasAssertions();
    expect(() => validateAlpha(-0.1)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
    expect(() => validateAlpha(1.1)).toThrow(ERROR_MESSAGES.invalidAlphaRange);
  });

  it('should throw error for non-numeric values', () => {
    expect.hasAssertions();
    expect(() => validateAlpha('blabla' as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'number' })
    );
    expect(() => validateAlpha(null as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => validateAlpha(undefined as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'number' })
    );
    expect(() => validateAlpha({} as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
    expect(() => validateAlpha([] as unknown as number)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'number' })
    );
  });
});
