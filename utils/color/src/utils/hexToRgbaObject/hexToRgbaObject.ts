import { RgbaObject } from '../../types';
import { validateHex } from '../../validation/validateHex/validateHex';

export const hexToRgbaObject = (hex: string): RgbaObject => {
  validateHex(hex);

  const hexWithoutHash = hex.startsWith('#') ? hex.slice(1) : hex;

  if (hexWithoutHash.length === 3) {
    const r = parseInt(hexWithoutHash[0] + hexWithoutHash[0], 16);
    const g = parseInt(hexWithoutHash[1] + hexWithoutHash[1], 16);
    const b = parseInt(hexWithoutHash[2] + hexWithoutHash[2], 16);
    return { r, g, b, a: 1 };
  }

  if (hexWithoutHash.length === 6) {
    const r = parseInt(hexWithoutHash.slice(0, 2), 16);
    const g = parseInt(hexWithoutHash.slice(2, 4), 16);
    const b = parseInt(hexWithoutHash.slice(4, 6), 16);
    return { r, g, b, a: 1 };
  }

  const r = parseInt(hexWithoutHash.slice(0, 2), 16);
  const g = parseInt(hexWithoutHash.slice(2, 4), 16);
  const b = parseInt(hexWithoutHash.slice(4, 6), 16);
  const a = Number((parseInt(hexWithoutHash.slice(6, 8), 16) / 255).toFixed(1));

  return { r, g, b, a };
};
