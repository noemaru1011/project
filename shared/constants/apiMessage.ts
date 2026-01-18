export const APIMESSAGE = {
  FETCH_SUCCESS: "取得成功。",
  CREATE_SUCCESS: "追加完了。",
  UPDATE_SUCCESS: "更新完了。",
  DELETE_SUCCESS: "削除完了。",
  LOGIN_SUCCESS: "ログインが成功しました。",
  LOGOUT_SUCCESS: "ログアウトしました。",
  //以下エラーメッセージ
  RESOURCE_NOT_FOUND: "指定されたリソースは存在しないか、無効です。",
  FOREIGNKEY_COSTRAINT: "予期せぬデータが入力(選択)されました。",
  INVALID_DATETIME: "日時の形式が正しくありません。",
  VALIDATE_ERROR: "入力エラー",
  INVALID_CREDENTIALS: "メールアドレスかパスワードが違います。",
  NOT_MACTH_PASSWORD: "古いメールアドレスが違います。",
  EMAIL_DUPLICATE: "このメールアドレスはすでに登録されています。",
  STATUS_DUPLICATE: "{details}はすでに有効なステータスがあります",
  FORBIDDEN: "権限がありません。",
  TOKEN_ERROR: "ログインしてください。",
  OPTIMISTIC_LOCK:
    "他のユーザーによって更新されています。再読み込みしてください",
  INTERNAL_SERVER_ERROR: "予期せぬエラーが発生しました。",
  CSRF_INVALID: "CSRFトークンが異なります。",
} as const;

export type ApiMessageCode = keyof typeof APIMESSAGE;
export type ApiMessage = (typeof APIMESSAGE)[ApiMessageCode];
