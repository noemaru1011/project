import clsx from 'clsx';
import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariant';

type Props = {
  variant?: ButtonVariant;
  label?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  className?: string;
};
export const Button = ({
  variant,
  label,
  children,
  disabled,
  onClick,
  type = 'button',
  className,
  ariaLabel,
}: Props) => {
  const bg = variant ? (VARIANT_STYLES[variant]?.class ?? '') : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      className={clsx(
        bg,
        'px-3 py-1 rounded-lg font-semibold cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
    >
      {label ?? children}
    </button>
  );
};
