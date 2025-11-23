import React from 'react';
import menuIcon from '@/assets/menu.svg';

type Props = {
  onClick: () => void;
};

export const MenuToggle: React.FC<Props> = ({ onClick }) => (
  <img src={menuIcon} alt="メニュー" onClick={onClick} className="cursor-pointer w-6 h-6" />
);
