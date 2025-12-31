import { ROUTES } from '@/constants/routes';

// selectやcheckbox用
export interface Option {
  value: string;
  label: string;
}

export const MenuOptions: Option[] = [
  { value: ROUTES.CATEGORY.INDEX, label: '大分類マスタ' },
  { value: ROUTES.SUBCATEGORY.INDEX, label: '中分類マスタ' },
  { value: ROUTES.MINORCategory.INDEX, label: '小分類マスタ' },
  { value: ROUTES.DEPARTMENT.INDEX, label: '学科マスタ' },
  { value: ROUTES.STATUS.INDEX, label: '状態区分' },
  { value: ROUTES.STUDENT.INDEX, label: '学生マスタ' },
];

export interface HeaderLinkOption {
  kind: 'link';
  label: string;
  to: string;
}

//現状ログアウトのみ
export interface HeaderActionOption {
  kind: 'action';
  label: string;
  action: 'logout';
}

export type HeaderOption = HeaderLinkOption | HeaderActionOption;

export const headerMain: HeaderLinkOption = {
  kind: 'link',
  to: ROUTES.HOME,
  label: 'メインページへ',
};

export const headerOptions: HeaderOption[] = [
  { kind: 'link', to: ROUTES.HISTORY.INDEX, label: '履歴一覧' },
  { kind: 'link', to: ROUTES.HISTORY.CREATE, label: '履歴作成' },
  { kind: 'link', to: ROUTES.STUDENT.CHANGE, label: 'パスワード変更' },
  { kind: 'action', action: 'logout', label: 'ログアウト' },
];
