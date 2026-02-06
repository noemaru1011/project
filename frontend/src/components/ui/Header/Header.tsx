import { HeaderHome } from '@/components/ui/Header/HeaderHome';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { Menu } from '@/components/ui/Menu/Menu';
import { headerHome } from '@/components/ui/option';
import type { HeaderOption } from '../option';

type Props = {
  options: HeaderOption[];
  onLogout: () => void;
  loading: boolean;
  passwordUpdateRequired: boolean;
  isAdmin: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export const Header = ({
  options,
  onLogout,
  loading,
  passwordUpdateRequired,
  isAdmin,
  menuOpen,
  onToggleMenu,
}: Props) => {
  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <HeaderHome to={headerHome.to} label={headerHome.label} />

        <div className="flex flex-col sm:flex-row items-center">
          <HeaderNav
            options={options}
            onLogout={onLogout}
            loading={loading}
            passwordUpdateRequired={passwordUpdateRequired}
          />

          {isAdmin && (
            <div className="ml-5 mt-2 sm:mt-0">
              <Menu
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-controls="admin-menu"
                open={menuOpen}
                onClick={onToggleMenu}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
