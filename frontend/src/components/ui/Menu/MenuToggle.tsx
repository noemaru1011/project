import React from 'react';
import { Menu } from 'lucide-react';

type Props = {
  onClick: () => void;
};

export const MenuToggle: React.FC<Props> = ({ onClick }) => (
  <Menu onClick={onClick} className="cursor-pointer w-6 h-6" />
);
