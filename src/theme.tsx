import type { Theme } from '@emotion/react';
import chroma from 'chroma-js';
import { generatePalette } from './utils/style-predefines';

const colors: Theme['colors'] = {
  dark: generatePalette('#c9c9c9', '#141414'),
  gray: generatePalette('#f8f9fa', '#212529'),
  red: generatePalette('#fff5f5', '#c92a2a'),
  pink: generatePalette('#fff0f6', '#a61e4d'),
  grape: generatePalette('#f8f0fc', '#862e9c'),
  violet: generatePalette('#f3f0ff', '#5f3dc4'),
  indigo: generatePalette('#edf2ff', '#364fc7'),
  blue: generatePalette('#e7f5ff', '#1864ab'),
  cyan: generatePalette('#e3fafc', '#0b7285'),
  teal: generatePalette('#e6fcf5', '#087f5b'),
  green: generatePalette('#ebfbee', '#2b8a3e'),
  lime: generatePalette('#f4fce3', '#5c940d'),
  yellow: generatePalette('#fff9db', '#e67700'),
  orange: generatePalette('#fff4e6', '#d9480f'),
};

export const theme: Partial<Theme> = {
  colors,
  white: '#ffffff',
  black: '#000000',
  foregroundColor: {
    light: chroma.hsl(0, 0, 0.12).hex(),
    dark: chroma.hsl(0, 0, 0.82).hex(),
  },
  backgroundColor: {
    light: chroma.hsl(0, 0, 0.94).hex(),
    dark: chroma.hsl(0, 0, 0.098).hex(),
  },
  successColor: {
    light: colors.green[5],
    dark: colors.green[7],
  },
  warnColor: {
    light: colors.yellow[5],
    dark: colors.yellow[7],
  },
  dangerColor: {
    light: colors.red[5],
    dark: colors.red[7],
  },
  infoColor: {
    light: colors.blue[5],
    dark: colors.blue[7],
  },
  spacings: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  radius: {
    none: 0,
    xxs: 1,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSizes: {
    fp: 56,
    fps: 48,
    f1: 34.7,
    f1s: 32,
    f2: 29.3,
    f2s: 24,
    f3: 21.3,
    f3s: 20,
    f4: 18.7,
    f4s: 16,
    f5: 14,
    f5s: 12,
    f6: 10,
    f6s: 8.7,
    f7: 7.3,
    f7s: 6.7,
  },
  paragraphFontSize: 14,
  titleFontSize: {
    h1: 56,
    h2: 34.7,
    h3: 29.3,
    h4: 21.3,
    h5: 18.7,
    h6: 14,
  },
  elevationColor: {
    light: chroma.hsl(0, 0, 0).alpha(0.2).hex(),
    dark: chroma.hsl(0, 0, 0).alpha(0.2).hex(),
  },
  elevations: {
    none: {
      offset: { width: 0, height: 0 },
      blur: 0,
      opacity: 0,
    },
    xxs: {
      offset: { width: 1, height: 1 },
      blur: 2,
      opacity: 0.2,
    },
    xs: {
      offset: { width: 2, height: 2 },
      blur: 4,
      opacity: 0.2,
    },
    sm: {
      offset: { width: 3, height: 3 },
      blur: 6,
      opacity: 0.2,
    },
    md: {
      offset: { width: 4, height: 4 },
      blur: 8,
      opacity: 0.2,
    },
    lg: {
      offset: { width: 5, height: 5 },
      blur: 10,
      opacity: 0.2,
    },
    xl: {
      offset: { width: 6, height: 6 },
      blur: 12,
      opacity: 0.2,
    },
    xxl: {
      offset: { width: 7, height: 7 },
      blur: 14,
      opacity: 0.2,
    },
  },
};
