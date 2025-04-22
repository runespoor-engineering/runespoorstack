const invalidType =
  (entityName: string) =>
  ({ actualType, expectedType }: { actualType: string; expectedType: string }) =>
    `Error: Invalid ${entityName} type. Expected ${expectedType}, got ${actualType}`;

const invalidFormat =
  (entityName: string) =>
  ({ expectedFormatRegexp }: { expectedFormatRegexp: RegExp }) =>
    `Error: Invalid ${entityName} format. Expected string to match Regexp - ${expectedFormatRegexp}`;

export const ERROR_MESSAGES = {
  invalidColorType: invalidType('color'),
  invalidColorFormat: invalidFormat('color'),
  invalidRgbRange: `Error: RGB values must be between 0 and 255`,
  invalidAlphaRange: `Error: Alpha value must be between 0 and 1`,
  invalidHex: `Error: Invalid hex color code`
};
