import { renderHook, waitFor } from '@testing-library/react';
import { useStatusOptions } from './useStatusOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { statusApi } from '@/features/status';

// 1. APIのモック
vi.mock('@/features/status', () => ({
  statusApi: {
    index: vi.fn(),
  },
  statusesToOptions: (data: any[]) => data.map((d) => ({ value: d.statusId, label: d.statusName })),
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

describe('useStatusOptions', () => {
  it('データを取得し、正しくオプション形式に変換すること', async () => {
    const mockData = {
      data: [
        { statusId: '1', statusName: 'IT' },
        { statusId: '2', statusName: 'Sales' },
      ],
    };
    (statusApi.index as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useStatusOptions(), {
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
    (statusApi.index as any).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useStatusOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.options).toEqual([]);
  });
});
