export const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{6})$/;
export const RGB_COLOR_REGEX = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
export const RGBA_COLOR_REGEX =
  /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d{1,3}|0|1)\)$/;
export const HSL_COLOR_REGEX = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
export const HSLA_COLOR_REGEX =
  /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0?\.\d{1,3}|0|1)\)$/;
