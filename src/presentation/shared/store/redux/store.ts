import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Puedes agregar middlewares adicionales aquí si es necesario
});

export type AppDispatch = typeof store.dispatch;
