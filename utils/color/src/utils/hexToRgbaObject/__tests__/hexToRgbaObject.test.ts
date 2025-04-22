import { ERROR_MESSAGES } from '../../../constants/error-messages';
import { hexToRgba } from '../hexToRgbaObject';

describe('hexToRgba', () => {
  it('should convert 3-digit hex to rgba', () => {
    expect.hasAssertions();
    expect(hexToRgba('#fff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgba('#000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgba('#f00')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it('should convert 6-digit hex to rgba', () => {
    expect.hasAssertions();
    expect(hexToRgba('#ffffff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgba('#000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 1 });
    expect(hexToRgba('#ff0000')).toStrictEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(hexToRgba('#00ff00')).toStrictEqual({ r: 0, g: 255, b: 0, a: 1 });
    expect(hexToRgba('#0000ff')).toStrictEqual({ r: 0, g: 0, b: 255, a: 1 });
  });

  it('should convert 8-digit hex to rgba with correct alpha', () => {
    expect.hasAssertions();
    expect(hexToRgba('#ffffffff')).toStrictEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(hexToRgba('#00000000')).toStrictEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(hexToRgba('#ff000080')).toStrictEqual({ r: 255, g: 0, b: 0, a: 0.5 });
    expect(hexToRgba('#00ff00ff')).toStrictEqual({ r: 0, g: 255, b: 0, a: 1 });
  });

  it('should throw error for invalid hex codes', () => {
    expect.hasAssertions();
    expect(() => hexToRgba('#xyz')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => hexToRgba('#12345')).toThrow(ERROR_MESSAGES.invalidHex);
    expect(() => hexToRgba('not a hex')).toThrow(ERROR_MESSAGES.invalidHex);
  });

  it('should throw error for non-string inputs', () => {
    expect.hasAssertions();
    expect(() => hexToRgba(123 as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'number', expectedType: 'string' })
    );
    expect(() => hexToRgba(null as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'object', expectedType: 'string' })
    );
    expect(() => hexToRgba(undefined as unknown as string)).toThrow(
      ERROR_MESSAGES.invalidColorType({ actualType: 'undefined', expectedType: 'string' })
    );
  });
});
