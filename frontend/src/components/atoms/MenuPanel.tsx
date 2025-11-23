import React from 'react';
import colseIcon from '@/assets/close.svg';
import type { Option } from '@/types/ui';
import { Link } from 'react-router-dom';

type Props = {
  options: Option[];
  onClick: () => void;
};

export const MenuPanel: React.FC<Props> = ({ options, onClick }) => (
  <div className="fixed top-0 right-0 h-full w-64 bg-white z-50">
    <div className="flex justify-end p-4">
      <img src={colseIcon} alt="閉じる" onClick={onClick} className="cursor-pointer w-6 h-6" />
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
