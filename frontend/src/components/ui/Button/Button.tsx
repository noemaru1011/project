import clsx from 'clsx';
import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariant.New';

type BaseProps = {
  variant: ButtonVariant;
  label: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  // 予期せぬ submit を防ぐため必須
  type: 'button' | 'submit' | 'reset';
  className?: string;
};

// label を直接表示する通常ボタン
type LabelButtonProps = BaseProps & {
  label: React.ReactNode;
  ariaLabel?: string; // 文字列ラベルも追加できる
};

// アイコン専用ボタン
type OtherButtonProps = BaseProps & {
  label?: never; // 子要素はない
  children: React.ReactNode; // アイコン等
  ariaLabel: string; // これ必須
};

export type Props = LabelButtonProps | OtherButtonProps;

export const Button = ({
  variant,
  label,
  disabled,
  onClick,
  type = 'button',
  className,
}: Props) => {
  const bg = VARIANT_STYLES[variant] ?? '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={typeof label === 'string' ? label : undefined}
      className={clsx(
        bg,
        'px-3 py-1 rounded-lg text-white font-semibold cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
    >
      {label}
    </button>
  );
};
