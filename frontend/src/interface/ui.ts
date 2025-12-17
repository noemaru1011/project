export type ButtonVariant =
  | 'Create'
  | 'Read'
  | 'Update'
  | 'Delete'
  | 'Search'
  | 'Login'
  | 'Back'
  | 'Home'
  | 'invalid';

export type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'url'
  | 'datetime-local'
  | 'hidden';

export interface Option {
  value: string;
  label: string;
}
