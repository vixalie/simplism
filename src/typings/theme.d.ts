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
    colors: Record<ColorName, ColorPalette>;
    black: string;
    white: string;
    primaryColor: Record<ColorScheme, ColorPalette>;
    secondaryColor: Record<ColorScheme, ColorPalette>;
    backgroundColor: Record<ColorScheme, string>;
    foregroundColor: Record<ColorScheme, string>;
    successColor: Record<ColorScheme, string>;
    warnColor: Record<ColorScheme, string>;
    dangerColor: Record<ColorScheme, string>;
    infoColor: Record<ColorScheme, string>;
    spacings: Record<MeasureUnit, number>;
    radius: Record<MeasureUnit, number>;
    fontSizes: Record<FontSizeUnit, number>;
    paragraphFontSize: number;
    titleFontSize: Record<TitleLevel, number>;
    elevations: Record<MeasureUnit, Elevation>;
    elevationColor: Record<ColorScheme, string>;
  }
}
