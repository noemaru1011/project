import React from 'react';
import { MenuToggle } from '@/components/atoms/MenuToggle';
import { MenuOverlay } from '@/components/atoms/MenuOverlay';
import { MenuPanel } from '@/components/atoms/MenuPanel';
import type { Option } from '@/types/ui';
import { ROUTES } from '@/constants/routes';

export const MenuOptions: Option[] = [
  { value: ROUTES.CATEGORY.INDEX, label: '大分類マスタ' },
  { value: ROUTES.SUBCATEGORY.INDEX, label: '中分類マスタ' },
  { value: ROUTES.MINORCategory.INDEX, label: '小分類マスタ' },
  { value: ROUTES.DEPARTMENT.INDEX, label: '学科マスタ' },
  { value: ROUTES.STATUS.INDEX, label: '状態区分' },
  { value: ROUTES.STUDENT.INDEX, label: '学生マスタ' },
];

type MenuProps = {
  open: boolean;
  onClick: () => void;
};

export const Menu: React.FC<MenuProps> = ({ open, onClick }) => (
  <div className="relative">
    <MenuToggle onClick={onClick} />
    {open && (
      <>
        <MenuOverlay onClick={onClick} />
        <MenuPanel options={MenuOptions} onClick={onClick} />
      </>
    )}
  </div>
);
