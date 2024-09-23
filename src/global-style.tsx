import {
  css,
  Global,
  SerializedStyles,
  Theme,
  ThemeProvider as ThemeContext,
  ThemeProviderProps as ThemeContextProps,
} from '@emotion/react';
import { defaultTo, is, mergeRight } from 'ramda';
import { useCallback, useMemo } from 'react';

const globalStyle = (theme: Theme, additionalRootStyles?: SerializedStyles) => css`
  :root {
    color-scheme: light dark;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 0.625;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    color: light-dark(${theme.foregroundColor.light}, ${theme.foregroundColor.dark});
    background-color: light-dark(${theme.backgroundColor.light}, ${theme.backgroundColor.dark});
    ${additionalRootStyles}
  }
  body {
    height: inherit;
    width: inherit;
    #root {
      height: inherit;
      width: inherit;
    }
  }
`;

interface ThemeProviderProps extends ThemeContextProps {
  /**
   * Additional theme to merge with the default theme.
   */
  additionalTheme?: Theme;
  /**
   * Additional styles to apply to the default root styles.
   */
  additionalRootStyles?: SerializedStyles;
}

/**
 * Provide theme and global styles to the application.
 */
export function ThemeProvider({
  theme,
  additionalTheme,
  additionalRootStyles,
  children,
}: ThemeProviderProps) {
  const assembledTheme = useMemo(
    () =>
      is(Function, theme)
        ? theme(defaultTo({}, additionalTheme))
        : mergeRight(theme, defaultTo({}, additionalTheme)),
    [theme, additionalTheme],
  );
  const globalStyles = useCallback(
    (theme: Theme) => globalStyle(theme, additionalRootStyles),
    [additionalRootStyles],
  );
  return (
    <ThemeContext theme={assembledTheme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeContext>
  );
}
