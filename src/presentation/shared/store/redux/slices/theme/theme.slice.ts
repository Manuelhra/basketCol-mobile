import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { lightTheme } from '../../../../config/theme';
import { ITheme } from '../../../../config/theme/ITheme';

export type ThemeMode = 'light' | 'dark';

export interface IThemeInitialState {
  themeMode: ThemeMode;
  theme: ITheme;
}

const initialState: IThemeInitialState = {
  themeMode: 'light',
  theme: lightTheme,
};

const userSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setTheme: (state, action: PayloadAction<ITheme>) => {
      state.theme = action.payload;
    },
  },
});

export const themeActions = userSlice.actions;
export const themeReducer = userSlice.reducer;
