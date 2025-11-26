import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useErrorHandler } from './useErrorHandler';
import { useLoadingCounter } from './useLoading';
import type { ApiResponse } from '@/interface/apiResponse';

type ApiMethods<T, Q> = {
  index?: () => Promise<ApiResponse<T[]>>;
  search?: (query: Partial<Q>) => Promise<ApiResponse<T[]>>;
  create?: (data: T) => Promise<ApiResponse<T>>;
  update?: (id: string, data: T) => Promise<ApiResponse<T>>;
  delete?: (id: string) => Promise<ApiResponse<void>>;
  view?: (id: string) => Promise<ApiResponse<T>>;
};

export function useCrud<T, Q = unknown>(api: ApiMethods<T, Q>) {
  const [data, setData] = useState<T[]>([]);
  const { loading, start, end } = useLoadingCounter();
  const handleError = useErrorHandler();

  // -----------------------------
  // index
  // -----------------------------
  const fetchAll = useCallback(async (): Promise<void> => {
    if (!api.index) return;
    start();
    try {
      const response = await api.index();
      if (response.data) setData(response.data);
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      end();
    }
  }, [api, handleError]);

  // -----------------------------
  // search
  // -----------------------------
  const fetchData = useCallback(
    async (query: Partial<Q>): Promise<void> => {
      if (!api.search) return;
      start();
      try {
        const response = await api.search(query);
        if (response.data) setData(response.data);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [api, handleError],
  );

  // -----------------------------
  // create
  // -----------------------------
  const create = useCallback(
    async (item: T): Promise<void> => {
      if (!api.create) return;
      start();
      try {
        const response = await api.create(item);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [api, handleError],
  );

  // -----------------------------
  // update
  // -----------------------------
  const update = useCallback(
    async (id: string, updateData: T): Promise<void> => {
      if (!api.update) return;
      start();
      try {
        const response = await api.update(id, updateData);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [api, handleError],
  );

  // -----------------------------
  // delete
  // -----------------------------
  const remove = useCallback(
    async (id: string): Promise<void> => {
      if (!api.delete) return;
      start();
      try {
        const response = await api.delete(id);
        toast.success(response.message);
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [api, handleError],
  );

  // -----------------------------
  // view
  // -----------------------------
  const view = useCallback(
    async (id: string): Promise<T> => {
      if (!api.view) return Promise.reject();
      start();
      try {
        const response = await api.view(id);
        return response.data as T;
      } catch (err: any) {
        handleError(err);
        throw err;
      } finally {
        end();
      }
    },
    [api, handleError],
  );

  return {
    data,
    loading,
    fetchAll,
    fetchData,
    create,
    update,
    remove,
    view,
  };
}
