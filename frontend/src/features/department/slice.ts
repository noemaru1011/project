import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { departmentApi } from '@/features/department';
import type { Department } from '@/features/department';

//Redux Action
export const fetchDepartments = createAsyncThunk('departments/fetchAll', async () => {
  const res = await departmentApi.index();
  return res;
});

//stateを定義
type DepartmentState = {
  data: Department[];
  loading: boolean;
};

//初期state
const initialState: DepartmentState = {
  data: [],
  loading: false,
};

export const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  //stateは変更しないので空
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending取得中
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      //fulfilled取得成功
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      //rejected取得失敗
      .addCase(fetchDepartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default departmentSlice.reducer;
