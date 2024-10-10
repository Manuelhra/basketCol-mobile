import { combineReducers } from '@reduxjs/toolkit';

import { themeReducer } from './slices/theme/theme.slice';
import { authenticationReducer } from '../../../authentication/store/redux/slices/authentication.slice';

export const rootReducer = combineReducers({
  theme: themeReducer,
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
