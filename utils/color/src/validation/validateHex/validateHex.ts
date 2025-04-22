import { ERROR_MESSAGES } from '../../constants/error-messages';
import { HEX_COLOR_REGEX } from '../../constants/regexp';
import { HexColor } from '../../types';

export const validateHex = (hex: HexColor) => {
  if (typeof hex !== 'string') {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof hex, expectedType: 'string' })
    );
  }
  if (!HEX_COLOR_REGEX.test(hex)) {
    throw new Error(ERROR_MESSAGES.invalidHex);
  }
};
