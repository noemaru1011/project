import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { HeaderMain } from '@/components/ui/Header/HeaderMain';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { Menu } from '@/components/ui/Menu/Menu';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { headerMain, headerOptions } from '@/components/ui/option';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils/handleApiError';
import { useLoginContext } from '@/hooks/passwordUpdateContext';
import { UiVisibility } from '@/hooks/uiVisibility';
import { useDarkMode } from '@/hooks/useDarkMode';

export const Header = () => {
  const navigate = useNavigate();
  const { logout, loading } = useLogout();
  const { passwordUpdateRequired } = useLoginContext();
  const [open, setOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      const error = handleApiError(err);
      toast.error(error.message);
      if (error.redirectTo) {
        navigate(error.redirectTo);
      }
    }
  };

  return (
    <header className="border-b dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <HeaderMain to={headerMain.to} label={headerMain.label} />

        <div className="flex flex-col sm:flex-row items-center">
          <HeaderNav
            options={headerOptions}
            onLogout={handleLogout}
            loading={loading}
            passwordUpdateRequired={passwordUpdateRequired}
          />

          <button
            onClick={toggleDarkMode}
            className="ml-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <UiVisibility allowedRoles={['ADMIN']}>
            <div id="admin-menu" className="ml-5 mt-2 sm:mt-0">
              <Menu
                aria-expanded={open}
                aria-haspopup="menu"
                aria-controls="admin-menu"
                open={open}
                onClick={() => setOpen(!open)}
              />
            </div>
          </UiVisibility>
        </div>
      </div>
    </header>
  );
};
