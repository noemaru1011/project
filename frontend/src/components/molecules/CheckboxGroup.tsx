import { useCallback, useMemo } from 'react';
import type { Option } from '@/interface/ui';
import { Checkbox } from '@/components/atoms/Checkbox';

type Props = {
  name?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;

  row?: number; // 行数
  column?: number; // 列数
};

export const CheckboxGroup = ({
  name,
  value = [],
  onChange,
  options,
  label,
  error,
  required,
  disabled,
  row,
  column,
}: Props) => {
  const handleChange = useCallback(
    (val: string) => {
      const newValue = value.includes(val) ? value.filter((v) => v !== val) : [...value, val];
      onChange?.(newValue);
    },
    [value, onChange],
  );

  /**
   * options を row/column 指定に合わせて 2D 配列へ
   */
  const grid = useMemo(() => {
    // 両方指定されている場合：そのマトリクスサイズに合わせる
    if (row && column) {
      const matrixSize = row * column;

      // 数が足りなければ空データで埋める
      const filled = [...options];
      if (filled.length < matrixSize) {
        const diff = matrixSize - filled.length;
        for (let i = 0; i < diff; i++) {
          filled.push({ label: '', value: `__empty-${i}`, disabled: true } as any);
        }
      }

      const rows = [];
      for (let r = 0; r < row; r++) {
        rows.push(filled.slice(r * column, r * column + column));
      }
      return rows;
    }

    // 片方だけ指定 → 自動計算
    const total = options.length;

    if (column) {
      const rows = Math.ceil(total / column);
      return Array.from({ length: rows }, (_, i) => options.slice(i * column, i * column + column));
    }

    if (row) {
      const cols = Math.ceil(total / row);
      return Array.from({ length: row }, (_, i) => options.slice(i * cols, i * cols + cols));
    }

    // デフォルト：縦一列
    return [options];
  }, [options, row, column]);

  return (
    <fieldset className="border p-2 rounded" disabled={disabled}>
      {label && (
        <legend className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}

      <div className="flex flex-col space-y-2">
        {grid.map((rowOptions, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {rowOptions.map((option) =>
              option.label ? (
                <Checkbox
                  key={option.value}
                  id={`${name ?? 'checkbox'}-${option.value}`}
                  label={option.label}
                  checked={value.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                />
              ) : (
                // 空マス扱い（枠揃えのため）
                <div key={option.value} className="w-28" />
              ),
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </fieldset>
  );
};
