import { css, MeasureUnit } from '@emotion/react';
import styled from '@emotion/styled';
import { Property } from 'csstype';
import React, { PropsWithChildren } from 'react';
import { generateGenericStyles, GenericStyles } from '../generics';
import {
  backgroundColor,
  foregroundColor,
  paddingHorizontal,
  paddingVertical,
} from '../utils/utilities';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  cellPaddingX?: MeasureUnit | Property.PaddingLeft;
  cellPaddingY?: MeasureUnit | Property.PaddingTop;
  horizontalScrollable?: boolean;
  grow?: Property.FlexGrow;
  stickyHeader?: boolean;
  boldHeader?: boolean;
  rowLine?: boolean;
  columnLine?: boolean;
  outline?: boolean;
}

const TableContainer = styled.div<TableProps>(({ horizontalScrollable = false, grow = 1 }) => {
  return css`
    box-sizing: border-box;
    flex-grow: ${grow};
    align-self: stretch;
    overflow-y: auto;
    overflow-x: ${horizontalScrollable ? 'auto' : 'hidden'};
  `;
});
const TableContent = styled.table<TableProps>(
  ({
    theme,
    cellPaddingX = 'xs',
    cellPaddingY = 'sm',
    stickyHeader = false,
    boldHeader = false,
    rowLine: rowBorder = false,
    columnLine: columnBorder = false,
    outline: outlineBorder = false,
    horizontalScrollable = false,
  }) => {
    const stickHeadStyle = css`
      position: sticky;
      top: 0;
      z-index: 1;
      backgroundcolor: ${backgroundColor(theme)};
    `;
    return css`
      border-collapse: collapse;
      border-style: solid;
      border-color: ${foregroundColor(theme)};
      border-width: ${outlineBorder ? '1px' : '0'};
      min-width: 100%;
      ${horizontalScrollable && 'table-layout: auto'};
      & thead tr th,
      & tbody tr td,
      & tfoot tr td {
        ${paddingHorizontal(theme, cellPaddingX)};
        ${paddingVertical(theme, cellPaddingY)};
        border-width: 0;
        border-style: solid;
        border-color: ${foregroundColor(theme)};
        backgroundcolor: ${backgroundColor(theme)};
      }
      & thead tr th {
        font-weight: ${boldHeader ? 'bold' : 'normal'};
        border-bottom: 1px solid ${foregroundColor(theme)};
        ${stickyHeader && stickHeadStyle};
      }
      & tbody tr:not(:last-of-type) td {
        border-bottom-width: ${rowBorder ? '1px' : '0'};
      }
      & thead tr th:not(:last-of-type),
      & tbody tr td:not(:last-of-type),
      & tfoot tr td:not(:last-of-type) {
        border-right-width: ${columnBorder ? '1px' : '0'};
      }
      & tfoot tr td {
        border-top-width: ${rowBorder ? '1px' : '0'};
      }
    `;
  },
);
export const THead = styled.thead<GenericStyles>(({ theme, ...properties }) => {
  return css`
    ${generateGenericStyles(theme, properties)};
  `;
});
export const TBody = styled.tbody<GenericStyles>(({ theme, ...properties }) => {
  return css`
    ${generateGenericStyles(theme, properties)};
  `;
});
export const TFoot = styled.tfoot<GenericStyles>(({ theme, ...properties }) => {
  return css`
    ${generateGenericStyles(theme, properties)}
  `;
});
export const Tr = styled.tr<GenericStyles & React.HTMLAttributes<HTMLTableRowElement>>(
  ({ theme, ...properties }) => {
    return css`
      ${generateGenericStyles(theme, properties)}
    `;
  },
);
export const Th = styled.th<GenericStyles & React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ theme, ...properties }) => {
    return css`
      border-bottom: 2px solid ${foregroundColor(theme)};
      ${generateGenericStyles(theme, properties)};
    `;
  },
);
export const Td = styled.td<GenericStyles & React.HTMLAttributes<HTMLTableCellElement>>(
  ({ theme, ...properties }) => {
    return css`
      ${generateGenericStyles(theme, properties)};
    `;
  },
);

export function Table({
  children,
  horizontalScrollable = false,
  grow = 1,
  ...props
}: PropsWithChildren<TableProps>) {
  return (
    <TableContainer horizontalScrollable={horizontalScrollable} grow={grow}>
      <TableContent {...props}>{children}</TableContent>
    </TableContainer>
  );
}
