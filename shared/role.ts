export const ROLE = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];
