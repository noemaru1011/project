import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/routes";

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
  const navigate = useNavigate();

  /**
   * ✅ 共通エラーハンドリング
   * - toast 表示
   * - エラーコード / ステータスに応じた遷移
   */
  const handleError = useCallback((err: any) => {
    const status = err?.status;
    const code = err?.code;
    const message = err?.message ?? "予期せぬエラーが発生しました";

    // ---- 認証系（401） ----
    if (status === 401) {
      switch (code) {
        case "INVALID_CREDENTIALS":
          toast.error(message || "メールアドレスかパスワードが違います");
          return;

        case "TOKEN_EXPIRED":
          navigate(ROUTES.Auth.LOGIN);
          toast.error(message || "ログインしてください");
          return;
        case "INVALID_TOKEN":
          navigate(ROUTES.Auth.LOGIN);
          toast.error(message || "無効なトークンです");
          return;

        default:
          navigate(ROUTES.Auth.LOGIN);
          toast.error(message || "予期せぬエラーが発生しました");
          return;
      }
    }

    // ---- 権限なし（403） ----
    if (status === 403) {
      navigate(ROUTES.Error.FORBIDDEN);
      toast.error(message || "権限がありません");
      return;
    }

    // ---- サーバーエラー（500〜） ----
    if (status >= 500) {
      toast.error("サーバーエラーが発生しました");
      navigate(ROUTES.Error.SERVER);
      return;
    }

    // ---- その他 ----
    toast.error(message);
  }, []);

  // ✅ 一覧取得
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

  // ✅ 検索
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

  // ✅ 登録
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

  // ✅ 更新
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

  // ✅ 削除
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

  // ✅ 詳細取得
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
