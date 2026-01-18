import { renderHook, waitFor } from '@testing-library/react';
import { useCategoryOptions } from './useCategoryOptions';
import { categoryApi } from '@/features/category';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';

// 1. APIのモック
vi.mock('@/features/category', () => ({
  categoryApi: {
    index: vi.fn(),
  },
  categoriesToOptions: (data: any[]) =>
    data.map((d) => ({ value: d.categoryId, label: d.categoryName })),
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

describe('useCategoryOptions', () => {
  it('データを取得し、正しくオプション形式に変換すること', async () => {
    const mockData = {
      data: [
        { categoryId: '1', categoryName: 'IT' },
        { categoryId: '2', categoryName: 'Sales' },
      ],
    };
    (categoryApi.index as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCategoryOptions(), {
      wrapper: createWrapper(),
    });

    // 初期状態はローディング中
    expect(result.current.loading).toBe(true);

    // 非同期処理の完了を待機
    await waitFor(() => expect(result.current.loading).toBe(false));

    // マッピングされた結果を確認
    expect(result.current.options).toEqual([
      { value: '1', label: 'IT' },
      { value: '2', label: 'Sales' },
    ]);
  });

  it('APIエラー時に空配列を返すこと', async () => {
    (categoryApi.index as any).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCategoryOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.options).toEqual([]);
  });
});
