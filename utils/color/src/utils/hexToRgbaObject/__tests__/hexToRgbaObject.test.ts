import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { hexToRgbaObject } from '../hexToRgbaObject';

describe('hexToRgba', () => {
  it('should convert 3-digit hex to rgba', () => {
    expect.hasAssertions();
    expect(hexToRgbaObject('#fff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgbaObject('#000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgbaObject('#f00')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should convert 6-digit hex to rgba', () => {
    expect.hasAssertions();
    expect(hexToRgbaObject('#ffffff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgbaObject('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgbaObject('#ff0000')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(hexToRgbaObject('#00ff00')).toStrictEqual({ r: 0, g: 255, b: 0, a: 1 });
    expect(hexToRgbaObject('#0000ff')).toStrictEqual({ r: 0, g: 0, b: 255, a: 1 });
  });

  it('should convert 8-digit hex to rgba with correct alpha', () => {
    expect.hasAssertions();
    expect(hexToRgbaObject('#ffffffff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgbaObject('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(hexToRgbaObject('#ff000080')).toStrictEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    expect(hexToRgbaObject('#00ff00ff')).toStrictEqual({ r: 0, g: 255, b: 0, a: 1 });
  });

  it('should throw error for invalid hex codes', () => {
    expect.hasAssertions();
    expect(() => hexToRgbaObject('#xyz')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => hexToRgbaObject('#12345')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => hexToRgbaObject('not a hex')).toThrow(ERROR_MESSAGES.invalidHex);
  });

  it('should throw error for non-string inputs', () => {
    expect.hasAssertions();
    expect(() => hexToRgbaObject(123 as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'number', expectedType: 'string' })
    );
    expect(() => hexToRgbaObject(null as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'string' })
    );
    expect(() => hexToRgbaObject(undefined as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'string' })
    );
  });
});
