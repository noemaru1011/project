import type { ButtonVariant } from '@/interface/ui';

type Props = {
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const VARIANT_STYLES = {
  Create: { bg: 'bg-blue-500', label: '新規登録' },
  Read: { bg: 'bg-gray-500', label: '参照' },
  Update: { bg: 'bg-green-600', label: '更新' },
  Delete: { bg: 'bg-red-500', label: '削除' },
  Search: { bg: 'bg-blue-400', label: '検索' },
  Login: { bg: 'bg-blue-600', label: 'ログイン' },
  Back: { bg: 'bg-gray-500', label: '一覧に戻る' },
  Home: { bg: 'bg-gray-500', label: 'ホームに戻る' },
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
