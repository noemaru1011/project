import { Menu } from 'lucide-react';

type Props = {
  open: boolean;
  onClick: () => void;
};

export const MenuToggle = ({ open, onClick }: Props) => (
  <button
    onClick={onClick}
    aria-expanded={open} // boolean を渡す
    aria-controls="menu-panel" // MenuPanel の id を指定
    aria-label="管理メニューを開閉"
    className="cursor-pointer w-6 h-6"
  >
    <Menu className="w-6 h-6" />
  </button>
);
