type ColorScheme = {
  primary: string;
  background: string;
  text: string;
  secondary: string;
  accent: string;
};

type FontScheme = {
  regular: string;
  bold: string;
};

type SpacingScheme = {
  small: number;
  medium: number;
  large: number;
};

export interface ITheme {
  colors: ColorScheme;
  fonts: FontScheme;
  spacing: SpacingScheme;
}
