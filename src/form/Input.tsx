import { ColorPalette, css, FontSizeUnit, MeasureUnit } from '@emotion/react';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import { always, cond, equals, mergeLeft, omit, prop } from 'ramda';
import React from 'react';
import { generateGenericStyles, GenericStyles } from '../generics';
import {
  autoContrastColor,
  determineColor,
  determineFontSize,
  foregroundColor,
  paddingHorizontal,
  paddingVertical,
} from '../utils/utilities';

interface InputProps extends GenericStyles, React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'filled' | 'outlined' | 'underlined';
  size?: MeasureUnit | number;
  fz?: MeasureUnit | FontSizeUnit | Property.FontSize;
  radius?: MeasureUnit;
  color?: string | ColorPalette;
  placeholderStyles?: GenericStyles;
}

export const Input = styled.input<InputProps>(
  ({
    theme,
    variant = 'outlined',
    size = 'sm',
    fz = 'f5',
    radius = 'sm',
    color = 'primary',
    placeholderStyles,
    ...properties
  }) => {
    const requiredColor = determineColor(color, theme);
    const textColor = autoContrastColor(theme, requiredColor);
    const variantStyle = cond([
      [
        equals('filled'),
        always(css`
          border-width: 0;
          border-color: ${requiredColor};
          border-radius: ${prop(radius, theme.radius)}px;
          background-color: ${requiredColor};
          color: ${textColor};
        `),
      ],
      [
        equals('outlined'),
        always(css`
          border-width: 1px;
          border-color: ${requiredColor};
          border-radius: ${prop(radius, theme.radius)}px;
          background-color: transparent;
          color: ${foregroundColor(theme)};
        `),
      ],
      [
        equals('underlined'),
        always(css`
          border-color: ${requiredColor};
          border-width: 0 0 1px 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: transparent;
          color: ${foregroundColor(theme)};
        `),
      ],
    ])(variant);
    return css`
      border-style: solid;
      ${variantStyle};
      ${paddingHorizontal(theme, size)};
      ${paddingVertical(theme, size)};
      font-size: ${determineFontSize(fz, theme)};
      ${generateGenericStyles(theme, omit(['c', 'fz'], properties))};
      &:focus {
        outline: none;
      }
      &::placeholder {
        ${generateGenericStyles(
          theme,
          mergeLeft(placeholderStyles ?? {}, { fs: 'italic', fz: 'f5s' } as GenericStyles),
        )};
      }
      &[type='number']::-webkit-outer-spin-button,
      &[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
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
