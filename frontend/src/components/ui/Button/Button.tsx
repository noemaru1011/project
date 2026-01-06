import clsx from 'clsx';
import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariants';

type Props = {
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  // 予期せぬ submit を防ぐため必須
  type: 'button' | 'submit' | 'reset';
  className?: string;
};

export const Button = ({ variant, disabled, onClick, type = 'button', className }: Props) => {
  const { bg, label } = VARIANT_STYLES[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
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
