export const APIMESSAGE = {
  FETCH_SUCCESS: "取得成功",
  CREATE_SUCCESS: "追加完了",
  UPDATE_SUCCESS: "更新完了",
  DELETE_SUCCESS: "削除完了",
  LOGIN_SUCCESS: "ログインが成功しました",
  LOGOUT_SUCCESS: "ログアウトしました",
  //以下エラーメッセージ
  NO_STUDENT: "学生が見つかりません",
  NO_HISTORY: "履歴が見つかりません",
  VALIDATE_ERROR: "入力エラー",
  INVALID_CREDENTIALS: "メールアドレスかパスワードが違います",
  NOT_MACTH_PASSWORD: "古いメールアドレスが違います",
  EMAIL_DUPLICATE: "このメールアドレスはすでに登録されています",
  FORBIDDEN: "権限がありません",
  TOKEN_ERROR: "ログインしてください",
  CONFLICT: "他のユーザーによって更新されています,再読み込みしてください",
  INTERNAL_SERVER_ERROR: "予期せぬエラーが発生しました",
} as const;

export type ApiMessageKey = keyof typeof APIMESSAGE;
