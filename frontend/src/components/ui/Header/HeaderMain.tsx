import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLocation } from 'react-router-dom';

type Props = {
  to: string;
  label: string;
};

export const HeaderMain = ({ to, label }: Props) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      aria-current={location.pathname === to ? 'page' : undefined}
      className="flex items-center font-bold mb-2 sm:mb-0 text-gray-800 hover:text-gray-900 transition-colors"
    >
      <Home aria-hidden="true" className="w-5 h-5 mr-2 text-gray-600" />
      {label}
    </Link>
  );
};
