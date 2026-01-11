import { describe, it, expect, vi } from 'vitest';
import minorCategoryReducer, { fetchMinorCategories } from './slice';

vi.mock('@/features/minorCategory', () => ({
  minorCategoryApi: {
    index: vi.fn(),
  },
}));

describe('minorCategorySlice', () => {
  const initialState = {
    data: [],
    loading: false,
  };

  it('初期状態を返すこと', () => {
    expect(minorCategoryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchMinorCategories.pending アクションで loading が true になること', () => {
    const action = { type: fetchMinorCategories.pending.type };
    const state = minorCategoryReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchMinorCategories.fulfilled アクションで data が更新され loading が false になること', () => {
    const mockData = [{ minorCategoryId: 1, minorCategoryName: '111小隊' }];
    const action = {
      type: fetchMinorCategories.fulfilled.type,
      payload: { data: mockData },
    };
    const state = minorCategoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('fetchMinorCategories.rejected アクションで loading が false になること', () => {
    const action = { type: fetchMinorCategories.rejected.type };
    const state = minorCategoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
  });
});
