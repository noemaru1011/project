import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { departmentApi } from '@/features/department';
import type { Department } from '@/features/department';

export const fetchDepartments = createAsyncThunk('departments/fetchAll', async () => {
  const res = await departmentApi.index();
  return res;
});

type DepartmentState = {
  data: Department[];
  loading: boolean;
};

const initialState: DepartmentState = {
  data: [],
  loading: false,
};

export const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default departmentSlice.reducer;
