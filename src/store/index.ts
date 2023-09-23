import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '@/store/layout.slice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
