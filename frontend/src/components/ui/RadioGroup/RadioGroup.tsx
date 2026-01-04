import { useCallback, useMemo } from 'react';
import type { Option } from '@/components/ui/option';
import { Radio } from '@/components/ui/Radio/Radio';
import clsx from 'clsx';

type Props = {
  name: string;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  column?: number;
  value?: string;
  onChange?: (value: string) => void;
};

export const RadioGroup = ({
  name,
  options,
  label,
  error,
  required,
  disabled,
  column,
  value = '',
  onChange,
}: Props) => {
  const handleChange = useCallback(
    (val: string) => {
      onChange?.(val);
    },
    [onChange],
  );

  /**
   * options を column 指定に基づいて 2D 配列へ変換
   * column 未指定時は縦一列
   */
  const grid = useMemo(() => {
    if (!column || column <= 0) {
      return options.map((option) => [option]);
    }

    const rows = Math.ceil(options.length / column);

    return Array.from({ length: rows }, (_, i) => options.slice(i * column, i * column + column));
  }, [options, column]);

  const errorId = error ? `${name}-error` : undefined;

  return (
    <fieldset
      className={clsx(
        'bg-white rounded-lg p-4 shadow-sm disabled:cursor-not-allowed',
        error
          ? 'border border-red-500 focus-within:ring-2 focus-within:ring-red-300'
          : 'border border-gray-200 focus-within:ring-2 focus-within:ring-blue-200',
      )}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={errorId}
      aria-required={required}
    >
      {label && (
        <legend className="font-semibold text-gray-800 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}

      <div className="flex flex-col space-y-3">
        {grid.map((rowOptions, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-6 flex-wrap">
            {rowOptions.map(
              (option) =>
                option.label && (
                  <Radio
                    key={option.value}
                    id={`${name}-${option.value}`}
                    name={name}
                    label={option.label}
                    checked={value === option.value}
                    onChange={() => handleChange(option.value)}
                    disabled={disabled}
                    className="flex items-center cursor-pointer select-none p-2 rounded-lg transition-colors hover:bg-gray-50"
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
