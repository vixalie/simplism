import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { equals } from 'ramda';
import { CSSProperties } from 'react';
import { generateGenericStyles, GenericStyles } from '../generics';
import { foregroundColor } from '../utils/utilities';

interface DividerProps extends GenericStyles {
  direction?: 'horizontal' | 'vertical';
  thick?: number;
  color?: string | CSSProperties['borderColor'];
  grow?: boolean;
}

export const Divider = styled.hr<DividerProps>(
  ({ theme, direction = 'horizontal', thick = 1, color, grow = true, ...properties }) => css`
    flex-grow: ${grow ? 1 : 0};
    border: none;
    border-color: ${color ?? foregroundColor(theme)};
    border-style: solid;
    border-top: 0;
    border-left: 0;
    border-bottom-width: ${equals('horizontal', direction) ? `${thick}px` : '0'};
    border-right: ${equals('vertical', direction) ? `${thick}px` : '0'};
    margin: 0;
    padding: 0;
    ${generateGenericStyles(theme, properties)};
  `,
);
