import { ColorPalette, css, FontSizeUnit, MeasureUnit } from '@emotion/react';
import styled from '@emotion/styled';
import chroma from 'chroma-js';
import { Property } from 'csstype';
import { __, always, cond, equals, includes, omit, prop } from 'ramda';
import { generateGenericStyles, GenericStyles } from '../generics';
import {
  autoContrastColor,
  determineColor,
  determineFontSize,
  flex,
  paddingHorizontal,
  paddingVertical,
} from '../utils/utilities';

interface ButtonProps extends GenericStyles, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'light' | 'subtle' | 'outline' | 'transparent';
  color?: 'primary' | 'secondary' | 'success' | 'warn' | 'danger' | 'info' | ColorPalette | string;
  size?: MeasureUnit;
  fz?: MeasureUnit | FontSizeUnit | Property.FontSize;
  radius?: MeasureUnit;
  actived?: boolean;
}

export const Button = styled.button<ButtonProps>(
  ({
    theme,
    variant = 'filled',
    color = 'primary',
    size = 'md',
    fz = 'f5',
    radius = 'sm',
    actived,
    disabled = false,
    ...properties
  }) => {
    const bgColor = determineColor(color, theme);
    const buttonTextColor = autoContrastColor(theme, bgColor);
    const buttonBgColor = cond([
      [equals('filled'), always(bgColor)],
      [equals('light'), always(chroma(bgColor).alpha(0.6).hex())],
      [equals('subtle'), always(chroma(bgColor).alpha(0.2).hex())],
      [equals('outline'), always('transparent')],
      [equals('transparent'), always('transparent')],
    ])(variant);
    const hoverBgColor = cond([
      [
        includes(__, ['filled', 'light', 'subtle']),
        always(chroma(buttonBgColor).darken(0.6).hex()),
      ],
      [equals('outline'), always(chroma(bgColor).darken(0.6).hex())],
      [includes(__, ['transparent']), always(chroma(bgColor).alpha(0.6).hex())],
    ])(variant);
    const activeColor = cond([
      [
        includes(__, ['filled', 'light', 'subtle']),
        always(chroma(buttonBgColor).darken(1.1).hex()),
      ],
      [includes(__, ['outline', 'transparent']), always(chroma(bgColor).alpha(0.3).hex())],
    ])(variant);
    const activeStyles = css`
      background-color: ${activeColor};
      box-shadow: inset 2px 2px 4px ${chroma(theme.black).alpha(0.2).hex()},
        inset -4px -2px 4px ${chroma(theme.black).alpha(0.6).hex()};
      transform: translateY(2px);
    `;
    const disabledStyles = css`
      cursor: not-allowed;
      border-color: ${chroma(theme.black).alpha(0.1).hex()};
      background-color: ${chroma(theme.black).alpha(0.1).hex()};
      color: ${chroma(theme.white).alpha(0.3).hex()};
    `;
    const paddingSize = prop(size, theme.spacings);
    const extraStyles = generateGenericStyles(theme, omit(['c', 'fz'], properties));

    return css`
      ${paddingVertical(theme, paddingSize)};
      ${paddingHorizontal(theme, paddingSize * 1.4)};
      ${flex(theme, 'row', 'center', 'center', 'sm', 'none')};
      border-style: solid;
      border-color: ${bgColor};
      border-width: ${equals('outline', variant) ? '1px' : '0'};
      border-radius: ${prop(radius, theme.radius)}px;
      background-color: ${buttonBgColor};
      color: ${includes(variant, ['outline', 'transparent']) ? bgColor : buttonTextColor};
      font-size: ${determineFontSize(fz, theme)};
      ${actived && activeStyles};
      ${disabled && disabledStyles};
      ${extraStyles};
      transition: background-color 0.2s, color 0.2s;
      &:not([disabled]):hover {
        background-color: ${!equals('outline', variant) ? hoverBgColor : undefined};
        border-color: ${hoverBgColor};
      }
      &:not([disabled]):active {
        background-color: ${activeColor};
      }
      .control_group &:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .control_group &:not(:last-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    `;
  },
);
