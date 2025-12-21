import { useCallback, useMemo } from 'react';
import type { Option } from '@/components/ui/option';
import { Checkbox } from '@/components/atoms/Checkbox';

export type Props = {
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
    const total = options.length;

    if (row && column) {
      // 両方指定 → 行列のサイズに収まる範囲で slice
      return Array.from({ length: row }, (_, r) => options.slice(r * column, r * column + column));
    }

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
    <fieldset
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      disabled={disabled}
    >
      {label && (
        <legend className="font-semibold text-gray-800 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </legend>
      )}

      <div className="flex flex-col space-y-3">
        {grid.map((rowOptions, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-6 whitespace-nowrap">
            {rowOptions.map(
              (option) =>
                option.label && (
                  <Checkbox
                    key={option.value}
                    id={`${name ?? 'checkbox'}-${option.value}`}
                    label={option.label}
                    checked={value.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                    disabled={disabled}
                  />
                ),
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </fieldset>
  );
};
