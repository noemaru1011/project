export type ButtonVariant =
  | 'Create'
  | 'Read'
  | 'Update'
  | 'Delete'
  | 'Search'
  | 'Login'
  | 'Back'
  | 'Home';

export type InputType = 'text' | 'number' | 'email' | 'tel' | 'password' | 'url' | 'datetime-local';

//インターフェイスにする予定
export type Option = {
  value: string;
  label: string;
};

export interface DisplayLabels {
  [key: string]: string | DisplayLabels;
}
