export type ButtonVariant =
  | 'Create'
  | 'Read'
  | 'Update'
  | 'Delete'
  | 'Search'
  | 'Login'
  | 'Back'
  | 'Home';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'url' | 'datetime-local';

export interface Option {
  value: string;
  label: string;
}

export interface DisplayLabels {
  [key: string]: string | DisplayLabels;
}
