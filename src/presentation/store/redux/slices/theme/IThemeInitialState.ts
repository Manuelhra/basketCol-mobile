export type ThemeMode = 'light' | 'dark';

export interface IThemeInitialState {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
}
