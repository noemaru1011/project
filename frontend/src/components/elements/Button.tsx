import type { ButtonVariant } from "@/types/ui";

type Props = {
  variant: ButtonVariant;
  name?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const VARIANT_STYLES = {
  Create: { bg: "bg-purple-400", label: "新規登録" },
  Read: { bg: "bg-green-400", label: "参照" },
  Update: { bg: "bg-yellow-400", label: "更新" },
  Delete: { bg: "bg-red-400", label: "削除" },
  Search: { bg: "bg-blue-400", label: "検索" },
  Other: { bg: "bg-blue-400", label: "ボタン" },
} as const;

const Button = ({ variant, name, disabled, onClick, type }: Props) => {
  const { bg, label } = VARIANT_STYLES[variant];
  const text = variant === "Other" ? name ?? label : label;

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${bg} px-4 py-2 rounded-lg text-white font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
};

export default Button;
