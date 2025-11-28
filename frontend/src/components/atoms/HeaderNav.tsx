import { Link } from 'react-router-dom';
import React from 'react';
import type { Option } from '@/interface/ui';
import { ROUTES } from '@/constants/routes';
import { AlertCircle } from 'lucide-react';

type Props = {
  options: Option[];
  onLogout: () => void;
  loading?: boolean;
  passwordUpdateRequired?: boolean;
};

export const HeaderNav: React.FC<Props> = ({
  options,
  onLogout,
  loading,
  passwordUpdateRequired,
}) => (
  <nav className="flex flex-col sm:flex-row">
    {options.map((opt, index) =>
      opt.value === 'LOGOUT' ? (
        <button
          key={opt.value}
          onClick={onLogout}
          className={`font-bold mb-2 sm:mb-0 cursor-pointer${index < options.length - 1 ? 'sm:mr-5' : ''}`}
          disabled={loading}
        >
          {opt.label}
        </button>
      ) : (
        <Link
          key={opt.value}
          to={opt.value}
          className={`font-bold mb-2 sm:mb-0 ${index < options.length - 1 ? 'sm:mr-5' : ''}`}
        >
          {opt.label}
          {opt.value === ROUTES.STUDENT.CHANGE && passwordUpdateRequired && (
            <AlertCircle className="inline-block ml-1 text-red-500" size={16} />
          )}
        </Link>
      ),
    )}
  </nav>
);
