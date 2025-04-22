import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { RgbObject } from '../../../types';
import { rgbObjectToHex } from '../rgbObjectToHex';

describe('rgbObjectToHex', () => {
  it('should convert RGB values to hex', () => {
    expect.hasAssertions();
    expect(rgbObjectToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
    expect(rgbObjectToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
    expect(rgbObjectToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000');
    expect(rgbObjectToHex({ r: 0, g: 255, b: 0 })).toBe('#00ff00');
    expect(rgbObjectToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
  });

  it('should throw error for out of range RGB values', () => {
    expect.hasAssertions();
    expect(() => rgbObjectToHex({ r: -1, g: 0, b: 0 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
    expect(() => rgbObjectToHex({ r: 256, g: 0, b: 0 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
    expect(() => rgbObjectToHex({ r: 0, g: -1, b: 0 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
    expect(() => rgbObjectToHex({ r: 0, g: 256, b: 0 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
    expect(() => rgbObjectToHex({ r: 0, g: 0, b: -1 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
    expect(() => rgbObjectToHex({ r: 0, g: 0, b: 256 })).toThrow(ERROR_MESSAGES.invalidRgbRange);
  });

  it('should throw error for invalid input types', () => {
    expect.hasAssertions();
    expect(() => rgbObjectToHex(null as unknown as RgbObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'object' })
    );
    expect(() => rgbObjectToHex(undefined as unknown as RgbObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'object' })
    );
    expect(() => rgbObjectToHex('not an object' as unknown as RgbObject)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'string', expectedType: 'object' })
    );
  });
});
