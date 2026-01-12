import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { minorCategoryApi } from '@/features/minorCategory';
import type { MinorCategory } from '@shared/models/master';

//Redux Action
export const fetchMinorCategories = createAsyncThunk('minorCategories/fetchAll', async () => {
  const res = await minorCategoryApi.index();
  return res;
});

//stateを定義
type MinorCategoryState = {
  data: MinorCategory[];
  loading: boolean;
};

//初期state
const initialState: MinorCategoryState = {
  data: [],
  loading: false,
};

export const minorCategorySlice = createSlice({
  name: 'minorCategories',
  initialState,
  //stateは変更しないので空
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending取得中
      .addCase(fetchMinorCategories.pending, (state) => {
        state.loading = true;
      })
      //fulfilled取得成功
      .addCase(fetchMinorCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      //rejected取得失敗
      .addCase(fetchMinorCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default minorCategorySlice.reducer;
