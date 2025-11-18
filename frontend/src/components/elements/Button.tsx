import type { ButtonVariant } from '@/types/ui';

type Props = {
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const VARIANT_STYLES = {
  Create: { bg: 'bg-purple-400', label: '新規登録' },
  Read: { bg: 'bg-green-400', label: '参照' },
  Update: { bg: 'bg-yellow-400', label: '更新' },
  Delete: { bg: 'bg-red-400', label: '削除' },
  Search: { bg: 'bg-blue-400', label: '検索' },
  Login: { bg: 'bg-blue-400', label: 'ログイン' },
  Back: { bg: 'bg-blue-400', label: '一覧に戻る' },
} as const;

export const Button = ({ variant, disabled, onClick, type, className }: Props) => {
  const { bg, label } = VARIANT_STYLES[variant];

  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`${bg} ${className} px-3 py-1 rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
};
