import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { HslaObject } from '../../../types';
import { validateHslaObject } from '../validateHslaObject';

describe('validateHslaObject', () => {
  it('should throw error for non-object input', () => {
    expect.assertions(3);
    expect(() => validateHslaObject(null as unknown as HslaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'object' })
    );
    expect(() => validateHslaObject(undefined as unknown as HslaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'object' })
    );
    expect(() => validateHslaObject('string' as unknown as HslaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'object' })
    );
  });

  it('should throw error for invalid hue range', () => {
    expect.assertions(2);
    expect(() => validateHslaObject({ h: -1, s: 50, l: 50, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidHueRange
    );
    expect(() => validateHslaObject({ h: 361, s: 50, l: 50, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidHueRange
    );
  });

  it('should throw error for invalid saturation range', () => {
    expect.assertions(2);
    expect(() => validateHslaObject({ h: 180, s: -1, l: 50, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidSaturationRange
    );
    expect(() => validateHslaObject({ h: 180, s: 101, l: 50, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidSaturationRange
    );
  });

  it('should throw error for invalid lightness range', () => {
    expect.assertions(2);
    expect(() => validateHslaObject({ h: 180, s: 50, l: -1, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidLightnessRange
    );
    expect(() => validateHslaObject({ h: 180, s: 50, l: 101, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidLightnessRange
    );
  });

  it('should throw error for invalid alpha range', () => {
    expect.assertions(2);
    expect(() => validateHslaObject({ h: 180, s: 50, l: 50, a: -0.1 })).toThrow(
      ERROR_MESSAGES.invalidAlphaRange
    );
    expect(() => validateHslaObject({ h: 180, s: 50, l: 50, a: 1.1 })).toThrow(
      ERROR_MESSAGES.invalidAlphaRange
    );
  });

  it('should not throw error for valid HSLA object', () => {
    expect.assertions(3);

    const validHslaObjects = [
      { h: 0, s: 0, l: 0, a: 0 },
      { h: 360, s: 100, l: 100, a: 1 },
      { h: 180, s: 50, l: 50, a: 0.5 }
    ];

    validHslaObjects.forEach((hsla) => {
      expect(() => validateHslaObject(hsla)).not.toThrow();
    });
  });
});
