export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
export const RGB_COLOR_REGEX = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
export const RGBA_COLOR_REGEX =
  /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0?\.\d{1,3}|0|1)\)$/;
export const HSL_COLOR_REGEX = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
export const HSLA_COLOR_REGEX =
  /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0?\.\d{1,3}|0|1)\)$/;
