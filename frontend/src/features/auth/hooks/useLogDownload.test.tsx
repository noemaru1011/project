import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { useLogDownload } from './useLogDownload';
import { authApi } from '@/features/auth/api';

// 1. authApiをモック化する
vi.mock('@/features/auth/api', () => ({
  authApi: {
    logDownload: vi.fn(),
  },
}));

describe('useLogDownload', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    // 2. テストごとにクリーンなQueryClientを作成
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: { retry: false },
      },
    });
  });

  // 3. ここが wrapper の正体：Providerでフックを包むコンポーネント
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('ダウンロード成功時、Blobを返すこと', async () => {
    const mockBlob = new Blob(['test content'], { type: 'text/plain' });
    (authApi.logDownload as any).mockResolvedValue(mockBlob);

    // 4. 定義した wrapper を渡す
    const { result } = renderHook(() => useLogDownload(), { wrapper });

    const res = await result.current.logDownload();

    expect(res).toBeInstanceOf(Blob);
    expect(authApi.logDownload).toHaveBeenCalledTimes(1);
  });
});
