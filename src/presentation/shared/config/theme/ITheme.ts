type ColorScheme = {
  primary: string;
  tertiary: string;
  quaternary: string;
  background: string;
  backgroundSelected: string;
  text: string;
  secondary: string;
  accent: string;
  textSecondary: string;
  textDisabled: string;
  divider: string;
  success: string;
  error: string;
  warning: string;
};

type FontScheme = {
  regular: string;
  bold: string;
  heading: string;
};

type SpacingScheme = {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
};

type BorderRadius = {
  small: number;
  medium: number;
  large: number;
};

export interface ITheme {
  colors: ColorScheme;
  fonts: FontScheme;
  spacing: SpacingScheme;
  borderRadius: BorderRadius;
}
