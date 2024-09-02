import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
