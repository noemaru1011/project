import { ROUTES } from '@/routes/routes';

// selectやcheckbox用
export interface Option {
  value: string;
  label: string;
}

// メニューは現状1つのみ
export const MenuOptions: Option[] = [{ value: ROUTES.STUDENT.INDEX, label: '学生マスタ' }];

//画面遷移用
export interface HeaderLinkOption {
  kind: 'link';
  label: string;
  to: string;
  visible?: boolean;
}

//リクエスト用
export interface HeaderActionOption {
  kind: 'action';
  label: string;
  action: string;
  visible?: boolean;
}

export type HeaderOption = HeaderLinkOption | HeaderActionOption;

export const headerHome: HeaderLinkOption = {
  kind: 'link',
  label: 'メインページへ',
  to: ROUTES.HOME,
};

export const headerOptions: HeaderOption[] = [
  { kind: 'link', to: ROUTES.HISTORY.INDEX, label: '履歴一覧' },
  { kind: 'link', to: ROUTES.HISTORY.CREATE, label: '履歴作成' },
  { kind: 'link', to: ROUTES.AUTH.PASSWORD_CHANGE, label: 'パスワード変更' },
  { kind: 'action', action: 'logout', label: 'ログアウト' },
];
