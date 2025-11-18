import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useErrorHandler } from './useErrorHandler';
import type { ApiResponse } from '@/types/apiResponse';

type ApiMethods<T> = {
  index?: () => Promise<ApiResponse<T[]>>;
  create?: (data: Partial<T>) => Promise<ApiResponse<T>>;
  update?: (id: string, data: Partial<T>) => Promise<ApiResponse<T>>;
  delete?: (id: string) => Promise<ApiResponse<void>>;
  view?: (id: string) => Promise<ApiResponse<T>>;
};

export function useCrud<T>(api: ApiMethods<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const fetchAll = useCallback(async () => {
    if (!api.index) return;
    try {
      setLoading(true);
      const response = await api.index();
      if (response.data) setData(response.data);
    } catch (err: any) {
      handleError(err);
      throw err; // ← ここで再スローする
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  const create = useCallback(
    async (item: Partial<T>): Promise<void> => {
      if (!api.create) return;
      try {
        setLoading(true);
        const response = await api.create(item);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [api, handleError],
  );

  const update = useCallback(
    async (id: string, updateData: Partial<T>) => {
      if (!api.update) return;
      try {
        setLoading(true);
        const response = await api.update(id, updateData);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err; // ← ここで再スローする
      } finally {
        setLoading(false);
      }
    },
    [api, handleError],
  );

  const remove = useCallback(
    async (id: string) => {
      if (!api.delete) return;
      try {
        setLoading(true);
        const response = await api.delete(id);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err; // ← ここで再スローする
      } finally {
        setLoading(false);
      }
    },
    [api, handleError],
  );

  const view = useCallback(
    async (id: string): Promise<T | undefined> => {
      if (!api.view) return;
      try {
        setLoading(true);
        const result = await api.view(id);
        return result.data;
      } catch (err: any) {
        handleError(err);
        throw err; // ← ここで再スローする
      } finally {
        setLoading(false);
      }
    },
    [api, handleError],
  );

  return {
    data,
    loading,
    fetchAll,
    create,
    update,
    remove,
    view,
  };
}
