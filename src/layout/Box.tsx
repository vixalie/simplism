import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { generateGenericStyles, GenericStyles } from '../generics';

export const Box = styled.div<GenericStyles>(
  ({ theme, ...properties }) => css`
    ${generateGenericStyles(theme, properties)};
  `,
);
