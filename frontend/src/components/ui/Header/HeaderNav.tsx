import { Link } from 'react-router-dom';
import type { HeaderOption } from '@/components/ui/option';
import { ROUTES } from '@/routes/routes';
import { AlertCircle } from 'lucide-react';
import { UiVisibility } from '@/hooks/ui/uiVisibility';

type Props = {
  options: HeaderOption[];
  onLogout: () => void;
  onLogDownload: () => void;
  loading?: boolean;
  passwordUpdateRequired?: boolean;
};

export const HeaderNav = ({
  options,
  onLogout,
  onLogDownload,
  loading,
  passwordUpdateRequired,
}: Props) => {
  const actionHandlers: Record<string, () => void> = {
    logout: onLogout,
    logDownload: onLogDownload,
  };

  return (
    <nav aria-label="メインナビゲーション">
      <ul className="flex flex-col sm:flex-row">
        {options.map((opt, index) => {
          const spacing = index < options.length - 1 ? 'sm:mr-5' : '';

          return (
            <li key={opt.label}>
              {opt.kind === 'action' ? (
                opt.action === 'logDownload' ? (
                  <UiVisibility allowedRoles={['ADMIN']}>
                    <button
                      onClick={actionHandlers[opt.action]}
                      disabled={loading}
                      aria-busy={loading}
                      className={`font-bold mb-2 sm:mb-0 cursor-pointer ${spacing}`}
                    >
                      {opt.label}
                    </button>
                  </UiVisibility>
                ) : (
                  <button
                    onClick={actionHandlers[opt.action]}
                    disabled={loading}
                    aria-busy={loading}
                    className={`font-bold mb-2 sm:mb-0 cursor-pointer ${spacing}`}
                  >
                    {opt.label}
                  </button>
                )
              ) : opt.to === ROUTES.AUTH.PASSWORD_CHANGE ? (
                <UiVisibility allowedRoles={['STUDENT']}>
                  <Link to={opt.to} className={`font-bold mb-2 sm:mb-0 ${spacing}`}>
                    {opt.label}
                    {passwordUpdateRequired && (
                      <AlertCircle
                        aria-label="パスワード変更が推奨されています"
                        role="img"
                        className="inline-block ml-1 text-red-500"
                        size={16}
                      />
                    )}
                  </Link>
                </UiVisibility>
              ) : (
                <Link to={opt.to} className={`font-bold mb-2 sm:mb-0 ${spacing}`}>
                  {opt.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
