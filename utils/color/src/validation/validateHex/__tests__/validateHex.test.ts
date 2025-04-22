import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { validateHex } from '../validateHex';

describe('validateHex', () => {
  it('should accept 3-digit hex color codes', () => {
    expect.hasAssertions();
    expect(() => validateHex('#fff')).not.toThrow();
    expect(() => validateHex('#000')).not.toThrow();
    expect(() => validateHex('#ABC')).not.toThrow();
  });

  it('should accept 6-digit hex color codes', () => {
    expect.hasAssertions();
    expect(() => validateHex('#ffffff')).not.toThrow();
    expect(() => validateHex('#000000')).not.toThrow();
    expect(() => validateHex('#ABCDEF')).not.toThrow();
  });

  it('should accept 8-digit hex color codes with alpha', () => {
    expect.hasAssertions();
    expect(() => validateHex('#ffffffff')).not.toThrow();
    expect(() => validateHex('#00000000')).not.toThrow();
    expect(() => validateHex('#ABCDEF12')).not.toThrow();
  });

  it('should throw error for invalid hex format', () => {
    expect.hasAssertions();
    expect(() => validateHex('#xyz')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => validateHex('#12345')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => validateHex('#FF0000F')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => validateHex('FF0000')).toThrow(ERROR_MESSAGES.invalidHex);
  });

  it('should throw error for non-string inputs', () => {
    expect.hasAssertions();
    expect(() => validateHex(123 as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'number', expectedType: 'string' })
    );
    expect(() => validateHex(null as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'string' })
    );
    expect(() => validateHex(undefined as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'string' })
    );
    expect(() => validateHex({} as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'string' })
    );
    expect(() => validateHex([] as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'string' })
    );
  });
});
