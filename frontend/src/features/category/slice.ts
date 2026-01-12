import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '@/features/category';
import type { Category } from '@shared/models/master';

//Redux Action
export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
  const res = await categoryApi.index();
  return res;
});

//stateを定義
type CategoryState = {
  data: Category[];
  loading: boolean;
};

//初期state
const initialState: CategoryState = {
  data: [],
  loading: false,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  //stateは変更しないので空
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending取得中
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      //fulfilled取得成功
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      //rejected取得失敗
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
