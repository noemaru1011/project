import { useState, useCallback } from "react";

type ApiMethods<T, Q> = {
  index?: (query?: Q) => Promise<T[]>;
  create?: (data: Partial<T>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
  view?: (id: string) => Promise<T>;
};

export function Hooks<T, Q = any>(api: ApiMethods<T, Q>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 一覧取得
  const fetchAll = useCallback(async () => {
    if (!api.index) return;
    try {
      setLoading(true);
      const result = await api.index();
      setError(null);
      setData(result);
    } catch (err: any) {
      setError(err.message ?? "予期せぬエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [api]);

  //検索
  const fetchData = useCallback(
    async (query?: Q): Promise<T[]> => {
      if (!api.index) return [];
      try {
        setLoading(true);
        const result = await api.index(query);
        setError(null);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err.message ?? "予期せぬエラーが発生しました");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // 登録
  const create = useCallback(
    async (item: Partial<T>) => {
      if (!api.create) return;
      try {
        setLoading(true);
        const newItem = await api.create(item);
        setError(null);
        setData((prev) => [...prev, newItem]);
      } catch (err: any) {
        setError(err.message ?? "予期せぬエラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // 更新
  const update = useCallback(
    async (
      id: string,
      data: Partial<T>,
      keyField: keyof T = "id" as keyof T
    ) => {
      if (!api.update) return;
      try {
        setLoading(true);
        const updated = await api.update(id, data);
        setError(null);
        setData((prev) =>
          prev.map((d: any) => (String(d[keyField]) === id ? updated : d))
        );
      } catch (err: any) {
        setError(err.message ?? "予期せぬエラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  // 削除
  const remove = useCallback(
    async (id: string, keyField: keyof T = "id" as keyof T) => {
      if (!api.delete) return;
      try {
        setLoading(true);
        await api.delete(id);
        if (keyField) {
          setData((prev) => prev.filter((d) => String(d[keyField]) !== id));
        }
        setError(null);
      } catch (err: any) {
        setError(err.message ?? "予期せぬエラーが発生しました");
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  const view = useCallback(
    async (id: string): Promise<T | undefined> => {
      if (!api.view) return undefined;
      try {
        setLoading(true);
        const result = await api.view(id);
        setError(null);
        return result;
      } catch (err: any) {
        setError(err.message ?? "予期せぬエラーが発生しました");
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  return {
    data,
    loading,
    error,
    fetchAll,
    fetchData,
    create,
    update,
    remove,
    view,
  };
}
