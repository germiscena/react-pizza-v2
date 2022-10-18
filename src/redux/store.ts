import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizza from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, cartSlice, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
