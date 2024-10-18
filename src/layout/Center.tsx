import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Center = styled.div(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
  `,
);
