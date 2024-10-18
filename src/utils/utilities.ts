import {
  ColorPalette,
  ColorScheme,
  css,
  Elevation,
  FontSizeUnit,
  MeasureUnit,
  Theme,
} from '@emotion/react';
import chroma from 'chroma-js';
import type { Property } from 'csstype';
import {
  __,
  always,
  compose,
  cond,
  equals,
  find,
  gt,
  has,
  identity,
  is,
  isEmpty,
  isNil,
  join,
  length,
  multiply,
  nth,
  path,
  prop,
  repeat,
  split,
  T,
} from 'ramda';
import { isFontSizeUnit, isMeasureUnit } from './type-determine';
import type { ColorNameChoice } from './types';
import { fontSizeStr, px, spacingStr } from './unit';

/**
 * Generate a CSS Palette from lightest to darkest color in 10 steps.
 */
export function generatePalette(lightest: string, darkest: string): ColorPalette {
  return chroma.scale([lightest, darkest]).mode('lch').colors(10, 'hex');
}

/**
 * Assemble size and color for elevation.
 */
function transformShadow(
  shadow: Elevation,
  shadowColor?: chroma.Color = chroma.hsl(0, 0, 0),
): string[] {
  return [
    px(shadow.offset.width),
    px(shadow.offset.height),
    px(shadow.blur),
    shadowColor.alpha(shadow.opacity).hex(),
  ];
}

/**
 * Generate elavation shadow style.
 */
export function elevation(theme: Theme, level: MeasureUnit, shadowColor?: AvailableColor) {
  const color = determineColor(shadowColor ?? '#000000', theme);
  const requiredColor = cond([
    [isNil, always(undefined)],
    [T, chroma],
  ])(color);
  return css({
    boxShadow: join(' ', transformShadow(theme.elevations[level], requiredColor)),
  });
}

/**
 * Generate flex layout style.
 */
export function flex(
  theme: Theme,
  direction: Property.FlexDirection = 'row',
  justify: Property.JustifyContent = 'flex-start',
  align: Property.AlignItems = 'start',
  gap: MeasureUnit | Property.Gap | [Property.RowGap, Property.ColumnGap] = 'none',
  wrap: Property.FlexWrap = 'nowrap',
) {
  const gapValue = cond([
    [isMeasureUnit, prop(__, theme.spacings)],
    [T, always(gap)],
  ])(gap);

  return css({
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: gapValue,
  });
}

/**
 * Generate item style in flex layout.
 */
export function flexItem(
  grow: Property.FlexGrow = 0,
  shrink: Property.FlexShrink = 1,
  basis: Property.FlexBasis = 'auto',
  order: Property.Order = 'initial',
) {
  return css({
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    order: order,
  });
}

/**
 * Generate horizontal padding style.
 */
export function paddingHorizontal(
  theme: Theme,
  padding: MeasureUnit | Property.PaddingLeft | number = 'none',
) {
  return cond([
    [is(Number), (p) => css({ paddingLeft: p, paddingRight: p })],
    [
      is(String),
      (p) =>
        css({
          paddingLeft: prop(p, theme.spacings),
          paddingRight: prop(p, theme.spacings),
        }),
    ],
    [T, (p) => css({ paddingLeft: p, paddingRight: p })],
  ])(padding);
}

/**
 * Generate vertical padding style.
 */
export function paddingVertical(
  theme: Theme,
  padding: MeasureUnit | Property.PaddingTop | number = 'none',
) {
  return cond([
    [is(Number), (p) => css({ paddingTop: p, paddingBottom: p })],
    [
      is(String),
      (p) =>
        css({
          paddingTop: prop(p, theme.spacings),
          paddingBottom: prop(p, theme.spacings),
        }),
    ],
    [T, (p) => css({ paddingTop: p, paddingBottom: p })],
  ])(padding);
}

/**
 * Generate horizontal margin style.
 */
export function marginHorizontal(
  theme: Theme,
  margin: MeasureUnit | Property.MarginLeft | number = 'none',
) {
  return cond([
    [is(Number), (m) => css({ marginLeft: m, marginRight: m })],
    [
      is(String),
      (m) =>
        css({
          marginLeft: theme.spacings[m],
          marginRight: theme.spacings[m],
        }),
    ],
    [T, (m) => css({ marginLeft: m, marginRight: m })],
  ])(margin);
}

/**
 * Generate vertical margin style.
 */
export function marginVertical(
  theme: Theme,
  margin: MeasureUnit | Property.MarginTop | number = 'none',
) {
  return cond([
    [is(Number), (m) => css({ marginTop: m, marginBottom: m })],
    [
      is(String),
      (m) =>
        css({
          marginTop: theme.spacings[m],
          marginBottom: theme.spacings[m],
        }),
    ],
    [T, (m) => css({ marginTop: m, marginBottom: m })],
  ])(margin);
}

/**
 * Generate typography style. Will set font size and line height at same time.
 */
