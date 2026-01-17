//DB更新時の判定
export const enum UpdateResult {
  NOT_FOUND = 1,
  OPTIMISTIC_LOCK = 2,
}
