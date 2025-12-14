export const role = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof role)[keyof typeof role];
