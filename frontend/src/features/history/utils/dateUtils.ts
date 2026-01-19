/**
 * Dateオブジェクトを input type="datetime-local" 用の文字列フォーマットに変換する
 * @example 2026-01-19T13:00
 */
export const formatForDateTimeInput = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d}T${h}:${min}`;
};

/**
 * 文字列からDateオブジェクトを生成する。
 * 不正な文字列の場合はデフォルト時刻（13:00）を返す。
 */
export const getBaseDate = (currentStr: string): Date => {
  const d = new Date(currentStr);
  if (isNaN(d.getTime())) {
    const defaultDate = new Date();
    defaultDate.setHours(13, 0, 0, 0);
    return defaultDate;
  }
  return d;
};

/**
 * 前の判定時刻を計算する
 */
export const calculatePrevTime = (currentStr: string): string => {
  const d = getBaseDate(currentStr);
  const h = d.getHours();

  if (h > 13) {
    d.setHours(13, 0, 0, 0);
  } else if (h > 6) {
    d.setHours(6, 0, 0, 0);
  } else {
    d.setDate(d.getDate() - 1);
    d.setHours(22, 0, 0, 0);
  }
  return formatForDateTimeInput(d);
};

/**
 * 次の判定時刻を計算する
 */
export const calculateNextTime = (currentStr: string): string => {
  const d = getBaseDate(currentStr);
  const h = d.getHours();

  if (h < 6) {
    d.setHours(6, 0, 0, 0);
  } else if (h < 13) {
    d.setHours(13, 0, 0, 0);
  } else if (h < 22) {
    d.setHours(22, 0, 0, 0);
  } else {
    d.setDate(d.getDate() + 1);
    d.setHours(6, 0, 0, 0);
  }
  return formatForDateTimeInput(d);
};
