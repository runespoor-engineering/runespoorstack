import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RgbaObject } from '../../../types';
import { rgbaObjectToHex } from '../rgbaObjectToHex';

describe('rgbaObjectToHex', () => {
  it('should convert RGBA values to hex with alpha', () => {
    expect.hasAssertions();
    expect(rgbaObjectToHex({ r: 255, g: 255, b: 255, a: 1 })).toBe('#ffffffff');
    expect(rgbaObjectToHex({ r: 0, g: 0, b: 0, a: 0 })).toBe('#00000000');
    expect(rgbaObjectToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe('#ff000080');
    expect(rgbaObjectToHex({ r: 0, g: 255, b: 0, a: 0.25 })).toBe('#00ff0040');
    expect(rgbaObjectToHex({ r: 0, g: 0, b: 255, a: 0.75 })).toBe('#0000ffbf');
  });

  it('should handle non-integer alpha values by rounding', () => {
    expect.hasAssertions();
    expect(rgbaObjectToHex({ r: 255, g: 0, b: 0, a: 0.502 })).toBe('#ff000080');
    expect(rgbaObjectToHex({ r: 0, g: 255, b: 0, a: 0.251 })).toBe('#00ff0040');
    expect(rgbaObjectToHex({ r: 0, g: 0, b: 255, a: 0.749 })).toBe('#0000ffbf');
  });

  it('should throw error for out of range RGB values', () => {
    expect.hasAssertions();
    expect(() => rgbaObjectToHex({ r: -1, g: 0, b: 0, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
    expect(() => rgbaObjectToHex({ r: 256, g: 0, b: 0, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
    expect(() => rgbaObjectToHex({ r: 0, g: -1, b: 0, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
    expect(() => rgbaObjectToHex({ r: 0, g: 256, b: 0, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
    expect(() => rgbaObjectToHex({ r: 0, g: 0, b: -1, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
    expect(() => rgbaObjectToHex({ r: 0, g: 0, b: 256, a: 1 })).toThrow(
      ERROR_MESSAGES.invalidRgbRange
    );
  });

  it('should throw error for out of range alpha values', () => {
    expect.hasAssertions();
    expect(() => rgbaObjectToHex({ r: 255, g: 0, b: 0, a: -0.1 })).toThrow(
      ERROR_MESSAGES.invalidAlphaRange
    );
    expect(() => rgbaObjectToHex({ r: 255, g: 0, b: 0, a: 1.1 })).toThrow(
      ERROR_MESSAGES.invalidAlphaRange
    );
  });

  it('should throw error for invalid input types', () => {
    expect.hasAssertions();
    expect(() => rgbaObjectToHex(null as unknown as RgbaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'object' })
    );
    expect(() => rgbaObjectToHex(undefined as unknown as RgbaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'object' })
    );
    expect(() => rgbaObjectToHex('not an object' as unknown as RgbaObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'object' })
    );
  });
});
