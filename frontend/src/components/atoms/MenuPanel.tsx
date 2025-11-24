import React from 'react';
import { X } from 'lucide-react';
import type { Option } from '@/types/ui';
import { Link } from 'react-router-dom';

type Props = {
  options: Option[];
  onClick: () => void;
};

export const MenuPanel: React.FC<Props> = ({ options, onClick }) => (
  <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg">
    <div className="flex justify-end p-4">
      <X
        onClick={onClick}
        className="cursor-pointer w-6 h-6 text-gray-700 hover:text-gray-900 transition"
      />
    </div>

    <nav className="flex flex-col space-y-3 px-4">
      {options.map((opt) => (
        <Link
          key={opt.value}
          to={opt.value}
          className="font-bold border-b border-gray-300 py-2 hover:text-indigo-500"
          onClick={onClick}
        >
          {opt.label}
        </Link>
      ))}
    </nav>
  </div>
);