export function typography(theme: Theme, fontSize: FontSizeUnit, lineHeightRatio: number = 1.3) {
  return css({
    fontSize: prop(fontSize, theme.fontSizes),
    lineHeight: px(prop(fontSize, theme.fontSizes) * lineHeightRatio),
  });
}

/**
 * Get color in theme.
 */
function getColor(
  theme: Partial<Theme>,
  colorName: ColorNameChoice,
  shade?: number | [number, number],
  scheme?: ColorScheme,
): string | null {
  let selectedColor = prop(colorName, theme);

  if (isNil(selectedColor)) {
    if (!has(colorName, theme.colors)) {
      return colorName;
    }
    selectedColor = prop(colorName, theme.colors);
  }

  if (is(String, selectedColor)) {
    return selectedColor as string;
  }

  const activeScheme = scheme ?? theme.preferedColorScheme ?? 'light';

  const shades = cond([
    [isNil, always(repeat(5, 2))],
    [is(Number), repeat(__, 2)],
    [is(Array), identity],
  ])(shade ?? theme.defaultShade);
  const activeShade = cond([
    [equals('light'), always(nth(0, shades))],
    [equals('dark'), always(nth(1, shades))],
  ])(activeScheme);

  if (is(Array, selectedColor)) {
    return nth(activeShade, selectedColor) as string;
  }

  if (is(Object, selectedColor) && has(activeScheme, selectedColor)) {
    const palette = prop(activeScheme, selectedColor);
    if (is(Array, palette)) {
      return nth(activeShade, palette) as string;
    }
    return palette as string;
  }

  return null;
}

/**
 * Get primary color in theme.
 */
export function primaryColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'primaryColor', shade, scheme);
}

/**
 * Get secondary color in theme.
 */
export function secondaryColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'secondaryColor', shade, scheme);
}

/**
 * Get background color in theme.
 */
export function backgroundColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'backgroundColor', shade, scheme);
}

/**
 * Get foreground color in theme.
 */
export function foregroundColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'foregroundColor', shade, scheme);
}

/**
 * Get success color in theme.
 */
export function successColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'successColor', shade, scheme);
}

/**
 * Get warn color in theme.
 */
export function warnColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'warnColor', shade, scheme);
}

/**
 * Get danger color in theme.
 */
export function dangerColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'dangerColor', shade, scheme);
}

/**
 * Get info color in theme.
 */
export function infoColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scheme?: ColorScheme,
) {
  return getColor(theme, 'infoColor', shade, scheme);
}

/**
 * Get color for lines in theme.
 */
export function lineColor(
  theme: Partial<Theme>,
  shade?: number | [number, number],
  scehma?: ColorScheme,
) {
  return getColor(theme, 'lineColor', shade, scehma);
}

/**
 * Determine the color that match WCAG requirement.
 */
export function autoContrastColor(
  theme: Partial<Theme>,
  backgroundColor: string,
  requiredWCAG: number = 4.5,
): string {
  if (theme.autoContrast ?? false) {
    return (
      find(
        (c) => gt(chroma.contrast(backgroundColor, c), requiredWCAG),
        theme.wcagSearchRange ?? [],
      ) ?? foregroundColor(theme)
    );
  }
  return foregroundColor(theme);
}

/**
 * Convert color to CSS string.
 */
export function determineColor(color: string | ColorPalette, theme: Partial<Theme>): string {
  if (is(Array, color)) {
    return path([theme.defaultShade], color);
  }
  const decomposed = split('.', color);
  let requiredShade = theme.defaultShade ?? null;
  if (length(decomposed) > 1 && !isNil(nth(1, decomposed)) && !isEmpty(nth(1, decomposed))) {
    const shade = parseInt(nth(1, decomposed));
    if (!isNaN(shade)) {
      requiredShade = shade;
    }
  }
  return cond([
    [equals('primary'), always(primaryColor(theme, requiredShade))],
    [equals('secondary'), always(secondaryColor(theme, requiredShade))],
    [equals('success'), always(successColor(theme, requiredShade))],
    [equals('warn'), always(warnColor(theme, requiredShade))],
    [equals('danger'), always(dangerColor(theme, requiredShade))],
    [equals('info'), always(infoColor(theme, requiredShade))],
    [T, (c) => getColor(theme, c, requiredShade)],
  ])(nth(0, decomposed));
}

/**
 * Convert font size to CSS string.
 */
export function determineFontSize(
  fontSize: MeasureUnit | FontSizeUnit | Property.FontSize,
  theme: Partial<Theme>,
): string {
  return cond([
    [isMeasureUnit, compose(px, multiply(0.8), prop(__, theme.spacings))],
    [isFontSizeUnit, fontSizeStr(theme)],
    [T, identity],
  ])(fontSize);
}

/**
 * Convert gap value to CSS string.
 */
export function determineGap(gap: MeasureUnit | Property.Gap | number, theme: Theme) {
  return cond([
    [isMeasureUnit, spacingStr(theme)],
    [is(Number), px],
    [isNil, always(null)],
    [T, identity],
  ])(gap);
}
