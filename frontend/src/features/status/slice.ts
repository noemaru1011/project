import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { statusApi } from '@/features/status';
import type { Status } from '@shared/models/master';

//Redux Action
export const fetchStatuses = createAsyncThunk('statuses/fetchAll', async () => {
  const res = await statusApi.index();
  return res;
});

//stateを定義
type StatusState = {
  data: Status[];
  loading: boolean;
};

//初期state
const initialState: StatusState = {
  data: [],
  loading: false,
};

export const statusSlice = createSlice({
  name: 'statuses',
  initialState,
  //stateは変更しないので空
  reducers: {},
  extraReducers: (builder) => {
    builder
      //pending取得中
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
      })
      //fulfilled取得成功
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
      })
      //rejected取得失敗
      .addCase(fetchStatuses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default statusSlice.reducer;
