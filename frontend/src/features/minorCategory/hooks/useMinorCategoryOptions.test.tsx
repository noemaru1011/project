import { renderHook, waitFor } from '@testing-library/react';
import { useMinorCategoryOptions } from './useMinorCategoryOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { minorCategoryApi } from '@/features/minorCategory';

// 1. APIのモック
vi.mock('@/features/minorCategory', () => ({
  minorCategoryApi: {
    index: vi.fn(),
  },
  minorCategoriesToOptions: (data: any[]) =>
    data.map((d) => ({ value: d.minorCategoryId, label: d.minorCategoryName })),
}));

// 2. テスト用のラッパー作成
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMinorCategoryOptions', () => {
  it('データを取得し、正しくオプション形式に変換すること', async () => {
    const mockData = {
      data: [
        { minorCategoryId: '1', minorCategoryName: 'IT' },
        { minorCategoryId: '2', minorCategoryName: 'Sales' },
      ],
    };
    (minorCategoryApi.index as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useMinorCategoryOptions(), {
      wrapper: createWrapper(),
    });

    // 初期状態はローディング中
    expect(result.current.isLoading).toBe(true);

    // 非同期処理の完了を待機
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // マッピングされた結果を確認
    expect(result.current.options).toEqual([
      { value: '1', label: 'IT' },
      { value: '2', label: 'Sales' },
    ]);
  });

  it('APIエラー時に空配列を返すこと', async () => {
    (minorCategoryApi.index as any).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useMinorCategoryOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.options).toEqual([]);
  });
});
