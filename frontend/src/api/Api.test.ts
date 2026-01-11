import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './Api';
import Cookies from 'js-cookie';

// js-cookie のモック
vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('api (汎用fetch関数)', () => {
  const API_BASE_URL = 'http://localhost:3000';

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.mocked(Cookies.get).mockReturnValue('mock-csrf-token');
  });

  it('成功時 (200 OK) に正しいレスポンスを返すこと', async () => {
    const mockData = { id: 1, name: 'test' };
    const mockResponse = {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ data: mockData, code: 'SUCCESS', message: 'OK' }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    const result = await api('/test-path');

    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/test-path`, expect.objectContaining({
      credentials: 'include',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'X-CSRF-Token': 'mock-csrf-token',
      }),
    }));
    expect(result).toEqual({
      status: 200,
      data: mockData,
      code: 'SUCCESS',
      message: 'OK',
    });
  });

  it('成功時 (204 No Content / 非JSON) でもエラーにならず空データを返すこと', async () => {
    const mockResponse = {
      ok: true,
      status: 204,
      headers: new Headers({ 'content-type': 'text/plain' }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    const result = await api('/empty-path');

    expect(result).toEqual({
      status: 204,
      data: undefined,
      code: undefined,
      message: undefined,
    });
  });

  it('HTTPエラー時 (400/401等) にエラーオブジェクトを throw すること', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ code: 'TOKEN_ERROR', message: 'Unauthorized' }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    await expect(api('/error-path')).rejects.toEqual({
      status: 401,
      code: 'TOKEN_ERROR',
      message: 'Unauthorized',
    });
  });

  it('ネットワークエラー時に status: 0 のオブジェクトを throw すること', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network Error'));

    await expect(api('/network-fail')).rejects.toEqual({
      status: 0,
      message: 'サーバーに接続できません。ネットワークをご確認ください。',
    });
  });

  it('カスタムオプションが正しくマージされること', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ data: {} }),
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    await api('/custom', {
      method: 'POST',
      headers: { 'X-Custom': 'value' },
      body: JSON.stringify({ key: 'val' }),
    });

    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'X-Custom': 'value',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ key: 'val' }),
    }));
  });
});

