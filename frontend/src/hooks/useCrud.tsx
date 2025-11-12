import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useErrorHandler } from "./useErrorHandler";

type ApiMethods<T, Q> = {
  index?: (query?: Q) => Promise<T[]>;
  create?: (data: Partial<T>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
  view?: (id: string) => Promise<T>;
};

export function useCrud<T, Q = any>(api: ApiMethods<T, Q>) {
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

  const fetchData = useCallback(
    async (query?: Q): Promise<T[]> => {
      if (!api.index) return [];
      try {
        setLoading(true);
        const result = await api.index(query);
        setData(result);
        return result;
      } catch (err: any) {
        handleError(err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
  );

  const create = useCallback(
    async (item: Partial<T>) => {
      if (!api.create) return;
      try {
        setLoading(true);
        const newItem = await api.create(item);
        setData((prev) => [...prev, newItem]);
        toast.success("登録が完了しました！✅");
        return newItem;
      } catch (err: any) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [api, handleError]
  );

  const update = useCallback(
    async (
      id: string,
      updateData: Partial<T>,
      keyField: keyof T = "id" as keyof T
    ) => {
      if (!api.update) return;
      try {
        setLoading(true);
        const updated = await api.update(id, updateData);
        setData((prev) =>
          prev.map((item: any) =>
            String(item[keyField]) === id ? updated : item
          )
        );
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
    async (id: string, keyField: keyof T = "id" as keyof T) => {
      if (!api.delete) return;
      try {
        setLoading(true);
        await api.delete(id);
        setData((prev) => prev.filter((item) => String(item[keyField]) !== id));
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
    fetchData,
    create,
    update,
    remove,
    view,
  };
}
