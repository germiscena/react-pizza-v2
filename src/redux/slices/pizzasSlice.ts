import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type FetchPizzasArgs = {
  currentPage: number;
  categoryId: number;
  sortingType: {
    name: string;
    prop: string;
  }[];
  sortType: number;
};

type PizzaItem = {
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  id: number;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { currentPage, categoryId, sortingType, sortType } = params;
    console.log('PARAMS', params);
    const res = await axios.get(
      `https://62cd5e85a43bf7800856f862.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? 'category=' + categoryId : ''
      }&sortBy=${sortingType[sortType].name}&order=${sortingType[sortType].prop}`,
    );
    return res.data as PizzaItem[];
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;
export const pizzaState = (state: RootState) => state.pizza;

export default pizzasSlice.reducer;
