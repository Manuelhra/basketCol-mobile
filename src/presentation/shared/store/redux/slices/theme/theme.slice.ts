import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IThemeInitialState, ThemeMode } from './IThemeInitialState';

const initialState: IThemeInitialState = {
  mode: 'light',
  primaryColor: '#6200EE',
  secondaryColor: '#03DAC6',
};

const userSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const themeActions = userSlice.actions;
export const themeReducer = userSlice.reducer;
