import { css, Elevation, FontSizeUnit, MeasureUnit, Theme } from '@emotion/react';
import chroma from 'chroma-js';
import type { Property } from 'csstype';

/**
 * Generate a color palette from lightest color to darkest color.
 */
export function generatePalette(lightest: string, darkest: string): ColorPalette {
  return chroma.scale([lightest, darkest]).mode('lch').colors(10, 'hex');
}

/**
 * Quickly responsive media query keys.
 */
export const mq = {
  dark: `@media (prefers-color-scheme: dark)`,
  [576]: `@media (min-width: 576px)`,
  [768]: `@media (min-width: 768px)`,
  [992]: `@media (min-width: 992px)`,
  [1200]: `@media (min-width: 1200px)`,
};

/**
 * Transform elevation object to shadow CSS property.
 */
function transformShadowDefine(
  shadow: Elevation,
  shadowColor?: chroma.Color = chroma.hsl(0, 0, 0),
): string[] {
  return [
    `${shadow.offset.width}px`,
    `${shadow.offset.height}px`,
    `${shadow.blur}px`,
    shadowColor.alpha(shadow.opacity).hex(),
  ];
}

/**
 * Quickly generate elevation shadow style. Can be used for compositing into style definations.
 */
export function elevation(theme: Theme, level: MeasureUnit) {
  return css({ boxShadow: transformShadowDefine(theme.elevations[level]) });
}

/**
 * Quickly define flexbox layout. Can be used for compositing into style definations.
 */
export function flex(
  theme: Theme,
  direction: Property.FlexDirection = 'row',
  justify: Property.JustifyContent = 'flex-start',
  align: Property.AlignItems = 'start',
  gap: MeasureUnit = 'none',
  wrap: Property.FlexWrap = 'nowrap',
) {
  return css({
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: `${theme.spacings[gap]}px`,
  });
}

/**
 * Quickly declare horizontal padding. Can be used for compositing into style definations.
 */
export function paddingHorizontal(theme: Theme, padding: MeasureUnit | number = 'none') {
  switch (typeof padding) {
    case 'number':
      return css({ paddingLeft: padding, paddingRight: padding });
    case 'string':
      return css({
        paddingLeft: theme.spacings[padding],
        paddingRight: theme.spacings[padding],
      });
  }
}

/**
 * Quickly declare vertical padding. Can be used for compositing into style definations.
 */
export function paddingVertical(theme: Theme, padding: MeasureUnit | number = 'none') {
  switch (typeof padding) {
    case 'number':
      return css({ paddingTop: padding, paddingBottom: padding });
    case 'string':
      return css({
        paddingTop: theme.spacings[padding],
        paddingBottom: theme.spacings[padding],
      });
  }
}

/**
 * Quickly declare horizontal margin. Can be used for compositing into style definations.
 */
export function marginHorizontal(theme: Theme, margin: MeasureUnit | number = 'none') {
  switch (typeof margin) {
    case 'number':
      return css({ marginLeft: margin, marginRight: margin });
    case 'string':
      return css({
        marginLeft: theme.spacings[margin],
        marginRight: theme.spacings[margin],
      });
  }
}

/**
 * Quickly declare vertical margin. Can be used for compositing into style definations.
 */
export function marginVertical(theme: Theme, margin: MeasureUnit | number = 'none') {
  switch (typeof margin) {
    case 'number':
      return css({ marginTop: margin, marginBottom: margin });
    case 'string':
      return css({
        marginTop: theme.spacings[margin],
        marginBottom: theme.spacings[margin],
      });
  }
}

/**
 * Quickly define font size and line height at same time. Can be used for compositing into style definations.
 */
export function typography(theme: Theme, fontSize: FontSizeUnit, lineHeightRatio: number = 1.3) {
  return css({
    fontSize: theme.fontSizes[fontSize],
    lineHeight: theme.fontSizes[fontSize] * lineHeightRatio,
  });
}
