import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  count: number;
  image: string;
  price: number;
  sizes: number[];
  title: string;
  types: number[];
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalPizzas: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalPizzas: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.title === action.payload.title);
      if (findItem) {
        findItem.count++;
      } else state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.totalPrice + action.payload.price;
      state.totalPizzas = state.totalPizzas + 1;
    },
    removeFromCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.title === action.payload.title);
      if (findItem) {
        findItem.count--;
        if (findItem.count < 1) {
          state.items = state.items.filter((obj) => obj.title !== findItem.title);
        }
        state.totalPizzas = state.totalPizzas - 1;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    removeThisPizza(state, action: PayloadAction<CartItem>) {
      const removeItem = state.items.find((obj) => obj.title === action.payload.title);
      if (removeItem) {
        state.totalPizzas = state.totalPizzas - removeItem.count;
        state.totalPrice = state.totalPrice - removeItem.price * removeItem.count;
        state.items = state.items.filter((obj) => obj.title !== action.payload.title);
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalPizzas = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const { addToCart, removeFromCart, clearItems, removeThisPizza } = cartSlice.actions;

export default cartSlice.reducer;
