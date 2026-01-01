import { Link } from 'react-router-dom';
import type { HeaderOption } from '@/components/ui/option';
import { ROUTES } from '@/constants/routes';
import { AlertCircle } from 'lucide-react';

type Props = {
  options: HeaderOption[];
  onLogout: () => void;
  loading?: boolean;
  passwordUpdateRequired?: boolean;
};

export const HeaderNav = ({ options, onLogout, loading, passwordUpdateRequired }: Props) => (
  <nav aria-label="メインナビゲーション">
    <ul className="flex flex-col sm:flex-row">
      {options.map((opt, index) => {
        const spacing = index < options.length - 1 ? 'sm:mr-5' : '';

        return (
          <li key={opt.label}>
            {opt.kind === 'action' ? (
              <button
                onClick={onLogout}
                disabled={loading}
                aria-busy={loading}
                className={`font-bold mb-2 sm:mb-0 cursor-pointer text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors ${spacing}`}
              >
                {opt.label}
              </button>
            ) : (
              <Link
                to={opt.to}
                className={`font-bold mb-2 sm:mb-0 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors ${spacing}`}
              >
                {opt.label}
                {opt.to === ROUTES.STUDENT.CHANGE && passwordUpdateRequired && (
                  <AlertCircle
                    aria-label="パスワード変更が推奨されています"
                    role="img"
                    className="inline-block ml-1 text-red-500"
                    size={16}
                  />
                )}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </nav>
);
