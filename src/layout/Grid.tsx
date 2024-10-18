import { css, MeasureUnit } from '@emotion/react';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import { isNil } from 'ramda';
import { generateGenericStyles, GenericStyles } from '../generics';
import { determineGap } from '../utils/predefines';

interface GridProps extends GenericStyles {
  columns?: Property.GridTemplateColumns;
  autoColumn?: Property.GridAutoColumns;
  rows?: Property.GridTemplateRows;
  autoRow?: Property.GridAutoRows;
  gap?: MeasureUnit | Property.Gap | number;
  columnGap?: MeasureUnit | Property.ColumnGap | number;
  rowGap?: MeasureUnit | Property.RowGap | number;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
}

export const Grid = styled.div<GridProps>(
  ({
    theme,
    columns,
    autoColumn,
    rows,
    autoRow,
    gap,
    columnGap,
    rowGap,
    justify,
    align,
    ...properties
  }) => {
    const actualGap = determineGap(gap, theme);
    const actualColumnGap = determineGap(columnGap, theme);
    const actualRowGap = determineGap(rowGap, theme);

    return css`
      display: grid;
      grid-template-columns: ${columns};
      grid-auto-columns: ${autoColumn};
      grid-template-rows: ${rows};
      grid-auto-rows: ${autoRow};
      gap: ${isNil(actualColumnGap) && isNil(actualRowGap) && !isNil(actualGap)
        ? actualGap
        : undefined};
      grid-gap: ${isNil(actualColumnGap) && isNil(actualRowGap) && !isNil(actualGap)
        ? actualGap
        : undefined};
      column-gap: ${!isNil(actualColumnGap) ? actualColumnGap : undefined};
      row-gap: ${!isNil(actualRowGap) ? actualRowGap : undefined};
      justify-content: ${justify};
      align-items: ${align};
      ${generateGenericStyles(theme, properties)};
    `;
  },
);
