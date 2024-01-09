import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import searchSlice from './features/searchSlice';
export const store = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      search: searchSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
