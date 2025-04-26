import { ERROR_MESSAGES } from '../../constants/error-messages';
import { HSLA_COLOR_REGEX } from '../../constants/regexp';
import { HslaObject } from '../../types';

export const extractHslaObjectFromString = (hslaString: string): HslaObject => {
  if (typeof hslaString !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof hslaString, expectedType: 'string' })
    );
  }
  const match = hslaString.match(HSLA_COLOR_REGEX);
  if (!match) {
    throw new Error(ERROR_MESSAGES.invalidColorFormat({ expectedFormatRegexp: HSLA_COLOR_REGEX }));
  }
  const h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10);
  const l = parseInt(match[3], 10);
  const a = parseFloat(match[4]);
  return { h, s, l, a };
};
