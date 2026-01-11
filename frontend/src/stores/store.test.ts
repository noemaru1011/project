import { describe, it, expect } from 'vitest';
import { store } from './store';

describe('store', () => {
  it('初期状態が正しく設定されていること', () => {
    const state = store.getState();
    expect(state).toHaveProperty('departments');
    expect(state).toHaveProperty('categories');
    expect(state).toHaveProperty('subCategories');
    expect(state).toHaveProperty('minorCategories');
    expect(state).toHaveProperty('statuses');
  });

  it('各スライスが正しい初期状態を持っていること', () => {
    const state = store.getState();
    expect(state.departments.data).toEqual([]);
    expect(state.departments.loading).toBe(false);
    expect(state.categories.data).toEqual([]);
    expect(state.categories.loading).toBe(false);
  });
});

