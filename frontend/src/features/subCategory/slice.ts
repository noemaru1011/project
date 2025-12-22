import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subCategoryApi } from '@/features/subCategory';
import type { SubCategory } from '@/features/subCategory';

//Redux Action
export const fetchSubCategories = createAsyncThunk('subCategories/fetchAll', async () => {
  const res = await subCategoryApi.index();
  return res;
});

//stateを定義
type SubCategoryState = {
  data: SubCategory[];
  loading: boolean;
};

//初期state
const initialState: SubCategoryState = {
  data: [],
  loading: false,
};

export const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState,
  //stateは変更しないので空
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending取得中
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
      })
      //fulfilled取得成功
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      //rejected取得失敗
      .addCase(fetchSubCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default subCategorySlice.reducer;
