import { describe, it, expect, vi } from 'vitest';
import departmentReducer, { fetchDepartments } from './slice';

vi.mock('@/features/department', () => ({
  departmentApi: {
    index: vi.fn(),
  },
}));

describe('departmentSlice', () => {
  const initialState = {
    data: [],
    loading: false,
  };

  it('初期状態を返すこと', () => {
    expect(departmentReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchDepartments.pending アクションで loading が true になること', () => {
    const action = { type: fetchDepartments.pending.type };
    const state = departmentReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchDepartments.fulfilled アクションで data が更新され loading が false になること', () => {
    const mockData = [{ departmentId: 1, departmentName: '経済学部' }];
    const action = {
      type: fetchDepartments.fulfilled.type,
      payload: { data: mockData },
    };
    const state = departmentReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('fetchDepartments.rejected アクションで loading が false になること', () => {
    const action = { type: fetchDepartments.rejected.type };
    const state = departmentReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
  });
});
