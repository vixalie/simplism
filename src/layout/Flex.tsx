import { css, MeasureUnit } from '@emotion/react';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import { always, cond, is, prop, T } from 'ramda';
import { generateGenericStyles, GenericStyles } from '../generics';
import { isMeasureUnit } from '../utils/type-determine';

interface FlexProps extends GenericStyles {
  direction?: Property.FlexDirection;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  gap?: MeasureUnit | Property.Gap | [Property.RowGap, Property.ColumnGap];
  wrap?: Property.FlexWrap;
}

export const Flex = styled.div<FlexProps>(
  ({
    theme,
    direction = 'row',
    justify = 'flex-start',
    align = 'flex-start',
    gap = 'md',
    wrap = 'nowrap',
    ...properties
  }) => {
    const gapValue = cond([
      [isMeasureUnit, (g) => `${prop(g, theme.spacings)}px`],
      [is(Array), ([rowGap, columnGap]) => `${rowGap}px ${columnGap}px`],
      [T, always(gap)],
    ])(gap);
    const extraStyles = generateGenericStyles(theme, properties);

    return css`
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
      align-items: ${align};
      gap: ${gapValue};
      flex-wrap: ${wrap};
      ${extraStyles};
    `;
  },
);

interface FlexElementProps extends GenericStyles {
  grow?: Property.FlexGrow;
  shrink?: Property.FlexShrink;
  basis?: Property.FlexBasis;
  order?: Property.Order;
}

export const FlexItem = styled.div<FlexElementProps>(
  ({ theme, grow = 0, shrink = 1, basis = 'auto', order = 'initial', ...properties }) => {
    const extraStyles = generateGenericStyles(theme, properties);
    return css`
      flex-grow: ${grow};
      flex-shrink: ${shrink};
      flex-basis: ${basis};
      order: ${order};
      ${extraStyles};
    `;
  },
);
