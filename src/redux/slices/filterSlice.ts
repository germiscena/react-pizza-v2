import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: number;
  currentPage: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: 0,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setTypeOfSort(state, action: PayloadAction<number>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setSearch, setCategoryId, setTypeOfSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export const filterSort = (state: RootState) => state.filter.sort;
export const filterSortCategory = (state: RootState) => state.filter.categoryId;
export const filterSortPage = (state: RootState) => state.filter.currentPage;
export const filterSortSearch = (state: RootState) => state.filter.searchValue;

export default filterSlice.reducer;
