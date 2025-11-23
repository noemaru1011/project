import type { Option } from '@/types/ui';
import { ROUTES } from '@/constants/routes';
import Menu from './Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '@/hooks/useLogout';

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: 'メインページへ' },
  { value: ROUTES.HISTORY.INDEX, label: '事故一覧' },
  { value: ROUTES.STUDENT.CHANGE, label: 'パスワード変更' },
  { value: 'LOGOUT', label: 'ログアウト' },
];

const Header = () => {
  const { logout, loading } = useLogout();
  const main = HeaderOptions[0];
  const navOptions = HeaderOptions.slice(1);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
  };

  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        {/* メインページ */}
        <Link to={main.value} className="font-bold mb-2 sm:mb-0">
          {main.label}
        </Link>

        <div className="flex flex-col sm:flex-row items-center">
          <nav className="flex flex-col sm:flex-row">
            {navOptions.map((opt, index) =>
              opt.value === 'LOGOUT' ? (
                <button
                  key={opt.value}
                  onClick={handleLogout}
                  className={`font-bold mb-2 sm:mb-0 ${
                    index < navOptions.length - 1 ? 'sm:mr-5' : ''
                  }`}
                  disabled={loading}
                >
                  {opt.label}
                </button>
              ) : (
                <Link
                  key={opt.value}
                  to={opt.value}
                  className={`font-bold mb-2 sm:mb-0 ${
                    index < navOptions.length - 1 ? 'sm:mr-5' : ''
                  }`}
                >
                  {opt.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ml-5 mt-2 sm:mt-0">
            <Menu open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
