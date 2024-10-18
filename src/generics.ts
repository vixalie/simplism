import { css, FontSizeUnit, MeasureUnit, SerializedStyles, Theme } from '@emotion/react';
import { Property, StandardLonghandProperties } from 'csstype';
import {
  __,
  always,
  cond,
  includes,
  is,
  keys,
  mergeRight,
  nth,
  prop,
  reduce,
  T,
  toPairs,
} from 'ramda';
import { isFontSizeUnit, isMeasureUnit } from './utils/type-determine';

const genericCSSProperties: {
  [k: string]: keyof StandardLonghandProperties | keyof StandardLonghandProperties[];
} = {
  w: 'width',
  miw: 'minWidth',
  maw: 'maxWidth',
  h: 'height',
  mih: 'minHeight',
  mah: 'maxHeight',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mbs: 'marginBlockStart',
  mis: 'marginInlineStart',
  mbe: 'marginBlockEnd',
  mie: 'marginInlineEnd',
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pbs: 'paddingBlockStart',
  pis: 'paddingInlineStart',
  pbe: 'paddingBlockEnd',
  pie: 'paddingInlineEnd',
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
  c: 'color',
  ta: 'textAlign',
  tt: 'textTransform',
  td: 'textDecoration',
  fz: 'fontSize',
  fw: 'fontWeight',
  fs: 'fontStyle',
  lh: 'lineHeight',
  grow: 'flexGrow',
  shrink: 'flexShrink',
  basis: 'flexBasis',
  bs: 'boxSizing',
  z: 'zIndex',
  gc: 'gridColumn',
  gr: 'gridRow',
  jsf: 'justifySelf',
  asf: 'alignSelf',
  pos: 'position',
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left',
  us: 'userSelect',
};

export interface GenericStyles {
  w?: Property.Width;
  miw?: Property.MinWidth;
  maw?: Property.MaxWidth;
  h?: Property.Height;
  mih?: Property.MinHeight;
  mah?: Property.MaxHeight;
  m?: MeasureUnit | Property.Margin;
  mt?: MeasureUnit | Property.MarginTop;
  mr?: MeasureUnit | Property.MarginRight;
  mb?: MeasureUnit | Property.MarginBottom;
  ml?: MeasureUnit | Property.MarginLeft;
  mbs?: MeasureUnit | Property.MarginBlockStart;
  mis?: MeasureUnit | Property.MarginInlineStart;
  mbe?: MeasureUnit | Property.MarginBlockEnd;
  mie?: MeasureUnit | Property.MarginInlineEnd;
  mx?: MeasureUnit | Property.MarginLeft | [Property.MarginLeft, Property.MarginRight];
  my?: MeasureUnit | Property.MarginTop | [Property.MarginTop, Property.MarginBottom];
  p?: MeasureUnit | Property.Padding;
  pt?: MeasureUnit | Property.PaddingTop;
  pr?: MeasureUnit | Property.PaddingRight;
  pb?: MeasureUnit | Property.PaddingBottom;
  pl?: MeasureUnit | Property.PaddingLeft;
  pbs?: MeasureUnit | Property.PaddingBlockStart;
  pis?: MeasureUnit | Property.PaddingInlineStart;
  pbe?: MeasureUnit | Property.PaddingBlockEnd;
  pie?: MeasureUnit | Property.PaddingInlineEnd;
  px?: MeasureUnit | Property.PaddingLeft | [Property.PaddingLeft, Property.PaddingRight];
  py?: MeasureUnit | Property.PaddingTop | [Property.PaddingTop, Property.PaddingBottom];
  c?: Property.Color;
  ta?: Property.TextAlign;
  tt?: Property.TextTransform;
  td?: Property.TextDecoration;
  fz?: FontSizeUnit | Property.FontSize;
  fw?: Property.FontWeight;
  fs?: Property.FontStyle;
  lh?: Property.LineHeight;
  grow?: Property.FlexGrow;
  shrink?: Property.FlexShrink;
  basis?: Property.FlexBasis;
  bs?: Property.BoxSizing;
  z?: Property.ZIndex;
  /**
   * Used to set the grid-column property, need to be used with the Grid component
   */
  gc?: Property.GridColumn;
  /**
   * Used to set the grid-row property, need to be used with the Grid component
   */
  gr?: Property.GridRow;
  jsf?: Property.JustifySelf;
  asf?: Property.AlignSelf;
  pos?: Property.Position;
  t?: Property.Top;
  r?: Property.Right;
  b?: Property.Bottom;
  l?: Property.Left;
  us?: Property.UserSelect;
}

/**
 * Generate style attributes support to components.
 */
export function generateGenericStyles(
  theme: Partial<Theme>,
  styleProps: GenericStyles,
): SerializedStyles {
  const availableKeys = keys(genericCSSProperties);
  const stylePairs = toPairs(styleProps);
  const convertedStyles = reduce(
    (acc, [key, value]) => {
      if (includes(key, availableKeys)) {
        const convertedValue = cond([
          [isMeasureUnit, prop(__, theme.spacings)],
          [isFontSizeUnit, prop(__, theme.fontSizes)],
          [T, always(value)],
        ])(value);
        if (is(Array, convertedValue)) {
          if (is(Array, genericCSSProperties[key])) {
            return mergeRight(acc, {
              [nth(0, genericCSSProperties[key])]: nth(0, convertedValue),
              [nth(1, genericCSSProperties[key])]: nth(1, convertedValue),
            });
          } else {
            return mergeRight(acc, {
              [genericCSSProperties[key] as string]: nth(0, convertedValue),
            });
          }
        } else if (is(Array, genericCSSProperties[key])) {
          return mergeRight(acc, {
            [nth(0, genericCSSProperties[key])]: convertedValue,
            [nth(1, genericCSSProperties[key])]: convertedValue,
          });
        } else {
          return mergeRight(acc, { [genericCSSProperties[key] as string]: convertedValue });
        }
      }
      return acc;
    },
    {},
    stylePairs,
  );
  return css(convertedStyles);
}
