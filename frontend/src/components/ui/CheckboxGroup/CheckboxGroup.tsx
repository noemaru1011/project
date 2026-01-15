import { useMemo } from 'react';
import type { Option } from '@/components/ui/option';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import clsx from 'clsx';

type Props = {
  name: string;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
  value?: string[];
  className?: string;
  onChange?: (value: string[]) => void;
};

export const CheckboxGroup = ({
  name,
  options,
  label,
  error,
  required,
  disabled,
  column,
  value = [],
  className,
  onChange,
}: Props) => {
  /**
   * options を column 指定に基づいて 2D 配列へ変換
   * column 未指定時は [options] を返し、1行にすべて表示する（横一列）
   */
  const grid = useMemo(() => {
    if (!column || column <= 0) {
      // 変更点: 全てのoptionを1つの配列（1行）として返す
      return [options];
    }

    const rows = Math.ceil(options.length / column);

    return Array.from({ length: rows }, (_, i) => options.slice(i * column, i * column + column));
  }, [options, column]);

  const handleChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset
      className={clsx(
        'bg-white rounded-lg p-4 shadow-sm disabled:cursor-not-allowed',
        className,
        error
          ? 'border border-red-500 focus-within:ring-2 focus-within:ring-red-300'
          : 'border border-gray-200 focus-within:ring-2 focus-within:ring-blue-200',
      )}
      disabled={disabled}
      aria-invalid={!!error}
      aria-required={required}
      aria-describedby={errorId}
    >
      {label && (
        <legend className="font-semibold text-gray-800 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}

      <div className="flex flex-col space-y-3">
        {grid.map((rowOptions, rowIndex) => (
          <div
            key={rowIndex}
            // 変更点: 横一列になった際、要素が多いと画面からはみ出るため flex-wrap を追加して折り返し可能にすると安全です
            // 不要であれば flex-wrap は削除してください
            className="flex flex-row gap-6 flex-wrap"
          >
            {rowOptions.map(
              (option) =>
                option.label && (
                  <Checkbox
                    name={name}
                    checked={value.includes(option.value)}
                    onChange={(e) => handleChange(option.value, e.target.checked)}
                    key={option.value}
                    id={`${name}-${option.value}`}
                    label={option.label}
                    disabled={disabled}
                  />
                ),
            )}
          </div>
        ))}
      </div>
      {error && (
        <div id={errorId} role="alert" className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </fieldset>
  );
};
