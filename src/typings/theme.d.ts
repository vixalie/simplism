import '@emotion/react';

declare module '@emotion/react' {
  export type ColorName =
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange';
  export type ColorScheme = 'light' | 'dark';
  export type MeasureUnit = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  export type FontSizeUnit =
    | 'fp'
    | 'fps'
    | 'f1'
    | 'f1s'
    | 'f2'
    | 'f2s'
    | 'f3'
    | 'f3s'
    | 'f4'
    | 'f4s'
    | 'f5'
    | 'f5s'
    | 'f6'
    | 'f6s'
    | 'f7'
    | 'f7s';
  export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  export type ColorPalette = Array<string>;
  export type Elevation = {
    offset: {
      width: number;
      height: number;
    };
    blur: number;
    opacity: number;
  };

  /**
   * Defined Theme properties.
   */
  export interface Theme {
    preferedColorScheme: ColorScheme;
    /**
     * Whether enable auto contrast for text color. Will search for the best contrast color in wcagSearchRange palette due to WCAG standard.
     */
    autoContrast: boolean;
    colors: Record<ColorName, ColorPalette>;
    wcagSearchRange: ColorPalette;
    black: string;
    white: string;
    /**
     * Default shade for the color palette. Tuple value is used for light scheme and dark scheme.
     */
    defaultShade: number | [number, number];
    primaryColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    secondaryColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    backgroundColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    foregroundColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    successColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    warnColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    dangerColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    infoColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    lineColor: string | ColorPalette | Record<ColorScheme, string | ColorPalette>;
    spacings: Record<MeasureUnit, number>;
    radius: Record<MeasureUnit, number>;
    fontSizes: Record<FontSizeUnit, number>;
    paragraphFontSize: number;
    titleFontSize: Record<TitleLevel, number>;
    elevations: Record<MeasureUnit, Elevation>;
    elevationColor: ColorPalette | Record<ColorScheme, string>;
  }
}
