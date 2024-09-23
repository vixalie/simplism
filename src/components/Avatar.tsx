import { flex } from '@/style-predefines';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { __, always, cond, defaultTo, includes, T } from 'ramda';
import { PropsWithChildren } from 'react';

interface AvatarProps {
  /**
   * Avatar size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /**
   * Show square avatar
   */
  square?: boolean;
  /**
   * Background color
   */
  bgColor?: string;
}

const AvatarContainer = styled('div')<AvatarProps>(({ theme, size, square, bgColor }) => {
  const radiusSize = cond([
    [includes(__, ['xs', 'sm', 'md']), always('xxs')],
    [T, always('xs')],
  ])(size);
  return css`
    height: ${theme.spacings[size]};
    width: ${theme.spacings[size]};
    border-radius: ${theme.radius[square ? 'none' : radiusSize]};
    overflow: hidden;
    background-color: ${defaultTo(theme.colors.gray[5], bgColor)};
    ${flex(theme, 'row', 'center', 'center')}
    .child {
      overflow: hidden;
    }
  `;
});

export function Avatar({
  size = 'md',
  square = false,
  bgColor,
  children,
}: PropsWithChildren<AvatarProps>) {
  return (
    <AvatarContainer size={size} square={square} bgColor={bgColor}>
      <div className="child">{children}</div>
    </AvatarContainer>
  );
}
