import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Space = styled.div(
  () => css`
    flex-grow: 1;
    flex-shrink: 1;
    align-self: stretch;
  `,
);
