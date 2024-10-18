import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useMemo } from 'react';

interface LevelBarProps {
  height: number;
  value: number;
  max: number;
}

const Background = styled.div<LevelBarProps>(
  ({ theme, height }) => css`
    width: 100%;
    height: ${height}px;
    background-color: ${theme.colors.gray[7]};
    border-radius: ${theme.radius.xs}px;
    overflow: hidden;
    position: relative;
  `,
);
const Fill = styled.div<LevelBarProps>(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      ${theme.colors.blue[7]} 0%,
      ${theme.colors.green[7]} 40%,
      ${theme.colors.yellow[7]} 65%,
      ${theme.colors.orange[7]} 80%,
      ${theme.colors.red[7]} 100%
    );
  `,
);
const Mask = styled.div<LevelBarProps>(
  () => css`
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: inherit;
    transition: width 0.3s ease;
  `,
);

export function LevelBar({ height = 10, value = 0, max = 100 }: LevelBarProps) {
  const width = useMemo(() => 100 - (value / max) * 100, [value, max]);
  return (
    <Background height={height}>
      <Fill />
      <Mask style={{ width: `${width}%` }} />
    </Background>
  );
}
