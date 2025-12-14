import { role } from '@/constants/role';
export type Role = (typeof role)[keyof typeof role];
