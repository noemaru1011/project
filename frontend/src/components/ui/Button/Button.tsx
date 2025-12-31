import { VARIANT_STYLES, type ButtonVariant } from './ButtonVariants';

type Props = {
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  // 予期せぬsubmitを防ぐため必須
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
      className={`${bg} ${className ?? ''} px-3 py-1 rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
};
