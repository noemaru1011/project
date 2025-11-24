import { Link } from 'react-router-dom';
import React from 'react';
import type { Option } from '@/types/ui';

type Props = {
  options: Option[];
  onLogout: () => void;
  loading?: boolean;
};

export const HeaderNav: React.FC<Props> = ({ options, onLogout, loading }) => (
  <nav className="flex flex-col sm:flex-row">
    {options.map((opt, index) =>
      opt.value === 'LOGOUT' ? (
        <button
          key={opt.value}
          onClick={onLogout}
          className={`font-bold mb-2 sm:mb-0 ${index < options.length - 1 ? 'sm:mr-5' : ''}`}
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
        </Link>
      ),
    )}
  </nav>
);
