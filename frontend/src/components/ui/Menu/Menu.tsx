import { MenuToggle } from '@/components/ui/Menu/MenuToggle';
import { MenuOverlay } from '@/components/ui/Menu/MenuOverlay';
import { MenuPanel } from '@/components/ui/Menu/MenuPanel';
import { MenuOptions } from '@/components/ui/option';

type Props = {
  open: boolean;
  onClick: () => void;
};

export const Menu = ({ open, onClick }: Props) => (
  <div className="relative">
    <MenuToggle open={open} onClick={onClick} />
    {open && (
      <>
        <MenuOverlay onClick={onClick} aria-expanded={open} aria-controls="menu-panel" />
        <MenuPanel options={MenuOptions} onClick={onClick} />
      </>
    )}
  </div>
);
