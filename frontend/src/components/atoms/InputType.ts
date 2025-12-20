import type { HTMLInputTypeAttribute } from 'react';

export type AllowedInputType = Exclude<
  HTMLInputTypeAttribute,
  'checkbox' | 'radio' | 'range' | 'file' | 'image'
>;
