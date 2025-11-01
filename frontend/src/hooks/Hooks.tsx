import { useEffect, useState } from "react";

type ApiMethods<T, Q> = {
  index?: (query?: Q) => Promise<T[]>;
  create?: (data: Partial<T>) => Promise<T>;
  update?: (id: string, data: Partial<T>) => Promise<T>;
  delete?: (id: string) => Promise<void>;
};

export function Hooks<T, Q = any>(api: ApiMethods<T, Q>, autoFetch = true) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 一覧取得
  const fetchAll = async () => {
    if (!api.index) return;
    try {
      setLoading(true);
      const result = await api.index();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //検索
  const fetchData = async (query?: Q) => {
    if (!api.index) return;
    try {
      setLoading(true);
      const result = await api.index(query);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 登録
  const create = async (item: Partial<T>) => {
    if (!api.create) return;
    try {
      setLoading(true);
      const newItem = await api.create(item);
      setData((prev) => [...prev, newItem]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 更新
  const update = async (
    id: string,
    data: Partial<T>,
    keyField: keyof T = "id" as keyof T
  ) => {
    if (!api.update) return;
    try {
      setLoading(true);
      const updated = await api.update(id, data);
      setData((prev) =>
        prev.map((d: any) => (String(d[keyField]) === id ? updated : d))
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 削除
  const remove = async (id: string, keyField: keyof T = "id" as keyof T) => {
    if (!api.delete) return;
    try {
      setLoading(true);
      await api.delete(id);
      if (keyField) {
        setData((prev) => prev.filter((d) => String(d[keyField]) !== id));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchAll();
  }, []);

  return { data, loading, error, fetchAll, fetchData, create, update, remove };
}
