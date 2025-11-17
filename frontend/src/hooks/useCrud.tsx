import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useErrorHandler } from "./useErrorHandler";

type ApiMethods<T> = {
  index?: () => Promise<T[]>;
  create?: (data: Partial<T>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
  view?: (id: string) => Promise<T>;
};

export function useCrud<T>(api: ApiMethods<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const handleError = useErrorHandler();

  const fetchAll = useCallback(async () => {
    if (!api.index) return;
    try {
      setLoading(true);
      const result = await api.index();
      setData(result);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [api, handleError]);

  const create = useCallback(
    async (item: Partial<T>) => {
      if (!api.create) return;
      try {
        setLoading(true);
        await api.create(item);
        toast.success("登録が完了しました！✅");
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
  );

  const update = useCallback(
    async (id: string, updateData: Partial<T>) => {
      if (!api.update) return;
      try {
        setLoading(true);
        await api.update(id, updateData);
        toast.success("更新しました！✏️");
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
  );

  const remove = useCallback(
    async (id: string) => {
      if (!api.delete) return;
      try {
        setLoading(true);
        await api.delete(id);
        toast.success("削除しました🗑️");
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
  );

  const view = useCallback(
    async (id: string): Promise<T | undefined> => {
      if (!api.view) return;
      try {
        setLoading(true);
        const result = await api.view(id);
        return result;
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
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
