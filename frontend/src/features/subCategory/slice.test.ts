import { describe, it, expect, vi } from 'vitest';
import subCategoryReducer, { fetchSubCategories } from './slice';
import { subCategoryApi } from '@/features/subCategory';

vi.mock('@/features/subCategory', () => ({
  subCategoryApi: {
    index: vi.fn(),
  },
}));

describe('subCategorySlice', () => {
  const initialState = {
    data: [],
    loading: false,
  };

  it('初期状態を返すこと', () => {
    expect(subCategoryReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchSubCategories.pending アクションで loading が true になること', () => {
    const action = { type: fetchSubCategories.pending.type };
    const state = subCategoryReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('fetchSubCategories.fulfilled アクションで data が更新され loading が false になること', () => {
    const mockData = [{ subCategoryId: 1, subCategoryName: '11中隊' }];
    const action = { 
      type: fetchSubCategories.fulfilled.type, 
      payload: { data: mockData } 
    };
    const state = subCategoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('fetchSubCategories.rejected アクションで loading が false になること', () => {
    const action = { type: fetchSubCategories.rejected.type };
    const state = subCategoryReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
  });
});

