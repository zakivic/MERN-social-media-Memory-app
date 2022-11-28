import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from '../features/toggle/toggleSlice';
import authReducer from '../features/auth/authSlice';
import errorReducer from '../features/error/errorSlice'
import themeReducer from '../features/theme/themeSlice';
import pageReducer from '../features/page/pageSlice';
import commentsReducer from '../features/comments/commentsDrawerSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    toggleManager: toggleReducer,
    errorManager: errorReducer,
    theme: themeReducer,
    page: pageReducer,
    drawer: commentsReducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})