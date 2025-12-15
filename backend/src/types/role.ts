import { ROLE } from '@/constants/role';
export type Role = (typeof ROLE)[keyof typeof ROLE];
