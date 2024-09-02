import { combineReducers } from '@reduxjs/toolkit';
import { themeReducer } from './slices/theme/theme.slice';

export const rootReducer = combineReducers({
  themeReducer,
});
