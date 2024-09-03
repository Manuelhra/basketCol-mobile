import { ITheme } from '../../../../config/theme/ITheme';

export type ThemeMode = 'light' | 'dark';

export interface IThemeInitialState {
  mode: ThemeMode;
  theme: ITheme;
}
