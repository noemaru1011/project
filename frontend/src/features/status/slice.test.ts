import { describe, it, expect, vi } from 'vitest';
import statusReducer, { fetchStatuses } from './slice';

vi.mock('@/features/status', () => ({
  statusApi: {
    index: vi.fn(),
  },
}));

describe('statusSlice', () => {
  const initialState = {
    data: [],
    loading: false,
  };

  it('初期状態を返すこと', () => {
    expect(statusReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchStatuses.pending アクションで loading が true になること', () => {
    const action = { type: fetchStatuses.pending.type };
    const state = statusReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchStatuses.fulfilled アクションで data が更新され loading が false になること', () => {
    const mockData = [{ statusId: 1, statusName: '休務' }];
    const action = {
      type: fetchStatuses.fulfilled.type,
      payload: { data: mockData },
    };
    const state = statusReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('fetchStatuses.rejected アクションで loading が false になること', () => {
    const action = { type: fetchStatuses.rejected.type };
    const state = statusReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
  });
});
