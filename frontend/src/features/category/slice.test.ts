import { describe, it, expect, vi } from 'vitest';
import categoryReducer, { fetchCategories } from './slice';

vi.mock('@/features/category', () => ({
  categoryApi: {
    index: vi.fn(),
  },
}));

describe('categorySlice', () => {
  const initialState = {
    data: [],
    loading: false,
  };

  it('初期状態を返すこと', () => {
    expect(categoryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchCategories.pending アクションで loading が true になること', () => {
    const action = { type: fetchCategories.pending.type };
    const state = categoryReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchCategories.fulfilled アクションで data が更新され loading が false になること', () => {
    const mockData = [{ categoryId: 1, categoryName: '1大隊' }];
    const action = {
      type: fetchCategories.fulfilled.type,
      payload: { data: mockData },
    };
    const state = categoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('fetchCategories.rejected アクションで loading が false になること', () => {
    const action = { type: fetchCategories.rejected.type };
    const state = categoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
  });
});
