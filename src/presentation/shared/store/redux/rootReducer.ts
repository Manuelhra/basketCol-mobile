import { combineReducers } from '@reduxjs/toolkit';

import { themeReducer } from './slices/theme/theme.slice';

export const rootReducer = combineReducers({
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
