export const apiMessage = {
  FETCH_SUCCESS: '取得成功',
  CREATE_SUCCESS: '追加完了',
  UPDATE_SUCCESS: '更新完了',
  DELETE_SUCCESS: '削除完了',
  LOGIN_SUCCESS: 'ログインが成功しました',
  LOGOUT_SUCCESS: 'ログアウトしました',
  NO_STUDENT: '学生が見つかりません',
  //以下エラーメッセージ
  INVALID_CREDENTIALS: 'メールアドレスかパスワードが違います',
  FORBIDDEN: '権限がありません',
  TOKEN_ERROR: 'ログインしてください',
} as const;
