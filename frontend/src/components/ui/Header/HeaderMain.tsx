import { Link } from 'react-router-dom';
import React from 'react';
import { Home } from 'lucide-react';

type Props = {
  to: string;
  label: string;
};

export const HeaderMain: React.FC<Props> = ({ to, label }) => (
  <Link
    to={to}
    className="flex items-center font-bold mb-2 sm:mb-0 text-gray-800 hover:text-gray-900 transition-colors"
  >
    <Home className="w-5 h-5 mr-2 text-gray-600" />
    {label}
  </Link>
);
