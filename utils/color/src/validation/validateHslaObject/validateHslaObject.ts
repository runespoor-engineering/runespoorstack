import { ERROR_MESSAGES } from '../../constants/error-messages';
import { HslaObject } from '../../types';

export const validateHslaObject = (hslaObject: HslaObject) => {
  if (typeof hslaObject !== 'object' || hslaObject === null) {
    throw new Error(
      ERROR_MESSAGES.invalidColorType({ actualType: typeof hslaObject, expectedType: 'object' })
    );
  }

  if (hslaObject.h < 0 || hslaObject.h > 360) {
    throw new Error(ERROR_MESSAGES.invalidHueRange);
  }
  if (hslaObject.s < 0 || hslaObject.s > 100) {
    throw new Error(ERROR_MESSAGES.invalidSaturationRange);
  }
  if (hslaObject.l < 0 || hslaObject.l > 100) {
    throw new Error(ERROR_MESSAGES.invalidLightnessRange);
  }
  if (hslaObject.a < 0 || hslaObject.a > 1) {
    throw new Error(ERROR_MESSAGES.invalidAlphaRange);
  }
};
